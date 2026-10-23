import { Get, Post, Put, Delete, Param, Controller, NotFoundException, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import type { Book } from './interfaces/books.interfaces';
import { BookDocument } from './schemas/book.schema';
import type { HydratedDocument, QueryWithHelpers } from 'mongoose';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    public getAll(): Promise<BookDocument[]> {
        return this.booksService.getAll();
    }

    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<HydratedDocument<BookDocument>> {
        const book = await this.booksService.findOne(id).exec();
        if (!book) {
            throw new NotFoundException('Book is not found');
        }
        return book;
    }
    
    @Post()
    public create(@Body() body: Book): Promise<BookDocument> {
            return this.booksService.create(body);
    }

    @Put(':id')
    public update(
        @Param('id') id: string,
        @Body() body: Book,
    ): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument>{
        return this.booksService.update(id, body);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string): Promise<HydratedDocument<BookDocument>>{
        const book = await this.booksService.delete(id).exec();
        if (!book) {
            throw new NotFoundException('Book is not found');
        }
        return book;
    }
}
