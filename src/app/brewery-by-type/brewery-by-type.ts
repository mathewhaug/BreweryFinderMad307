import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreweryCard } from '../brewery-card/brewery-card';
import { BreweryService } from '../services/brewery';

@Component({
  imports: [BreweryCard, RouterLink],
  selector: 'app-brewery-by-type',
  styleUrl: './brewery-by-type.scss',
  templateUrl: './brewery-by-type.html',
})
export class BreweryByType {
  protected breweryService = inject(BreweryService);

  // Clicking between Micro, Brewpub, and Large reuses this same component instance.
  // Only the type input changes, and computed() recalculates the list.
  // That only works because the route parameter arrives as a signal.
  type = input.required<string>();

  protected breweries = computed(() =>
    this.breweryService.breweryList().filter((b) => b.breweryType === this.type()),
  );
}
