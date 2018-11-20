import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { WatchlistComponent } from './watchlist.component';
import { MovieService } from '../../movie.service';
import { Movie } from '../../movie';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
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

  beforeEach(async(() => {

    movieServiceSpy = jasmine.createSpyObj("MovieService", ["getWatchListedMovies"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [WatchlistComponent],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    movieServiceSpy = TestBed.get(MovieService);
    movieServiceSpy.getWatchListedMovies.and.returnValue(of(movieList));
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retun movielist on ngoninit', () => {
    component.movies = [];
    component.ngOnInit();
    expect(component.movies).toEqual(movieList);
  });

});
