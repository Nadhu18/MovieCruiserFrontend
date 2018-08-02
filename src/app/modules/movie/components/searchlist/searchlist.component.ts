import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from '../../movie.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'movie-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.css']
})
export class SearchlistComponent implements OnInit {
  movies: Array<Movie>;
  movieName: string;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { 
    this.movies = [];
    this.route.params.subscribe(params => {
      this.movieName = params['movieName'];
    });
  }

  ngOnInit() {
    this.movieService.getSearchlistMovies(this.movieName).subscribe(movies => {
      this.movies.push(...movies);
    });
  }

}
