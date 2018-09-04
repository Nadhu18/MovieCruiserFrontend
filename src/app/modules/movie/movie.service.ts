import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from './movie';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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

  constructor(private http: HttpClient) {}

  //gets all the details of a particular movie from tmdb
  getMovieDetails(movieID: number): Observable<Movie> {
    const endpoint = `${environment.movieDetailsEndpoint}/${movieID}?${environment.apiKey}`;

    return this.http.get(endpoint).pipe(
      retry(3),
      map(this.transformMoviePosterPath.bind(this))
    );
  }

  //gets all the movies that are matching the input from tmdb
  getSearchlistMovies(name: string, page: number = 1): Observable<Array<Movie>> {
    const endpoint = `${environment.searchlistEndpoint}?${environment.apiKey}&query=${name}&page=${page}&include_adult=false`;

    return this.http.get(endpoint).pipe(
      retry(3),
      map(this.pickMovieResponse),
      map(this.transformPosterPath.bind(this))
    );
  }

  //gets list of movies from the tmbd based the type we are passing
  getMovies(type: string, page: number = 1): Observable<Array<Movie>> {
    const endpoint = `${environment.tmdbEndPoint}/${type}?${environment.apiKey}&page=${page}`;

    return this.http.get(endpoint).pipe(
      retry(3),
      map(this.pickMovieResponse),
      map(this.transformPosterPath.bind(this))
    );
  }

  //appends the image URL and returns the list of movies
  transformPosterPath(movies): Array<Movie> {
    return movies.map(movie => {
      movie.poster_path = `${environment.imagePrefix}${movie.poster_path}`;
      return movie;
    });
  }

  //appends the image URL and returns the movie
  transformMoviePosterPath(movie): Movie {
      movie.poster_path = `${environment.imagePrefix}${movie.poster_path}`;
      return movie;
  }

  //returns the results from the response
  pickMovieResponse(response) {
    return response['results'];
  }

  //method will add the movie to watchlist and saved to the database
  addMovieTowatchlist(movie: Movie) {
    return this.http.post(environment.watchlistEndpoint, movie);
  }

  //returns all the movies from the database
  getWatchListedMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(environment.watchlistEndpoint);
  }

  //removes the particular movie from the database
  deleteMovieFromWatchlist(movieID: number) {
    return this.http.delete(`${environment.watchlistEndpoint}/${movieID}`);
  }

  //Updates the comment of the particular movie in the database
  addOrupdateComment(movie: Movie) {
    return this.http.put(`${environment.watchlistEndpoint}/${movie.id}`, movie);
  }

}
