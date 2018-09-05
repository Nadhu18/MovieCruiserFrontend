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
    //Getting movieName from the URL
    this.route.params.subscribe(params => {
      this.movieName = params['movieName'];
    });

    //used to reload the page when we are on the same component
    this.router.routeReuseStrategy.shouldReuseRoute = function() {return false;}
  }

  ngOnInit() {
    //Getting movies that are matching the movieName from the service
    this.movieService.getSearchlistMovies(this.movieName).subscribe(movies => {
      this.movies.push(...movies);
    }, error => console.error("An Error has occured in searchlist component while getting movies.", error));
  }

}
