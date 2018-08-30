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
  searchlistEndpoint: string;
  movieDetailsEndpoint: string;

  constructor(private http: HttpClient) {
    this.apiKey = "api_key=e2101a3fd6939be53919aed858fac894";
    this.tmdbEndPoint = "https://api.themoviedb.org/3/movie";
    this.imagePrefix = "https://image.tmdb.org/t/p/w500/";
    this.watchlistEndpoint = "http://localhost:49954/api/movie";
    this.searchlistEndpoint = "https://api.themoviedb.org/3/search/movie";
    this.movieDetailsEndpoint = "https://api.themoviedb.org/3/movie";
  }

  getMovieDetails(movieID: number): Observable<Movie> {
    const endpoint = `${this.movieDetailsEndpoint}/${movieID}?${this.apiKey}`;

    return this.http.get(endpoint).pipe(
      retry(3),
      map(this.transformMoviePosterPath.bind(this))
    );
  }

  getSearchlistMovies(name: string, page: number = 1): Observable<Array<Movie>> {
    const endpoint = `${this.searchlistEndpoint}?${this.apiKey}&query=${name}&page=${page}&include_adult=false`;

    return this.http.get(endpoint).pipe(
      retry(3),
      map(this.pickMovieResponse),
      map(this.transformPosterPath.bind(this))
    );
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
      return movie;
    });
  }

  transformMoviePosterPath(movie): Movie {
      movie.poster_path = `${this.imagePrefix}${movie.poster_path}`;
      return movie;
  }

  pickMovieResponse(response) {
    return response['results'];
  }

  addMovieTowatchlist(movie: Movie) {
    return this.http.post(this.watchlistEndpoint, movie);
  }

  getWatchListedMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(this.watchlistEndpoint);
  }

  deleteMovieFromWatchlist(movieID: number) {
    return this.http.delete(`${this.watchlistEndpoint}/${movieID}`);
  }

}
