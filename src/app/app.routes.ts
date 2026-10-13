import { Routes } from '@angular/router';
import { BreweryList } from './brewery-list/brewery-list';
import { BreweryByType } from './brewery-by-type/brewery-by-type';
import { BreweryDetail } from './brewery-detail/brewery-detail';
import { Favourites } from './favourites/favourites';
import { PageNotFound } from './page-not-found/page-not-found';

// Paths in this array have no leading slash. Links in templates use one, for example routerLink="/breweries".
export const routes: Routes = [
  // pathMatch: 'full' is required for an empty path. Every URL starts with an empty string,
  // so with the default prefix matching this redirect would match every URL.
  { path: '', redirectTo: '/breweries', pathMatch: 'full' },
  { path: 'breweries', component: BreweryList },

  // The router checks routes top to bottom and uses the first match.
  // This route is listed before breweries/:id to make the order easy to read.
  // It cannot clash anyway: it has three segments and breweries/:id has two.
  { path: 'breweries/type/:type', component: BreweryByType },
  { path: 'breweries/:id', component: BreweryDetail },
  { path: 'favourites', component: Favourites },

  // The wildcard matches anything, so it must be last.
  { path: '**', component: PageNotFound },
];
