import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ExternalLink } from '../directives/external-link';
import { Highlight } from '../directives/highlight';
import { Brewery } from '../shared/models/brewery';
import { BreweryService } from '../services/brewery';
import { BreweryTypePipe } from '../pipes/brewery-type';

@Component({
  imports: [RouterLink, ExternalLink, BreweryTypePipe, MatCardModule, MatButtonModule, MatIconModule],
  // hostDirectives applies Highlight to <app-brewery-card> itself, as if the user had written appHighlight on it.
  // The input is renamed for the outside world: parents pass highlightColour, Highlight receives appHighlight.
  hostDirectives: [
    { directive: Highlight, inputs: ['appHighlight: highlightColour'] },
  ],
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
