import type { IUser } from '../interface/userInterface';

declare global{
    namespace Express {
    interface Request{
        user?: IUser;
    }
    }
}

export { };
