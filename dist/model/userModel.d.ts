import mongoose from 'mongoose';
import type { IUser } from '../interface/userInterface.js';
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, any, any, IUser>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, {
    id?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    name?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    photo?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    passwordConfirm?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    passwordChangedAt?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    role?: mongoose.SchemaDefinitionProperty<"admin" | "guide" | "lead-guide" | "user", IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    passwordResetToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    passwordResetExpires?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    active?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    changedPasswordAfter?: mongoose.SchemaDefinitionProperty<(iat: number) => boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    correctPassword?: mongoose.SchemaDefinitionProperty<(candidatePassword: string, userPassword: string) => Promise<boolean>, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createPasswordResetToken?: mongoose.SchemaDefinitionProperty<() => string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}, IUser>, IUser>;
export default User;
//# sourceMappingURL=userModel.d.ts.map