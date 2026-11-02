import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreweryApiService } from '../services/brewery-api.service';
import { BreweryService } from '../services/brewery';

@Component({
  imports: [RouterLink],
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
}
