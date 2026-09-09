import mongoose from 'mongoose';
import Stripe from 'stripe';
import Booking from '../model/bookingModel.js';
import Tour from '../model/tourModel.js';
import AppError from './../utils/appError.js';
import catchAsync from './../utils/catchAsync.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from './handlerFactory.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const HOLD_DURATION_MS = 10 * 60 * 1000;
const releaseExpiredHolds = async (session) => {
    const expiredHolds = await Booking.find({
        status: 'pending',
        expiresAt: { $lte: new Date() }
    }).session(session);
    for (const hold of expiredHolds) {
        await Tour.updateOne({ _id: hold.tour, 'startDates.startDate': hold.startDate }, { $inc: { 'startDates.$.participants': -1 }, $set: { 'startDates.$.soldOut': false } }, { session });
        await Booking.updateOne({ _id: hold._id, status: 'pending' }, { $set: { status: 'expired', paid: false }, $unset: { expiresAt: 1 } }, { session });
    }
};
const reserveSeat = async (tourId, userId, startDate, session) => {
    await releaseExpiredHolds(session);
    const tour = await Tour.findById(tourId).select('maxGroupSize').session(session);
    if (!tour)
        throw new AppError('Tour not found', 404);
    const existingBooking = await Booking.findOne({
        tour: tourId, user: userId, startDate, status: { $in: ['pending', 'paid'] }
    }).session(session);
    if (existingBooking)
        throw new AppError('You already have a booking for this tour date', 400);
    const updatedTour = await Tour.findOneAndUpdate({ _id: tourId, startDates: { $elemMatch: {
                startDate, soldOut: false, participants: { $lt: tour.maxGroupSize }
            } } }, [{ $set: { startDates: { $map: {
                        input: '$startDates', as: 'date', in: { $cond: [
                                { $eq: ['$$date.startDate', startDate] },
                                { $mergeObjects: ['$$date', {
                                            participants: { $add: ['$$date.participants', 1] },
                                            soldOut: { $gte: [{ $add: ['$$date.participants', 1] }, '$maxGroupSize'] }
                                        }] },
                                '$$date'
                            ] }
                    } } } }], { new: true, session });
    if (!updatedTour)
        throw new AppError('Tour is sold out for this date', 400);
    const [hold] = await Booking.create([{
            tour: tourId, startDate, user: userId, price: 0, paid: false, status: 'pending',
            expiresAt: new Date(Date.now() + HOLD_DURATION_MS)
        }], { session });
    if (!hold)
        throw new AppError('Could not create booking hold', 500);
    return hold;
};
const releaseHold = async (bookingId) => {
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const hold = await Booking.findOneAndUpdate({ _id: bookingId, status: 'pending' }, { $set: { status: 'expired', paid: false }, $unset: { expiresAt: 1 } }, { new: true, session });
            if (!hold)
                return;
            await Tour.updateOne({ _id: hold.tour, 'startDates.startDate': hold.startDate }, { $inc: { 'startDates.$.participants': -1 }, $set: { 'startDates.$.soldOut': false } }, { session });
        });
    }
    finally {
        await session.endSession();
    }
};
export const getCheckoutSession = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.tourId);
    if (!tour)
        return next(new AppError('No tour found with that ID', 404));
    console.log('Tour start dates:  ${req.query.date}', tour.startDates);
    const dateValue = String(req.query.date);
    const selectedDate = new Date(dateValue);
    if (!dateValue || Number.isNaN(selectedDate.getTime())) {
        return next(new AppError('Please select a valid tour date', 400));
    }
    const startDate = tour.startDates.find(date => date.startDate.getTime() === selectedDate.getTime());
    if (!startDate)
        return next(new AppError('Start date not found', 404));
    if (startDate.soldOut || startDate.participants >= tour.maxGroupSize) {
        return next(new AppError('Tour is sold out for this date', 400));
    }
    const dbSession = await mongoose.startSession();
    let hold;
    try {
        hold = await dbSession.withTransaction(() => reserveSeat(tour.id, req.user.id, selectedDate, dbSession));
    }
    finally {
        await dbSession.endSession();
    }
    if (!hold)
        return next(new AppError('Could not create booking hold', 500));
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${req.protocol}://${req.get('host')}/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
            customer_email: req.user.email,
            client_reference_id: tour.id,
            metadata: {
                tourId: tour.id,
                userId: req.user.id,
                startDate: selectedDate.toISOString(),
                bookingId: hold.id
            },
            line_items: [{
                    price_data: {
                        product_data: {
                            name: `${tour.name}`,
                            description: `${tour.summary}`,
                            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                        },
                        unit_amount: tour.price * 100,
                        currency: 'usd',
                    },
                    quantity: 1
                }],
            mode: 'payment',
        });
        await Booking.updateOne({ _id: hold._id, status: 'pending' }, { $set: { checkoutSessionId: session.id } });
        res.status(200).json({
            status: 'success',
            session
        });
    }
    catch (error) {
        await releaseHold(hold._id);
        throw error;
    }
});
export const createBookingCheckout = catchAsync(async (req, res, next) => {
    const sessionId = req.query.session_id;
    if (typeof sessionId !== 'string' || !sessionId) {
        return next();
    }
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    if (checkoutSession.payment_status !== 'paid' || !checkoutSession.metadata) {
        return next(new AppError('Payment was not completed', 400));
    }
    const { bookingId } = checkoutSession.metadata;
    if (!bookingId)
        return next(new AppError('Invalid booking details', 400));
    const dbSession = await mongoose.startSession();
    try {
        await dbSession.withTransaction(async () => {
            await releaseExpiredHolds(dbSession);
            const booking = await Booking.findOneAndUpdate({ _id: bookingId, status: 'pending', expiresAt: { $gt: new Date() } }, { $set: {
                    paid: true,
                    status: 'paid',
                    price: (checkoutSession.amount_total || 0) / 100
                }, $unset: { expiresAt: 1 } }, { new: true, session: dbSession });
            if (!booking)
                throw new AppError('This booking hold has expired', 400);
        });
    }
    finally {
        await dbSession.endSession();
    }
    const redirectUrl = req.originalUrl.split('?')[0] ?? '/';
    res.redirect(redirectUrl);
});
export const createBooking = createOne(Booking);
export const getAllBooking = getAll(Booking);
export const getBooking = getOne(Booking);
export const deleteBooking = deleteOne(Booking);
export const updateBooking = updateOne(Booking);
//# sourceMappingURL=bookingController.js.map