import { Component, inject, signal } from '@angular/core';
import { Brewery } from '../shared/models/brewery';
import { BreweryCard } from '../brewery-card/brewery-card';
import { BreweryApiService } from '../services/brewery-api.service';
import { BREWERY_CONFIG } from '../shared/brewery-config';

@Component({
  imports: [BreweryCard],
  selector: 'app-brewery-list',
  styleUrl: './brewery-list.scss',
  templateUrl: './brewery-list.html',
})
export class BreweryList {
  private api = inject(BreweryApiService);

  city = signal(inject(BREWERY_CONFIG).defaultCity);

  // httpResource reruns the request every time city() changes.
  breweries = this.api.byCity(this.city);

  protected onBreweryOpened(brewery: Brewery): void {
    console.log('Brewery opened:', brewery);
  }
}
