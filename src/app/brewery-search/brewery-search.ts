import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreweryCard } from '../brewery-card/brewery-card';
import { BreweryApiService } from '../services/brewery-api.service';
import { Brewery } from '../shared/models/brewery';

// This page uses HttpClient and an Observable on purpose, to compare with httpResource.
// Here we manage loading, error, and results ourselves.
@Component({
  imports: [BreweryCard],
  selector: 'app-brewery-search',
  styleUrl: './brewery-search.scss',
  templateUrl: './brewery-search.html',
})
export class BrewerySearch {
  private api = inject(BreweryApiService);
  private destroyRef = inject(DestroyRef);

  // The app is zoneless, so values set inside subscribe() must be signals
  // or the template would never find out they changed.
  results = signal<Brewery[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  runSearch(term: string): void {
    const query = term.trim();
    if (!query) {
      return;
    }
    this.loading.set(true);
    this.error.set(null);

    // Nothing is sent until subscribe() runs: HttpClient Observables are cold.
    // takeUntilDestroyed() cancels the request if the user leaves the page first.
    this.api.search(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (breweries) => {
        this.results.set(breweries);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Search failed. Try again.');
        this.loading.set(false);
      },
    });
  }
}
