import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from './schemas/user.schema'
import { Model, Connection, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { SignUpDto } from "../auth/dto/sugnup.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private UsersModel: Model<UserDocument>,
    ){}

    public create(data: SignUpDto): Promise<HydratedDocument<UserDocument>>{
        const user = new this.UsersModel(data);
        return user.save();
    }

    public async findByEmail(email: string): Promise<UserDocument | null> {
        return this.UsersModel.findOne({ email }).exec();
    }
}