import { Component, input } from '@angular/core';
import { Brewery } from '../../shared/models/brewery';

@Component({
  imports: [],
  selector: 'app-brewery-card',
  styleUrl: './brewery-card.css',
  templateUrl: './brewery-card.html',
})
export class BreweryCard {
  brewery = input.required<Brewery>();
}
