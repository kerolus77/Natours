import mongoose from 'mongoose';
import type { IBooking } from '../interface/bookingInterface.js';
declare const Booking: mongoose.Model<IBooking, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IBooking, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<IBooking, mongoose.Model<IBooking, any, any, any, any, any, IBooking>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IBooking, mongoose.Document<unknown, {}, IBooking, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    tour?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, IBooking, mongoose.Document<unknown, {}, IBooking, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    startDate?: mongoose.SchemaDefinitionProperty<Date, IBooking, mongoose.Document<unknown, {}, IBooking, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    user?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, IBooking, mongoose.Document<unknown, {}, IBooking, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    price?: mongoose.SchemaDefinitionProperty<number, IBooking, mongoose.Document<unknown, {}, IBooking, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, IBooking, mongoose.Document<unknown, {}, IBooking, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    paid?: mongoose.SchemaDefinitionProperty<boolean, IBooking, mongoose.Document<unknown, {}, IBooking, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    status?: mongoose.SchemaDefinitionProperty<"expired" | "paid" | "pending", IBooking, mongoose.Document<unknown, {}, IBooking, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    expiresAt?: mongoose.SchemaDefinitionProperty<Date | undefined, IBooking, mongoose.Document<unknown, {}, IBooking, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    checkoutSessionId?: mongoose.SchemaDefinitionProperty<string | undefined, IBooking, mongoose.Document<unknown, {}, IBooking, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IBooking & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IBooking>, IBooking>;
export default Booking;
//# sourceMappingURL=bookingModel.d.ts.map