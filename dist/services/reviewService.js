export const calculateAverageRatings = async (reviewModel, tourModel, tourId) => {
    const stats = await reviewModel.aggregate([
        { $match: { tour: tourId } },
        {
            $group: {
                _id: '$tour',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' },
            },
        },
    ]);
    await tourModel.findByIdAndUpdate(tourId, {
        ratingsQuantity: stats[0]?.nRating ?? 0,
        ratingsAverage: stats[0]?.avgRating ?? 4.5,
    });
};
//# sourceMappingURL=reviewService.js.map