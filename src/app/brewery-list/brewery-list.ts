import { Component, inject } from '@angular/core';
import { Brewery } from '../shared/models/brewery';
import { BreweryCard } from '../brewery-card/brewery-card';
import { BreweryService } from '../services/brewery';

@Component({
  imports: [BreweryCard],
  selector: 'app-brewery-list',
  styleUrl: './brewery-list.scss',
  templateUrl: './brewery-list.html',
})
export class BreweryList {
  private breweryService = inject(BreweryService);

  protected breweryList = this.breweryService.breweryList;

  protected onBreweryOpened(brewery: Brewery): void {
    console.log('Brewery opened:', brewery);
  }
}
