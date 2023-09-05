import { Component } from '@angular/core';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  results: any[] = [];

  constructor(private searchService: SearchService) { }

  onInputChange() {
    if (this.query.length >= 3) {
      this.searchService.search(this.query).subscribe((data: any) => {
        this.results = data.docs;
      });
    } else {
      this.results = [];
    }
  }

}
