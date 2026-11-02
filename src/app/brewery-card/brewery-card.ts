import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brewery } from '../shared/models/brewery';
import { BreweryService } from '../services/brewery';

@Component({
  imports: [RouterLink],
  selector: 'app-brewery-card',
  styleUrl: './brewery-card.scss',
  templateUrl: './brewery-card.html',
})
export class BreweryCard {
  // The card talks to the favourites store directly, so every page that shows cards
  // gets a working favourite toggle without wiring an output.
  protected store = inject(BreweryService);

  brewery = input.required<Brewery>();
  opened = output<Brewery>();

  protected expanded = false;

  protected toggle(): void {
    this.expanded = !this.expanded;
    this.opened.emit(this.brewery());
  }

  protected onFavouriteClick(event: MouseEvent): void {
    // Without stopPropagation(), this click would bubble up and
    // run the card's own click handler too, expanding the card.
    event.stopPropagation();
    this.store.toggleFavourite(this.brewery().id);
  }
}
