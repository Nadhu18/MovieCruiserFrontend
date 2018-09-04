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
  comment: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private snackBar: MatSnackBar) {
    this.comment = "";
    //Getting movieID from the URL
    this.route.params.subscribe(params => {
      this.movieID = params['movieID'];
    });
  }

  ngOnInit() {
    //Calling the service to get the details of a particular movie
    this.movieService.getMovieDetails(this.movieID).subscribe(movie => {
      this.movie = movie;
    });

    if (this.movieID) {
      //getting the watchlisted movies from database and modifying the local movies comments
      this.movieService.getWatchListedMovies().subscribe(watchlistMovies => {
        watchlistMovies.forEach(watchlistMovie => {
          if (watchlistMovie.id == this.movieID) {
            this.movie.isWatchlisted = true;
            this.movie.comments = watchlistMovie.comments;
            this.comment = watchlistMovie.comments;
          }
        });
      });
    }
  }

  //Will call service to add the movie to watchlist by saving in database
  addMovieToWatchlist() {
    this.movie.isWatchlisted = true;
    this.movieService.addMovieTowatchlist(this.movie).subscribe(() => {
      this.snackBar.open('Movie Added To Watchlist', '', {
        duration: 1000
      });
    });
  }

  //Will call service to remove the movie from database and watchlist
  deleteMovieFromWatchlist() {
    this.movie.isWatchlisted = false;
    this.movieService.deleteMovieFromWatchlist(this.movieID).subscribe(() => {
      this.snackBar.open('Movie removed from watchlist', '', {
        duration: 1000
      });
    });
  }

  //Will call service to update the comment in the database
  addOrupdateComment() {
    this.movie.comments = this.comment;
    this.movieService.addOrupdateComment(this.movie).subscribe(() => {
      this.snackBar.open('Comment Updated', '', {
        duration: 1000
      });
    });
  }

}
