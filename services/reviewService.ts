import type { Model, Types } from 'mongoose';
import type { ITour } from '../interface/tourInterface.js';
import type { IReview } from '../interface/reviewInterface.js';

type ReviewStats = {
  nRating: number;
  avgRating: number;
};

export const calculateAverageRatings = async (
  reviewModel: Model<any>,
  tourModel: Model<any>,
  tourId: Types.ObjectId,
): Promise<void> => {
  const stats = await reviewModel.aggregate<ReviewStats>([
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