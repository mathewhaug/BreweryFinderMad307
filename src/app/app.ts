import { Component } from '@angular/core';
import { Brewery } from './shared/models/brewery';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected title = 'Brewery Explorer';



  protected toggleFoodMenu(brewery: Brewery): void {
    brewery.hasFoodMenu = !brewery.hasFoodMenu;
  }
}
