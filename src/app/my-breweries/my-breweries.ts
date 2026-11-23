import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { BreweryService } from '../services/brewery';
import { Highlight } from '../directives/highlight';
import { Confirm } from '../directives/confirm';
import { BreweryTypePipe } from '../pipes/brewery-type';
import { Brewery } from '../shared/models/brewery';

// Breweries created with the form live only in the browser, because OpenBreweryDB is read only.
// They are not linked to /breweries/:id, which is for API ids.
@Component({
  imports: [RouterLink, Highlight, Confirm, BreweryTypePipe, MatButtonModule, MatTableModule, MatSortModule],
  selector: 'app-my-breweries',
  styleUrl: './my-breweries.scss',
  templateUrl: './my-breweries.html',
})
export class MyBreweries {
  protected store = inject(BreweryService);

  // The order of the columns in the table. Each name matches a matColumnDef in the template.
  protected columns = ['name', 'city', 'brewery_type', 'actions'];

  // matSort only reports which header was clicked. Sorting the rows is our job.
  protected sort = signal<Sort>({ active: 'name', direction: 'asc' });

  protected rows = computed(() => {
    const { active, direction } = this.sort();
    // Copy first: sort() works in place, and the store's array must never be changed from outside.
    const list = [...this.store.breweryList()];
    if (!direction) return list;
    const dir = direction === 'asc' ? 1 : -1;
    const key = active as keyof Brewery;
    return list.sort((a, b) => String(a[key] ?? '').localeCompare(String(b[key] ?? '')) * dir);
  });

  protected remove(id: string): void {
    this.store.removeBrewery(id);
  }
}
