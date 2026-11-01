import { Types } from 'mongoose';

export interface ValidatedUser {
    _id: Types.ObjectId,
    email: string;
    firstName: string;
    lastName: string;
}