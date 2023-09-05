import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../services/library/library.service';

@Component({
  selector: 'app-top-books',
  templateUrl: './top-books.component.html',
  styleUrls: ['./top-books.component.css']
})
export class TopBooksComponent implements OnInit {
  title = 'prueba-tecnica';
  top5ApiBooks: any[] = [];
  private idsBooks: string[] = ['OL9155299M', 'OL9117315M', 'OL37468678M', 'OL9199218M', 'OL32186077M'];

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    for (let b of this.idsBooks) {

      this.libraryService.getTop5ApiBooks2(b).subscribe((data: any) => {

        this.top5ApiBooks.push(data);

        this.top5ApiBooks.forEach((book) => {
          if (book.covers) {
            const coverUrl = `https://covers.openlibrary.org/b/id/${book.covers[0]}-S.jpg`;
            this.libraryService.getBookCover(coverUrl).subscribe((coverData) => {

              book.cover = URL.createObjectURL(coverData);
            });
          }
        });
      });

    }
  }

}
