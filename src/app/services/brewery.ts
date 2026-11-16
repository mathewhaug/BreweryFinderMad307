import { computed, effect, Service, signal } from '@angular/core';
import { Brewery } from '../shared/models/brewery';

// OpenBreweryDB is read only, so this service is now the local "My Breweries" store.
// It holds the breweries the user creates with the form, plus the ids of favourite API breweries.
@Service()
export class BreweryService {
  // localStorage keys. The app name prefix keeps them apart from anything else on localhost:4200.
  private readonly myBreweriesKey = 'brewery-explorer.my-breweries';
  private readonly favouritesKey = 'brewery-explorer.favourites';

  // Local seeds in the API shape. The ids are plain strings, not API UUIDs,
  // so these never collide with real OpenBreweryDB breweries.
  // The seeds are only the fallback: once anything is saved, storage wins.
  private breweries = signal<Brewery[]>(this.load(this.myBreweriesKey, [
    { id: 'local-1', name: 'Walkerville Brewery', brewery_type: 'micro', city: 'Windsor', state_province: 'Ontario', country: 'Canada' },
    { id: 'local-2', name: 'Craft Heads Brewing Co.', brewery_type: 'brewpub', city: 'Windsor', state_province: 'Ontario', country: 'Canada' },
    { id: 'local-3', name: 'Frank Brewing Company', brewery_type: 'regional', city: 'LaSalle', state_province: 'Ontario', country: 'Canada' },
    { id: 'local-4', name: 'Craft Kitchen & Brewery', brewery_type: 'brewpub', city: 'Tecumseh', state_province: 'Ontario', country: 'Canada' },
  ]));

  // Because this service is a root singleton, there is one copy for the whole app.
  // Favourites therefore survive navigating between pages.
  // They store API brewery ids only. The pages fetch the full breweries from the API.
  // Saving them to localStorage makes them survive a page refresh as well.
  private favourites = signal<string[]>(this.load(this.favouritesKey, []));

  breweryList = this.breweries.asReadonly();
  breweryCount = computed(() => this.breweries().length);

  favouriteIds = this.favourites.asReadonly();
  favouriteCount = computed(() => this.favourites().length);

  constructor() {
    // Each effect reruns whenever its signal changes and writes the new value back.
    // Nothing from the API is stored here: only the user's own list and favourite ids.
    effect(() => this.save(this.myBreweriesKey, this.breweries()));
    effect(() => this.save(this.favouritesKey, this.favourites()));
  }

  // A missing key gives JSON.parse('') which throws, the same as bad JSON,
  // so both cases fall back to the starting value.
  private load<T>(key: string, fallback: T): T {
    try {
      return JSON.parse(localStorage.getItem(key) ?? '') as T;
    } catch {
      return fallback;
    }
  }

  // Storage can be full or blocked (private mode, browser settings). That must never break the app.
  private save(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable: keep working in memory */
    }
  }

  // There is no server to hand out ids for local breweries, so the browser makes a UUID.
  addBrewery(b: Omit<Brewery, 'id'>): void {
    this.breweries.update((list) =>
      [...list, { ...b, id: crypto.randomUUID() }]);
  }

  // map() builds a new array, so the signal sees a new reference and notifies its readers.
  updateBrewery(updated: Brewery): void {
    this.breweries.update((list) =>
      list.map((b) =>
        (b.id === updated.id ? updated : b)));
  }

  removeBrewery(id: string): void {
    this.breweries.update((list) =>
      list.filter((b) => b.id !== id));
  }

  // Used by the form when editing.
  getBrewery(id: string): Brewery | undefined {
    return this.breweries().find((b) => b.id === id);
  }

  toggleFavourite(id: string): void {
    this.favourites.update((ids) =>
      ids.includes(id) ? ids.filter((existing) => existing !== id) : [...ids, id],
    );
  }

  isFavourite(id: string): boolean {
    return this.favourites().includes(id);
  }
}
