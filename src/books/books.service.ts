import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model, Connection, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { Book as BookInterface } from "./interfaces/books.interfaces";

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<BookDocument>,
        @InjectConnection() private connection: Connection
    ) {}

    public create(data: BookInterface): Promise<HydratedDocument<BookDocument>>{
        const book = new this.BookModel(data);

        return book.save();
    }

    public findOne(id: string): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument>{
        return this.BookModel.findById(id);
    }

    public getAll(): Promise<BookDocument[]>{
        return this.BookModel.find().exec();
    }

    public update(id: string, data: BookInterface): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument>{
        return this.BookModel.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }, 
        );
    }

    public delete(id: string): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findOneAndDelete({ _id: id });
    }
}
