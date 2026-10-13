import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreweryService } from '../services/brewery';

@Component({
  imports: [RouterLink],
  selector: 'app-brewery-detail',
  styleUrl: './brewery-detail.scss',
  templateUrl: './brewery-detail.html',
})
export class BreweryDetail {
  protected breweryService = inject(BreweryService);

  // Filled from the :id route parameter by withComponentInputBinding().
  // Route parameters always arrive as strings, so the id is converted with Number().
  // In Week 10 the live API uses string ids, and this conversion goes away.
  id = input.required<string>();

  protected brewery = computed(() => this.breweryService.getById(Number(this.id())));
}
