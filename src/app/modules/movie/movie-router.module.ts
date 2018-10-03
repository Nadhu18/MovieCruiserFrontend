import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TmdbContainerComponent } from './components/tmdb-container/tmdb-container.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SearchlistComponent } from './components/searchlist/searchlist.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './auth-guard.service';

//defines all the routes for the application
const movieRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'movies',
        children: [
            {
                path: '',
                redirectTo: '/movies/popular',
                pathMatch: 'full',
                canActivate: [AuthGuardService]
            },
            {
                path: 'popular',
                component: TmdbContainerComponent,
                data: {
                    movieType: 'popular'
                },
                canActivate: [AuthGuardService]
            },
            {
                path: 'top_rated',
                component: TmdbContainerComponent,
                data: {
                    movieType: 'top_rated'
                },
                canActivate: [AuthGuardService]
            },
            {
                path: 'watchlist',
                component: WatchlistComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'searchlist/:movieName',
                component: SearchlistComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'movieDetails/:movieID',
                component: MovieDetailsComponent,
                canActivate: [AuthGuardService]
            }
        ],
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(movieRoutes),
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuardService]
})

export class MovieRouterModule {}