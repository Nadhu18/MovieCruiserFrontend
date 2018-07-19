import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from './movie';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  tmdbEndPoint: string;
  imagePrefix: string;
  apiKey: string;
  watchlistEndpoint: string;

  constructor(private http: HttpClient) {
    this.apiKey = "api_key=e2101a3fd6939be53919aed858fac894";
    this.tmdbEndPoint= "https://api.themoviedb.org/3/movie";
    this.imagePrefix = "https://image.tmdb.org/t/p/w500/";
    this.watchlistEndpoint = " http://localhost:3000/watchlist";
   }

   getMovies(type: string, page: number = 1): Observable<Array<Movie>> {
    const endpoint = `${this.tmdbEndPoint}/${type}?${this.apiKey}&page=${page}`;
  return this.http.get(endpoint).pipe(
    retry(3),
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

   addMovieTowatchlist(movie) {
     let arr = [];
     this.getWatchListedMovies().subscribe((movies) => {
       console.log(movies);
       arr.push(...movies)});
     console.log(arr);
     if(arr.some(a => a.id==movie.id)){
       console.log("exists");
     }else {
     return this.http.post(this.watchlistEndpoint, movie);}
   }

   getWatchListedMovies(): Observable<Array<Movie>> {
     return this.http.get<Array<Movie>>(this.watchlistEndpoint);
   }

}
