import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'movie-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  movies: Array<Movie>;

  constructor(private movieService: MovieService) { 
    this.movies = [];
  }

  ngOnInit() {
    //on initial load we will be getting all the watchlisted movies from service and assigning to movies variable
    this.movieService.getWatchListedMovies().subscribe((movies) => {
      this.movies.push(...movies);
    }, error => console.error("An Error has occured in Watchlist component while getting movies.", error));
  }

}
