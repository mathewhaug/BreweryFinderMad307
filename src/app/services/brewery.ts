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

  // Because this service is a root singleton, there is one copy for the whole app.
  // Favourites therefore survive navigating between pages: the Week 5 idea paying off in Week 6.
  private favouriteIds = signal<readonly number[]>([]);

  breweryList = this.breweries.asReadonly();
  breweryCount = computed(() => this.breweries().length);
  readonly defaultCity = this.config.defaultCity;

  favourites = computed(() => this.breweries().filter((b) => this.favouriteIds().includes(b.id)));
  favouriteCount = computed(() => this.favouriteIds().length);

  addBrewery(b: Brewery): void {
    this.breweries.update((list) => [...list, b]);
  }

  // map() builds a new array, so the signal sees a new reference and notifies its readers.
  updateBrewery(updated: Brewery): void {
    this.breweries.update((list) => list.map((b) => (b.id === updated.id ? updated : b)));
  }

  // The id is also dropped from favourites, otherwise favouriteCount would still count it.
  removeBrewery(id: number): void {
    this.breweries.update((list) => list.filter((b) => b.id !== id));
    this.favouriteIds.update((ids) => ids.filter((existing) => existing !== id));
  }

  // Used by the form when editing. Same lookup as getById, named for that purpose.
  getBrewery(id: number): Brewery | undefined {
    return this.getById(id);
  }

  // There is no server to hand out ids yet, so a new brewery gets one more than the largest id.
  nextId(): number {
    return Math.max(0, ...this.breweries().map((b) => b.id)) + 1;
  }

  toggleFavourite(id: number): void {
    this.favouriteIds.update((ids) =>
      ids.includes(id) ? ids.filter((existing) => existing !== id) : [...ids, id],
    );
  }

  isFavourite(id: number): boolean {
    return this.favouriteIds().includes(id);
  }

  getById(id: number): Brewery | undefined {
    return this.breweries().find((b) => b.id === id);
  }
}
