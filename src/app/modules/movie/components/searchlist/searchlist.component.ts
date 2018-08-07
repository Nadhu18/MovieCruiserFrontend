import { Component, OnInit } from '@angular/core';
import { Movie } from '../../movie';
import { MovieService } from '../../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'movie-searchlist',
  templateUrl: './searchlist.component.html',
  styleUrls: ['./searchlist.component.css']
})
export class SearchlistComponent implements OnInit {
  movies: Array<Movie>;
  movieName: string;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { 
    this.movies = [];
    this.route.params.subscribe(params => {
      this.movieName = params['movieName'];
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function() {return false;}
  }

  ngOnInit() {
    this.movieService.getSearchlistMovies(this.movieName).subscribe(movies => {
      this.movies.push(...movies);
    });
  }

}
