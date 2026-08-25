import { computed, inject, Service, signal } from '@angular/core';
import { Brewery } from '../shared/models/brewery';
import { BREWERY_CONFIG } from '../shared/brewery-config';

@Service()
export class BreweryService {
  private config = inject(BREWERY_CONFIG);

  private breweries = signal<Brewery[]>([
    { id: 1, name: 'Walkerville Brewery', city: 'Windsor', breweryType: 'micro', hasFoodMenu: true },
    { id: 2, name: 'Craft Heads Brewing Co.', city: 'Windsor', breweryType: 'brewpub', hasFoodMenu: false },
    { id: 3, name: 'Frank Brewing Company', city: 'LaSalle', breweryType: 'large' },
    { id: 4, name: 'Craft Kitchen & Brewery', city: 'Tecumseh', breweryType: 'brewpub', hasFoodMenu: true },
  ]);

  breweryList = this.breweries.asReadonly();
  breweryCount = computed(() => this.breweries().length);
  readonly defaultCity = this.config.defaultCity;

  addBrewery(b: Brewery): void {
    this.breweries.update((list) => [...list, b]);
  }
}
