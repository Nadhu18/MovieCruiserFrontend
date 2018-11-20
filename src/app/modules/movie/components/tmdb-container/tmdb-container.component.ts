import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from '../../movie.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'movie-tmdb-container',
  templateUrl: './tmdb-container.component.html',
  styleUrls: ['./tmdb-container.component.css']
})
export class TmdbContainerComponent implements OnInit {
  movies: Array<Movie>;
  movieType: string;

  constructor(private movieService: MovieService, private route: ActivatedRoute) {
    this.movies = [];

    //getting the movieType from the url
    this.route.data.subscribe((data) => {
      this.movieType = data.movieType
    });
  }

  ngOnInit() {
    //Getting all the movies with respect to the movieType and assigning to movies variable
    this.movieService.getMovies(this.movieType).subscribe((movies) => {
      this.movies.push(...movies);
    }, error => {
      console.error("An Error has occured in TMDB component while getting movies.", error);
      alert("some error occurred. PLease try after some time");
    });
  }

}
