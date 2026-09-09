import type { IReview } from '../interface/reviewInterface.js';
import mongoose from 'mongoose';
declare const Review: mongoose.Model<IReview, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IReview, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IReview & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<IReview, mongoose.Model<IReview, any, any, any, any, any, IReview>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IReview, mongoose.Document<unknown, {}, IReview, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IReview & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    review?: mongoose.SchemaDefinitionProperty<string, IReview, mongoose.Document<unknown, {}, IReview, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IReview & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    rating?: mongoose.SchemaDefinitionProperty<number, IReview, mongoose.Document<unknown, {}, IReview, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IReview & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, IReview, mongoose.Document<unknown, {}, IReview, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IReview & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    tour?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, IReview, mongoose.Document<unknown, {}, IReview, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IReview & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    user?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, IReview, mongoose.Document<unknown, {}, IReview, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IReview & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IReview>, IReview>;
export default Review;
//# sourceMappingURL=reviewModel.d.ts.map