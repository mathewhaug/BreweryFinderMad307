import { Component } from '@angular/core';
import { Brewery } from './shared/models/brewery';
import { BreweryList } from './Components/brewery-list/brewery-list';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [BreweryList],
})
export class App {
  protected title = 'Brewery Explorer';

  protected toggleFoodMenu(brewery: Brewery): void {
    brewery.hasFoodMenu = !brewery.hasFoodMenu;
  }
}
