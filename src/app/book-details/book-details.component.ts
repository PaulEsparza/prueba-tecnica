import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../services/library/library.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookId: string | null = null;
  bookDetails: any = {};
  bookCover: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {

      this.bookId = params.get('id');

      if (this.bookId) {
        this.libraryService.getBookDetails(this.bookId).subscribe((data) => {

          this.bookDetails = data;

          const coverUrl = `https://covers.openlibrary.org/b/id/${this.bookDetails.covers}-S.jpg`;
          this.libraryService.getBookCover(coverUrl).subscribe((coverData) => {
            this.bookCover = URL.createObjectURL(coverData);
          });
        });
      }
    });
  }

  addBook(book: any, bookCover: any): void {

    let object = {
      "id": book.key.split("/")[2],
      "title": book.title,
      // "cover": bookCover,
      "covers": book.covers,
      "status": "0",
      "score": "0"
    }
    const data = this.localStorageService.getBooks();
    let resExistsData = data.find((item, index) => item.id == object.id);
    if (resExistsData) {
      alert("El libro ya se encuentra agregado en tu lista");
      return;
    }
    data.push(object);
    this.localStorageService.saveBooks(data);
    window.location.href = '/';
  }
}
