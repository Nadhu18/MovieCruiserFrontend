import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TmdbContainerComponent } from './tmdb-container.component';
import { MovieService } from '../../movie.service';
import { Movie } from '../../movie';

describe('TmdbContainerComponent', () => {
  let component: TmdbContainerComponent;
  let fixture: ComponentFixture<TmdbContainerComponent>;
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

    movieServiceSpy = jasmine.createSpyObj("MovieService", ["getMovies"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ TmdbContainerComponent ],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmdbContainerComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.get(MovieService);
    movieServiceSpy.getMovies.and.returnValue(of(movieList));
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return movies on ngoninit', () => {
    component.movieType = "popular";
    component.ngOnInit();
    expect(component.movies).toEqual(movieList);
  });

});
