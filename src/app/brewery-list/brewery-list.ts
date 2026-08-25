import { Component } from '@angular/core';
import { Brewery } from '../shared/models/brewery';
import { BreweryCard } from '../brewery-card/brewery-card';

@Component({
  imports: [BreweryCard],
  selector: 'app-brewery-list',
  styleUrl: './brewery-list.scss',
  templateUrl: './brewery-list.html',
})
export class BreweryList {
  protected breweryList: Brewery[] = [
    { id: 1, name: 'Walkerville Brewery', city: 'Windsor', breweryType: 'micro', hasFoodMenu: true },
    { id: 2, name: 'Craft Heads Brewing Co.', city: 'Windsor', breweryType: 'brewpub', hasFoodMenu: false },
    { id: 3, name: 'Frank Brewing Company', city: 'LaSalle', breweryType: 'large' },
    { id: 4, name: 'Craft Kitchen & Brewery', city: 'Tecumseh', breweryType: 'brewpub', hasFoodMenu: true },
  ];

  protected onBreweryOpened(brewery: Brewery): void {
    console.log('Brewery opened:', brewery);
  }
}
