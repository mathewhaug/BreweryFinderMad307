import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brewery } from '../shared/models/brewery';

@Component({
  imports: [RouterLink],
  selector: 'app-brewery-card',
  styleUrl: './brewery-card.scss',
  templateUrl: './brewery-card.html',
})
export class BreweryCard {
  brewery = input.required<Brewery>();
  isFavourite = input(false);
  opened = output<Brewery>();
  favouriteToggled = output<number>();

  protected expanded = false;

  protected toggle(): void {
    this.expanded = !this.expanded;
    this.opened.emit(this.brewery());
  }

  protected onFavouriteClick(event: MouseEvent): void {
    // Without stopPropagation(), this click would bubble up and
    // run the card's own click handler too, expanding the card.
    event.stopPropagation();
    this.favouriteToggled.emit(this.brewery().id);
  }
}
