import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/books.interfaces'
import { randomUUID } from 'crypto';

@Injectable()
export class BooksService {
    private readonly books: Book[] = []

    findAll(): Book[] {
        return this.books;
    }

    findOne(id: string): Book | undefined {
        return this.books.find(item => item.id == id);
    }

    createBook(
        title: string, description: string, authors: string, 
        favorite: string, fileCover: string, fileName: string): Book {
            const newBook = {
                id: randomUUID(), 
                title: title,
                description: description,
                authors: authors,
                favorite: favorite,
                fileCover: fileCover,
                fileName: fileName
            }
        this.books.push(newBook)
        return newBook;
    }
}
