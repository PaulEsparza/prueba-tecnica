import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { SearchComponent } from './search/search.component';
import { TopBooksComponent } from './top-books/top-books.component';

const routes: Routes = [
  { path: '', component: TopBooksComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'my-books', component: MyBooksComponent },
  { path: 'search', component: SearchComponent },
  { path: 'top-books', component: TopBooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
