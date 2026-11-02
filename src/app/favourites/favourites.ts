import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreweryCard } from '../brewery-card/brewery-card';
import { BreweryApiService } from '../services/brewery-api.service';
import { BreweryService } from '../services/brewery';

@Component({
  imports: [BreweryCard, RouterLink],
  selector: 'app-favourites',
  styleUrl: './favourites.scss',
  templateUrl: './favourites.html',
})
export class Favourites {
  private api = inject(BreweryApiService);
  private store = inject(BreweryService);

  // The store only keeps ids. One request with by_ids fetches every favourite.
  // With no ids the request function returns undefined, so the resource stays idle and sends nothing.
  favourites = this.api.byIds(this.store.favouriteIds);
}
