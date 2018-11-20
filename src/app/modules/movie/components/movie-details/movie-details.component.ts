import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from '../../movie.service';
import { AuthService } from '../../auth.service';
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

  constructor(private route: ActivatedRoute, private movieService: MovieService, private snackBar: MatSnackBar, private authServer: AuthService) {
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
    }, error => console.error("An Error has occured in movie details component OnInit while getting movies.", error));

    if (this.movieID) {
      let userId = this.authServer.getUserId();
      //getting the watchlisted movies from database and modifying the local movies comments
      this.movieService.getWatchListedMovies().subscribe(watchlistMovies => {
        if (watchlistMovies && watchlistMovies.length > 0) {
          watchlistMovies.forEach(watchlistMovie => {
            if (watchlistMovie.movieId == this.movieID && watchlistMovie.userId == userId) {
              this.movie.isWatchlisted = true;
              this.movie.id = watchlistMovie.id;
              this.movie.comments = watchlistMovie.comments;
              this.comment = watchlistMovie.comments;
            }
          });
        }
      }, error => {
        console.error("An Error has occured in movie details component OnInit while getting watchlisted movies.", error);
        alert("some error occurred. PLease try after some time");
      });
    }
  }

  //Will call service to add the movie to watchlist by saving in database
  addMovieToWatchlist() {
    this.movieService.addMovieTowatchlist(this.movie).subscribe(() => {
      this.movie.isWatchlisted = true;
      this.movieService.getWatchListedMovies().subscribe(ms => {
        if (ms && ms.length > 0) {
          let usr = this.authServer.getUserId();
          ms.forEach(mv => {
            if (mv.movieId == this.movieID && mv.userId == usr) {
              this.movie.id = mv.id;
            }
          });
        }
      });
      this.snackBar.open('Movie Added To Watchlist', '', {
        duration: 1000
      });
    }, error => {
      console.error("An Error has occured in movie details component while adding movie to watchlist", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  //Will call service to remove the movie from database and watchlist
  deleteMovieFromWatchlist() {
    this.movieService.deleteMovieFromWatchlist(this.movie.id).subscribe(() => {
      this.movie.isWatchlisted = false;
      this.snackBar.open('Movie removed from watchlist', '', {
        duration: 1000
      });
    }, error => {
      console.error("An Error has occured in movie details component while removing movie from the watchlist.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

  //Will call service to update the comment in the database
  addOrupdateComment() {
    this.movie.comments = this.comment;
    this.movieService.addOrupdateComment(this.movie).subscribe(() => {
      this.snackBar.open('Comment Updated', '', {
        duration: 1000
      });
    }, error => {
      console.error("An Error has occured in movie details component while updating the movie comment.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

}
