import { Get, Post, Param, Controller, NotFoundException, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import type { Book } from './interfaces/books.interfaces';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    findAll(): Book[] {
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Book {
        const book = this.booksService.findOne(id);
        if (!book) {
            throw new NotFoundException('Book is not found');
        }
        return book;
    }
    
    @Post()
    create(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('authors') authors: string,
        @Body('favorite') favorite: string,
        @Body('fileCover') fileCover: string,
        @Body('fileName') fileName: string,): Book {
            return this.booksService.createBook(title, description, authors, favorite, fileCover, fileName);
        }
}
