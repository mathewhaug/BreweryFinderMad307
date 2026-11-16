import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreweryApiService } from '../services/brewery-api.service';

// Loaded on demand by the @defer block on the brewery detail page.
@Component({
  imports: [RouterLink],
  selector: 'app-nearby-breweries',
  styleUrl: './nearby-breweries.scss',
  templateUrl: './nearby-breweries.html',
})
export class NearbyBreweries {
  city = input.required<string>();
  excludeId = input.required<string>();

  private api = inject(BreweryApiService);

  breweries = this.api.byCity(this.city);

  // Up to five other breweries in the same city, leaving out the one on the page.
  // value() throws in the error state, so return an empty list instead.
  nearby = computed(() => {
    if (this.breweries.error()) {
      return [];
    }
    return this.breweries.value().filter((b) => b.id !== this.excludeId()).slice(0, 5);
  });
}
