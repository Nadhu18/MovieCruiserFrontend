import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  movieName = "";

  constructor(private router: Router) {}

  //will navigate you to search ist page showing the matched movies
  searchMovie(): void {
    if (this.movieName) {
      this.router.navigate(['/movies/searchlist', this.movieName]);
    }
  }
}
