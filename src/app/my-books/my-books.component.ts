import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../services/modal/modal.service';
import { LibraryService } from '../services/library/library.service';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  books: any[] = [];
  book: any = {};
  bookCover: string | null = null;

  constructor(private localStorageService: LocalStorageService,
    public dialog: MatDialog, private modalService: ModalService,
    private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.books = this.localStorageService.getBooks();

    this.modalService.data$.subscribe((data: any) => {
      if (data) {

        this.book = this.localStorageService.getBook();


        this.book.book.score = data.value2;
        this.book.book.status = data.value1;
        this.editBook(this.book.index, this.book.book);
      }
    });
    this.books.forEach((book) => {

      // console.log(`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`);
      if (book.covers) {
        const coverUrl = `https://covers.openlibrary.org/b/id/${book.covers[0]}-S.jpg`;
        this.libraryService.getBookCover(coverUrl).subscribe((coverData) => {

          book.cover = URL.createObjectURL(coverData);

        });
      }
    });
  }

  openModal(book: any, i: any): void {
    let data = {
      "index": i,
      book,
    }
    let score = data.book.score;
    let status = data.book.status;
    let title = data.book.title;
    // let cover = data.book.cover.split('blob:')[1];
    let covers = data.book.covers;
    this.localStorageService.saveBook(data);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { score, status, title, covers }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Modal result:', result);
      }
    });
  }

  editBook(index: number, updatedBook: any): void {
    this.localStorageService.updateBook(index, updatedBook);
  }

  deleteBook(index: number): void {
    if (confirm("¿Estas seguro de eliminar el libro de tu lista?")) {
      this.localStorageService.deleteBook(index);
      this.books.splice(index, 1);
    }
  }

  getStatus(value: number): string {
    if (value == 0) {
      return 'Pendiente';
    } else if (value > 0 && value <= 99) {
      return 'En progreso';
    } else if (value == 100) {
      return 'Leído';
    } else {
      return 'Estatus invalido';
    }
  }
}
