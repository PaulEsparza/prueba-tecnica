import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'https://openlibrary.org/books/OL9155299M.json';
  private apiUrlDetail = 'https://openlibrary.org';
  private idsBooks: string[] = ['OL9155299M', 'OL9117315M', 'OL37468678M', 'OL9199218M', 'OL32186077M'];
  private apiUrl2 = 'https://openlibrary.org/books/';

  constructor(private http: HttpClient) { }

  getTop5ApiBooks(): Observable<any> {
    const endpoint = `${this.apiUrl}`;
    return this.http.get(endpoint);
  }

  getTop5ApiBooks2(id: string): Observable<any> {
    const endpoint = `${this.apiUrl2}${id}.json`;
    return this.http.get(endpoint);
  }

  getBookCover(coverUrl: string): Observable<any> {
    return this.http.get(coverUrl, { responseType: 'blob' });
  }

  getBookDetails(bookId: string): Observable<any> {
    const endpoint = `${this.apiUrlDetail}${bookId}.json`;
    return this.http.get(endpoint);
  }
}
