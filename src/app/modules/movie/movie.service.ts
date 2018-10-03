import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from './movie';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

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


  constructor(private http: HttpClient, private authService: AuthService) { }

  getHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("jwt_token"),
      'Content-Type': 'application/json',
      'userId': this.authService.getUserId()
    });
    return headers;
  }

  //gets all the details of a particular movie from tmdb
  getMovieDetails(movieID: number): Observable<Movie> {
    const endpoint = `${environment.movieDetailsEndpoint}/${movieID}?${environment.apiKey}`;

    return this.http.get(endpoint).pipe(
      retry(3),
      catchError(this.handleError),
      map(this.transformMoviePosterPath.bind(this))
    );
  }

  //gets all the movies that are matching the input from tmdb
  getSearchlistMovies(name: string, page: number = 1): Observable<Array<Movie>> {
    const endpoint = `${environment.searchlistEndpoint}?${environment.apiKey}&query=${name}&page=${page}&include_adult=false`;

    return this.http.get(endpoint).pipe(
      retry(3),
      catchError(this.handleError),
      map(this.pickMovieResponse),
      map(this.transformPosterPath.bind(this))
    );
  }

  //gets list of movies from the tmbd based the type we are passing
  getMovies(type: string, page: number = 1): Observable<Array<Movie>> {
    const endpoint = `${environment.tmdbEndPoint}/${type}?${environment.apiKey}&page=${page}`;

    return this.http.get(endpoint).pipe(
      retry(3),
      catchError(this.handleError),
      map(this.pickMovieResponse),
      map(this.transformPosterPath.bind(this))
    );
  }

  //appends the image URL and returns the list of movies
  transformPosterPath(movies): Array<Movie> {
    return movies.map(movie => {
      movie.movieId = movie.id
      movie.id = "";
      movie.poster_path = `${environment.imagePrefix}${movie.poster_path}`;
      return movie;
    });
  }

  //appends the image URL and returns the movie
  transformMoviePosterPath(movie): Movie {
    movie.movieId = movie.id
    movie.id = "";
    movie.poster_path = `${environment.imagePrefix}${movie.poster_path}`;
    return movie;
  }

  //returns the results from the response
  pickMovieResponse(response) {
    return response['results'];
  }

  //method will add the movie to watchlist and saved to the database
  addMovieTowatchlist(movie: Movie) {
    delete movie.id;
    let headers = this.getHttpHeaders();
    return this.http.post(environment.watchlistEndpoint, movie, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  //returns all the movies from the database
  getWatchListedMovies(): Observable<Array<Movie>> {
    let headers = this.getHttpHeaders();
    return this.http.get<Array<Movie>>(environment.watchlistEndpoint, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  //removes the particular movie from the database
  deleteMovieFromWatchlist(movieID: number) {
    let headers = this.getHttpHeaders();
    return this.http.delete(`${environment.watchlistEndpoint}/${movieID}`, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  //Updates the comment of the particular movie in the database
  addOrupdateComment(movie: Movie) {
    movie.userId = this.authService.getUserId();
    let headers = this.getHttpHeaders();
    return this.http.put(`${environment.watchlistEndpoint}/${movie.id}`, movie, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred in the client side', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
