import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './modules/movie/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  movieName = "";

  constructor(private router: Router, private authService: AuthService) {}

  //will navigate you to search ist page showing the matched movies
  searchMovie(): void {
    if (this.movieName) {
      this.router.navigate(['/movies/searchlist', this.movieName]);
    }
  }

  //this is written to hide the navbar in login page
  showNavBar() {
    return !this.authService.isTokenExpired();
  }

  //to logout the user by clearing token
  logOut() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }
}
