import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreweryCard } from '../brewery-card/brewery-card';
import { BreweryService } from '../services/brewery';

@Component({
  imports: [BreweryCard, RouterLink],
  selector: 'app-favourites',
  styleUrl: './favourites.scss',
  templateUrl: './favourites.html',
})
export class Favourites {
  protected breweryService = inject(BreweryService);
}
