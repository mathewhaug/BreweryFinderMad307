import { Component } from '@angular/core';
import { Brewery } from '../../shared/models/brewery';
import { BreweryCard } from '../brewery-card/brewery-card';

@Component({
  imports: [BreweryCard],
  selector: 'app-brewery-list',
  styleUrl: './brewery-list.css',
  templateUrl: './brewery-list.html',
})
export class BreweryList {
  breweryList: Brewery[] = [
    {
      id: 1,
      name: 'Walkerville Brewery',
      city: 'Windsor',
      breweryType: 'Microbrewery',
      hasFoodMenu: true,
    },
    {
      id: 2,
      name: 'Craft Heads Brewing Co.',
      city: 'Windsor',
      breweryType: 'Brewpub',
      hasFoodMenu: false,
    },
    { id: 3, name: 'Frank Brewing Company', city: 'LaSalle', breweryType: 'Taproom' },
    {
      id: 4,
      name: 'Craft Kitchen & Brewery',
      city: 'Tecumseh',
      breweryType: 'Brewpub',
      hasFoodMenu: true,
    },
  ];

  // Let the parent component react to a card being opened
  onBreweryOpened(brewery: Brewery): void {
    //Place holder for now
    console.warn("Opened: ", brewery.name )
  }
}
