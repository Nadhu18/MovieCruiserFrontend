import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TmdbContainerComponent } from './components/tmdb-container/tmdb-container.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SearchlistComponent } from './components/searchlist/searchlist.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

//defines all the routes for the application
const movieRoutes: Routes = [
    {
        path: 'movies',
        children: [
            {
                path: '',
                redirectTo: '/movies/popular',
                pathMatch: 'full'
            },
            {
                path: 'popular',
                component: TmdbContainerComponent,
                data: {
                    movieType: 'popular'
                }
            },
            {
                path: 'top_rated',
                component: TmdbContainerComponent,
                data: {
                    movieType: 'top_rated'
                }
            },
            {
                path: 'watchlist',
                component: WatchlistComponent
            },
            {
                path: 'searchlist/:movieName',
                component: SearchlistComponent
            },
            {
                path: 'movieDetails/:movieID',
                component: MovieDetailsComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(movieRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class MovieRouterModule {}