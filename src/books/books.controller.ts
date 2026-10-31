import { Get, Post, Put, Delete, Param, Controller, NotFoundException, Body, UsePipes, UseFilters } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDocument } from './schemas/book.schema';
import type { HydratedDocument, QueryWithHelpers } from 'mongoose';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';
import { ValidationPipe } from './book.validaton.pipe';
import { HttpExceptionFilter } from './http.exaption.filter';

@UseFilters(new HttpExceptionFilter)
@UsePipes(new ValidationPipe())
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
    public create(@Body() body: CreateBookDto): Promise<BookDocument> {
            return this.booksService.create(body);
    }

    @Put(':id')
    public update(
        @Param('id') id: string,
        @Body() body: UpdateBookDto,
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
