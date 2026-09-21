import { Component, input, output } from '@angular/core';
import { Brewery } from '../../shared/models/brewery';

@Component({
  imports: [],
  selector: 'app-brewery-card',
  styleUrl: './brewery-card.css',
  templateUrl: './brewery-card.html',
})
export class BreweryCard {
  //Two way data binding
  brewery = input.required<Brewery>();
  //Boolean to track if the card was clicked on
  expanded = false
  opened = output<Brewery>()

  toggle(): void {
    this.expanded = !this.expanded
    this.opened.emit(this.brewery())
  }




}
