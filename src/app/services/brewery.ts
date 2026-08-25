import { computed, Service, signal } from '@angular/core';
import { Brewery } from '../shared/models/brewery';

@Service()
export class BreweryService {
  private breweries = signal<Brewery[]>([
    { id: 1, name: 'Walkerville Brewery', city: 'Windsor', breweryType: 'micro', hasFoodMenu: true },
    { id: 2, name: 'Craft Heads Brewing Co.', city: 'Windsor', breweryType: 'brewpub', hasFoodMenu: false },
    { id: 3, name: 'Frank Brewing Company', city: 'LaSalle', breweryType: 'large' },
    { id: 4, name: 'Craft Kitchen & Brewery', city: 'Tecumseh', breweryType: 'brewpub', hasFoodMenu: true },
  ]);

  breweryList = this.breweries.asReadonly();
  breweryCount = computed(() => this.breweries().length);

  addBrewery(b: Brewery): void {
    this.breweries.update((list) => [...list, b]);
  }
}
