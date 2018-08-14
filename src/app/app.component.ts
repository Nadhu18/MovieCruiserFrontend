import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  movieName = "";

  constructor(private router: Router) {
  }

  searchMovie(): void {
    this.router.navigate(['/movies/searchlist', this.movieName]);
  }
}
