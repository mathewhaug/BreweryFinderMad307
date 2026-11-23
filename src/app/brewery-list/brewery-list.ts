import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Brewery } from '../shared/models/brewery';
import { BreweryCard } from '../brewery-card/brewery-card';
import { BreweryApiService } from '../services/brewery-api.service';
import { BREWERY_CONFIG } from '../shared/brewery-config';

@Component({
  imports: [
    BreweryCard,
    DecimalPipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatPaginatorModule,
  ],
  selector: 'app-brewery-list',
  styleUrl: './brewery-list.scss',
  templateUrl: './brewery-list.html',
})
export class BreweryList {
  private api = inject(BreweryApiService);

  city = signal(inject(BREWERY_CONFIG).defaultCity);
  pageIndex = signal(0);
  pageSize = signal(10);

  // httpResource reruns the request every time city(), pageIndex() or pageSize() changes.
  breweries = this.api.byCityPaged(this.city, this.pageIndex, this.pageSize);

  // A second request for the total count. It only depends on the city, so paging does not resend it.
  meta = this.api.metaByCity(this.city);
  total = computed(() => this.meta.hasValue() ? Number(this.meta.value().total) : 0);

  // A new city starts again from the first page.
  protected search(value: string): void {
    this.city.set(value);
    this.pageIndex.set(0);
  }

  protected onPage(e: PageEvent): void {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
  }

  protected onBreweryOpened(brewery: Brewery): void {
    console.log('Brewery opened:', brewery);
  }
}
