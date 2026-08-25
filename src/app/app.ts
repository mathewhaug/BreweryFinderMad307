import { Component } from '@angular/core';
import { Brewery } from './shared/models/brewery';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected title = 'Brewery Explorer';

  protected breweryList: Brewery[] = [
    { id: 1, name: 'Walkerville Brewery', city: 'Windsor', breweryType: 'Microbrewery', hasFoodMenu: true },
    { id: 2, name: 'Craft Heads Brewing Co.', city: 'Windsor', breweryType: 'Brewpub', hasFoodMenu: false },
    { id: 3, name: 'Frank Brewing Company', city: 'LaSalle', breweryType: 'Taproom' },
    { id: 4, name: 'Craft Kitchen & Brewery', city: 'Tecumseh', breweryType: 'Brewpub', hasFoodMenu: true },
  ];

  protected toggleFoodMenu(brewery: Brewery): void {
    brewery.hasFoodMenu = !brewery.hasFoodMenu;
  }
}
