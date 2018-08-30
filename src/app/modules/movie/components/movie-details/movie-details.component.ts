import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from '../../movie.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'movie-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  movieID: number;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private snackBar: MatSnackBar) {
    this.route.params.subscribe(params => {
      this.movieID = params['movieID'];
    });
  }

  ngOnInit() {
    this.movieService.getMovieDetails(this.movieID).subscribe(movie => {
      this.movie = movie;
    });

    if (this.movieID) {
      this.movieService.getWatchListedMovies().subscribe(watchlistMovies => {
        watchlistMovies.forEach(watchlistMovie => {
          if (watchlistMovie.id == this.movieID) {
            this.movie.isWatchlisted = true;
          }
        });
      });
    }

  }

  addMovieToWatchlist() {
    this.movie.isWatchlisted = true;
    this.movieService.addMovieTowatchlist(this.movie).subscribe(() => {
      this.snackBar.open('Movie Added To Watchlist', '', {
        duration: 1000
      });
    });
  }

  deleteMovieFromWatchlist() {
    this.movie.isWatchlisted = false;
    this.movieService.deleteMovieFromWatchlist(this.movieID).subscribe(() => {
      this.snackBar.open('Movie removed from watchlist', '', {
        duration: 1000
      });
    });
  }

}
