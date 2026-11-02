import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreweryService } from '../services/brewery';

// Breweries created with the form live only in the browser, because OpenBreweryDB is read only.
// They are not linked to /breweries/:id, which is for API ids.
@Component({
  imports: [RouterLink],
  selector: 'app-my-breweries',
  styleUrl: './my-breweries.scss',
  templateUrl: './my-breweries.html',
})
export class MyBreweries {
  protected store = inject(BreweryService);
}
