import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MovieDetailsComponent } from './movie-details.component';
import { Movie } from '../../movie';
import { MovieService } from '../../movie.service';
import { AuthService } from '../../auth.service';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let movie: Movie = {
    id: 1,
    movieId: 123,
    overview: "overview",
    poster_path: "poster_path",
    released_date: "released_date",
    isWatchlisted: false,
    comments: "comments",
    title: "movie title",
    userId: "user1"
  };
  let movieList: Movie[] = [movie];
  let watchlistMovie: Movie = {
    id: 1,
    movieId: 123,
    overview: "overview",
    poster_path: "poster_path",
    released_date: "released_date",
    isWatchlisted: true,
    comments: "watchlist comments",
    title: "movie title",
    userId: "user1"
  };
  let watchList: Movie[] = [watchlistMovie];
  let userId: string = "user1";

  beforeEach(async(() => {

    movieServiceSpy = jasmine.createSpyObj("MovieService", ["addMovieTowatchlist", "getWatchListedMovies", "deleteMovieFromWatchlist", "addOrupdateComment", "getMovieDetails"]);
    authServiceSpy = jasmine.createSpyObj("AuthService", ["getUserId"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      declarations: [ MovieDetailsComponent ],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }, { provide: AuthService, useValue: authServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.get(MovieService);
    movieServiceSpy.getMovieDetails.and.returnValue(of(movie));
    movieServiceSpy.addMovieTowatchlist.and.returnValue(of(movie));
    movieServiceSpy.getWatchListedMovies.and.returnValue(of(watchList));
    movieServiceSpy.deleteMovieFromWatchlist.and.returnValue(of(movie));
    movieServiceSpy.addOrupdateComment.and.returnValue(of(movie));
    authServiceSpy = TestBed.get(AuthService);
    authServiceSpy.getUserId.and.returnValue(userId);
    //fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retun movie when on nginit', () => {
    component.movieID = 123;
    component.ngOnInit();
    expect(component.movie).toEqual(watchlistMovie);
    expect(movieServiceSpy.getMovieDetails.calls.count()).toBe(1);
    expect(movieServiceSpy.getWatchListedMovies.calls.count()).toBe(1);
    expect(authServiceSpy.getUserId.calls.count()).toBe(1);
  });

  it('should add the movie to watchlist', () => {
      component.movie = movie;
      component.addMovieToWatchlist();
      expect(component.movie).toEqual(watchlistMovie);
      expect(movieServiceSpy.addMovieTowatchlist.calls.count()).toBe(1);
      expect(movieServiceSpy.getWatchListedMovies.calls.count()).toBe(1);
  });

  it('should delete the movie from watchlist', () => {
    component.movie = movie;
    component.deleteMovieFromWatchlist();
    expect(component.movie).toEqual(movie);
    expect(movieServiceSpy.deleteMovieFromWatchlist.calls.count()).toBe(1);
  });

  it('should update the comment', () => {
    component.movie = movie;
    component.movie.isWatchlisted = true;
    component.comment = "watchlist comments";
    component.addOrupdateComment();
    expect(component.movie).toEqual(watchlistMovie);
    expect(movieServiceSpy.addOrupdateComment.calls.count()).toBe(1);
  });
  
});
