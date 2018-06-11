import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { MovieService } from './movie.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    HelloWorldComponent,
    ThumbnailComponent
  ],
  exports: [
    HelloWorldComponent,
    ThumbnailComponent
  ],
  providers: [
    MovieService
  ]
})
export class MovieModule { }
