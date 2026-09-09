import { Model } from 'mongoose';
import Tour from '../model/tourModel.js';
import { parseParam } from '../utils/helperMethods.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import { deleteOne, createOne, updateOne, getAll, getOne } from './handlerFactory.js';
import multer from 'multer';
import sharp from 'sharp';
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cd) => {
    if (file.mimetype.startsWith('image')) {
        cd(null, true);
    }
    else {
        cd(new AppError('Not an image! Please upload only images.', 400), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
export const resizeTourImages = catchAsync(async (req, res, next) => {
    const files = req.files;
    if (!files?.imageCover?.[0] || !files.images)
        return next();
    req.body.imageCover = `user-${req.params.id}-${Date.now()}.jpeg`;
    await sharp(files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${req.body.imageCover}`);
    req.body.images = [];
    await Promise.all(files.images.map(async (file, i) => {
        const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
        await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/tours/${filename}`);
        req.body.images.push(filename);
    }));
    next();
});
export const uploadTourImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]);
export const aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};
export const getAllTours = getAll(Tour);
export const getTour = getOne(Tour, { path: 'reviews' });
export const createTour = createOne(Tour);
export const updateTour = updateOne(Tour);
export const deleteTour = deleteOne(Tour);
export const getToursWithin = catchAsync(async (req, res, next) => {
    const distance = Number(parseParam(req.params.distance));
    const latlng = parseParam(req.params.latlng) || '';
    const unit = parseParam(req.params.unit) || '';
    const [lat, lng] = latlng?.split(',');
    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
    if (!lat || !lng) {
        return next(new AppError('Please provide latitude and longitude in the format lat,lng.', 400));
    }
    const tours = await Tour.find({ startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } } });
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: tours
    });
});
export const getDistances = catchAsync(async (req, res, next) => {
    const latlng = parseParam(req.params.latlng) || '';
    const unit = parseParam(req.params.unit) || '';
    const [lat, lng] = latlng.split(',');
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
    if (!lat || !lng) {
        return next(new AppError('Please provide latitude and longitude in the format lat,lng.', 400));
    }
    const tours = await Tour.aggregate([
        { $geoNear: {
                near: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }, },
        { $project: { distance: 1, name: 1 } }
    ]);
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: tours
    });
});
export const getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
        { $match: { ratingsAverage: { $gte: 4.5 } } },
        { $group: {
                _id: '$difficulty',
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            } },
        { $sort: { avgPrice: 1 } }
    ]);
    res.status(200).json({
        status: 'success',
        data: stats
    });
});
export const getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = Number(req.params.year);
    const plan = await Tour.aggregate([
        { $unwind: '$startDates' },
        { $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            } },
        { $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tour: { $push: '$name' }
            } },
        { $addFields: { month: '$_id' } },
        { $sort: { numTourStarts: -1 } },
        { $project: {
                _id: 0
            } }
    ]);
    res.status(200).json({
        status: 'success',
        data: plan
    });
});
//# sourceMappingURL=tourController.js.map