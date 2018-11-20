import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ThumbnailComponent } from './thumbnail.component';
import { MatCardModule } from '@angular/material/card';
import { Movie } from '../../movie';

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;
  let router: Router;
  let movie: Movie

  beforeEach(async(() => {

    movie = {
      id: 123,
      comments: "comments",
      isWatchlisted: true,
      movieId: 12,
      overview: "overview",
      poster_path: "poster path",
      released_date: "released date",
      title: "title",
      userId: "user"
    };
    router = jasmine.createSpyObj("router", ["navigate"]);

    TestBed.configureTestingModule({
      imports: [MatCardModule, RouterTestingModule],
      declarations: [ThumbnailComponent],
      providers: [{ provide: Router, useValue: router }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to movie details page', () => {
    component.movie = movie;
    component.getMovieDetails();
    expect(router.navigate).toHaveBeenCalledWith(['/movies/movieDetails', 12]);
  });
});
