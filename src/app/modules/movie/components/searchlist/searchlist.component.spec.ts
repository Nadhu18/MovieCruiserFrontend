import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchlistComponent } from './searchlist.component';
import { MovieService } from '../../movie.service';
import { Movie } from '../../movie';

describe('SearchlistComponent', () => {
  let component: SearchlistComponent;
  let fixture: ComponentFixture<SearchlistComponent>;
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

    movieServiceSpy = jasmine.createSpyObj("MovieService", ["getSearchlistMovies"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ SearchlistComponent ],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchlistComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.get(MovieService);
    movieServiceSpy.getSearchlistMovies.and.returnValue(of(movieList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrun searchlist movies on ngonint', () => {
    component.movieName="iron";
    component.movies = [];
    component.ngOnInit();
    expect(component.movies).toEqual(movieList);
  });

});
