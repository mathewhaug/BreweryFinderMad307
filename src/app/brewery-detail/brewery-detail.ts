import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreweryApiService } from '../services/brewery-api.service';
import { BreweryService } from '../services/brewery';
import { ExternalLink } from '../directives/external-link';
import { Copy } from '../directives/copy';
import { Unless } from '../directives/unless';
import { NearbyBreweries } from '../nearby-breweries/nearby-breweries';

@Component({
  // NearbyBreweries is only used inside the @defer block in the template,
  // so the compiler moves it into its own lazy chunk.
  imports: [RouterLink, ExternalLink, Copy, Unless, NearbyBreweries],
  selector: 'app-brewery-detail',
  styleUrl: './brewery-detail.scss',
  templateUrl: './brewery-detail.html',
})
export class BreweryDetail {
  private api = inject(BreweryApiService);
  protected store = inject(BreweryService);

  // Filled from the :id route parameter by withComponentInputBinding().
  // The API uses string UUIDs, so the id is passed through as is.
  id = input.required<string>();

  brewery = this.api.byId(this.id);

  // value() throws while the resource is in an error state, so check hasValue() first.
  address = computed(() => {
    if (!this.brewery.hasValue()) {
      return '';
    }
    const b = this.brewery.value();
    return [b.street, b.city, b.state_province, b.postal_code, b.country].filter(Boolean).join(', ');
  });

  copiedText = signal<string | null>(null);
}
