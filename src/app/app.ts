import { Component } from '@angular/core';
import { BreweryList } from './brewery-list/brewery-list';

@Component({
  imports: [BreweryList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected title = 'Brewery Explorer';
}
