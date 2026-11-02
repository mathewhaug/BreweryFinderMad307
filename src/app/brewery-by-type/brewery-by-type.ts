import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreweryCard } from '../brewery-card/brewery-card';
import { BreweryApiService } from '../services/brewery-api.service';

@Component({
  imports: [BreweryCard, RouterLink, RouterLinkActive],
  selector: 'app-brewery-by-type',
  styleUrl: './brewery-by-type.scss',
  templateUrl: './brewery-by-type.html',
})
export class BreweryByType {
  private api = inject(BreweryApiService);

  // large and bar are deprecated in the API, so they are not offered here.
  protected types = ['micro', 'nano', 'regional', 'brewpub', 'contract', 'proprietor'];

  // Clicking between types reuses this same component instance.
  // Only the type input changes, and httpResource sends a new request.
  // That only works because the route parameter arrives as a signal.
  type = input.required<string>();

  breweries = this.api.byType(this.type);
}
