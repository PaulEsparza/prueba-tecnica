import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<any> {
    const apiUrl = `https://openlibrary.org/search.json?title=${query}&fields=key,title,cover_i&limit=50&language=spa`;
    return this.http.get(apiUrl);
  }
}
