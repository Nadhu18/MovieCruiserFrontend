import { TestBed, inject } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { MovieService } from './movie.service';
import { Movie } from './movie';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('MovieService', () => {

  let tmdbEndPoint = `${environment.tmdbEndPoint}/popular?${environment.apiKey}&page=1`;
  let movieDetailsEndpoint = `${environment.movieDetailsEndpoint}/123?${environment.apiKey}`;
  let searchlistEndpoint = `${environment.searchlistEndpoint}?${environment.apiKey}&query=mov&page=1&include_adult=false`;

  let movie: Movie = {
    id: 1,
    movieId: 123,
    overview: "overview",
    poster_path: "poster_path",
    released_date: "released_date",
    isWatchlisted: true,
    comments: "comments",
    title: "movie title",
    userId: "user1"
  };
  let movieList: Movie[] = [movie];
  let searchMovieRes = {'results': movieList}

  let httpMock: HttpTestingController;
  let movieService: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    httpMock = TestBed.get(HttpTestingController);
    movieService = TestBed.get(MovieService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(movieService).toBeTruthy();
  });

  it('should return the Observable<Array<Movie>> from getMovies method', () => {
    movieService.getMovies("popular").subscribe(movies => {
      expect(movies).toEqual(movieList);
    });

    const mockReq = httpMock.expectOne(tmdbEndPoint);
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(movieList);
  });

  it('should thrown an error for getMovies method', () => {
    movieService.getMovies("popular").subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });

    const mockReq = httpMock.expectOne(tmdbEndPoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should return movie details on sending movieID', () => {
    movieService.getMovieDetails(123).subscribe(m => {
      expect(m).toEqual(movie);
    });

    const mockReq = httpMock.expectOne(movieDetailsEndpoint);
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(movie);
  });

  it('should return error for getMovieDetails method', () => {
    movieService.getMovieDetails(123).subscribe({
      error(err){
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });

    const mockReq = httpMock.expectOne(movieDetailsEndpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should return movies based on search term', () => {
    movieService.getSearchlistMovies("mov").subscribe(m => {
      expect(m).toEqual(movieList);
    });

    const mockReq = httpMock.expectOne(searchlistEndpoint);
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(movieList);
  });

  it('should throw error from getSearchListMovies method', () => {
    movieService.getSearchlistMovies("mov").subscribe({
      error(err){
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).toBeDefined();
      }
    });

    const mockReq = httpMock.expectOne(searchlistEndpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should return watchlist movies', () => {
    movieService.getWatchListedMovies().subscribe(m => {
      expect(m).toEqual(movieList);
    });

    const mockReq = httpMock.expectOne(environment.watchlistEndpoint);
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(movieList);
  });

  it('should throw error from getWatchlistMovies method', () => {
    movieService.getWatchListedMovies().subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });

    const mockReq = httpMock.expectOne(environment.watchlistEndpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should delete movie from watchlist', () => {
    movieService.deleteMovieFromWatchlist(123).subscribe(m => {
      expect(m).toEqual(movie);
    });

    const mockReq = httpMock.expectOne(`${environment.watchlistEndpoint}/123`);
    expect(mockReq.request.method).toEqual('DELETE');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(movie);
  });

  it('should throw error from deleteWatchlistMovie', () => {
    movieService.deleteMovieFromWatchlist(123).subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });

    const mockReq = httpMock.expectOne(`${environment.watchlistEndpoint}/123`);
    expect(mockReq.request.method).toEqual('DELETE');    
  });

  it('should add movie to watchlist', () => {
    movieService.addMovieTowatchlist(movie).subscribe(m => {
      expect(m).toEqual(movie);
    });

    const mockReq = httpMock.expectOne(environment.watchlistEndpoint);
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(movie);
  });

  it('should throw error from addMovieToWatchlist', () => {
    movieService.addMovieTowatchlist(movie).subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });

    const mockReq = httpMock.expectOne(environment.watchlistEndpoint);
    expect(mockReq.request.method).toEqual('POST');    
  });

  it('should update movie in watchlist', () => {
    movieService.addOrupdateComment(movie).subscribe(m => {
      expect(m).toEqual(movie);
    });

    const mockReq = httpMock.expectOne(`${environment.watchlistEndpoint}/${movie.id}`);
    expect(mockReq.request.method).toEqual('PUT');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(movie);
  });

  it('should throw error from addOrUpdateComment method', () => {
    movieService.addOrupdateComment(movie).subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });

    const mockReq = httpMock.expectOne(`${environment.watchlistEndpoint}/${movie.id}`);
    expect(mockReq.request.method).toEqual('PUT');    
  });

});
