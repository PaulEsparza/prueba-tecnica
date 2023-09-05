import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageKey = 'myBooks';

  constructor() { }

  saveBooks(books: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }

  saveBook(book: any): void {
    localStorage.setItem('selectedBook', JSON.stringify(book));
  }

  getBooks(): any[] {
    const storedBooks = localStorage.getItem(this.localStorageKey);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  getBook(): any {
    const storedBook = localStorage.getItem('selectedBook');
    return storedBook ? JSON.parse(storedBook) : [];
  }

  updateBook(index: number, updatedBook: any): void {
    const books = this.getBooks();
    if (index >= 0 && index < books.length) {
      books[index] = updatedBook;
      this.saveBooks(books);
    }
  }

  deleteBook(index: number): void {
    const books = this.getBooks();
    if (index >= 0 && index < books.length) {
      books.splice(index, 1);
      this.saveBooks(books);
    }
  }
}
