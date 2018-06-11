import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from './movie';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  tmdbEndPoint: string;
  imagePrefix: string;

  constructor(private http: HttpClient) {
    this.tmdbEndPoint= "https://api.themoviedb.org/3/movie/popular?api_key=e2101a3fd6939be53919aed858fac894&page=1";
    this.imagePrefix = "https://image.tmdb.org/t/p/w500/";
   }

   getPopularMovies(): Observable<Array<Movie>> {
   return this.http.get(this.tmdbEndPoint).pipe(
     map(this.pickMovieResponse),
     map(this.transformPosterPath.bind(this))
    );
   }

   transformPosterPath(movies): Array<Movie> {
     return movies.map(movie => {
      movie.poster_path = `${this.imagePrefix}${movie.poster_path}`;
      return movie;});
   }

   pickMovieResponse(response) {
     return response['results'];
   }

}
