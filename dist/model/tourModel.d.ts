import mongoose from 'mongoose';
import type { ITour } from '../interface/tourInterface.js';
declare const Tour: mongoose.Model<ITour, {}, {}, {}, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<ITour, mongoose.Model<ITour, any, any, any, any, any, ITour>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, {
    id?: mongoose.SchemaDefinitionProperty<string, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    slug?: mongoose.SchemaDefinitionProperty<string, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    name?: mongoose.SchemaDefinitionProperty<string, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    duration?: mongoose.SchemaDefinitionProperty<number, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    maxGroupSize?: mongoose.SchemaDefinitionProperty<number, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    difficulty?: mongoose.SchemaDefinitionProperty<string, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ratingsAverage?: mongoose.SchemaDefinitionProperty<number, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    ratingsQuantity?: mongoose.SchemaDefinitionProperty<number, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    price?: mongoose.SchemaDefinitionProperty<number, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    priceDiscount?: mongoose.SchemaDefinitionProperty<number | undefined, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    summary?: mongoose.SchemaDefinitionProperty<string, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    description?: mongoose.SchemaDefinitionProperty<string, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    imageCover?: mongoose.SchemaDefinitionProperty<string, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    images?: mongoose.SchemaDefinitionProperty<string[], ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    startDates?: mongoose.SchemaDefinitionProperty<{
        startDate: Date;
        participants: number;
        soldOut: boolean;
    }[], ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    secretTour?: mongoose.SchemaDefinitionProperty<boolean, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    startLocation?: mongoose.SchemaDefinitionProperty<{
        type: ['Point'];
        coordinates: number[];
        address: string;
        description: string;
    }, ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    locations?: mongoose.SchemaDefinitionProperty<{
        type: ['Point'];
        coordinates: number[];
        address: string;
        description: string;
    }[], ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    guides?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], ITour, mongoose.Document<unknown, {}, ITour, {}, mongoose.DefaultSchemaOptions> & ITour & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}, ITour>, ITour>;
export default Tour;
//# sourceMappingURL=tourModel.d.ts.map