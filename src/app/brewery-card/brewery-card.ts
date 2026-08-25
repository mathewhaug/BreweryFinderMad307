import { Component, input, output } from '@angular/core';
import { Brewery } from '../shared/models/brewery';

@Component({
  imports: [],
  selector: 'app-brewery-card',
  styleUrl: './brewery-card.scss',
  templateUrl: './brewery-card.html',
})
export class BreweryCard {
  brewery = input.required<Brewery>();
  opened = output<Brewery>();

  protected expanded = false;

  protected toggle(): void {
    this.expanded = !this.expanded;
    this.opened.emit(this.brewery());
  }
}
