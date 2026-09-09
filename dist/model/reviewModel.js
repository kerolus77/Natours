import mongoose, { Query } from 'mongoose';
import { calculateAverageRatings } from '../services/reviewService.js';
import Tour from '../model/tourModel.js';
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty!'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        set: (val) => Math.round(val * 10) / 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user.']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
reviewSchema.pre(/^find/, function () {
    this.populate({ path: 'user', select: 'name photo' }) /* .populate({path:'tour',select:'name'}) */;
});
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewSchema.post('save', async function () {
    await calculateAverageRatings(this.model('Review'), Tour, this.tour);
});
reviewSchema.pre(/^findOneAnd/, function () {
    this.r = this.findOne();
});
reviewSchema.post(/^findOneAnd/, async function () {
    const review = await this.r;
    if (!review)
        return;
    await calculateAverageRatings(Review, Tour, review.tour);
});
const Review = mongoose.model('Review', reviewSchema);
export default Review;
//# sourceMappingURL=reviewModel.js.map