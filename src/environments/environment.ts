// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: "api_key=e2101a3fd6939be53919aed858fac894",
  tmdbEndPoint: "https://api.themoviedb.org/3/movie",
  imagePrefix: "https://image.tmdb.org/t/p/w500/",
  watchlistEndpoint: "http://localhost:8089/api/movie",
  searchlistEndpoint: "https://api.themoviedb.org/3/search/movie",
  movieDetailsEndpoint: "https://api.themoviedb.org/3/movie",
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
