import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../movie';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  @Input()
  movie: Movie;

  constructor(private router: Router) {}

  ngOnInit() {}

  //Will navigate to movieDetails component
  getMovieDetails(): void {
    this.router.navigate(['/movies/movieDetails', this.movie.movieId]);
  }

}
