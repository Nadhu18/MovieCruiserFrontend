import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { MovieService } from './movie.service';
import { ContainerComponent } from './components/container/container.component';
import { MovieRouterModule } from './movie-router.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { TmdbContainerComponent } from './components/tmdb-container/tmdb-container.component';
import { SearchlistComponent } from './components/searchlist/searchlist.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MovieRouterModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  declarations: [
    ThumbnailComponent,
    ContainerComponent,
    WatchlistComponent,
    TmdbContainerComponent,
    SearchlistComponent
  ],
  exports: [
    ThumbnailComponent,
    MovieRouterModule
  ],
  providers: [
    MovieService
  ]
})
export class MovieModule { }
