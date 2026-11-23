import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { BreweryApiService } from '../services/brewery-api.service';
import { BreweryService } from '../services/brewery';
import { ExternalLink } from '../directives/external-link';
import { Copy } from '../directives/copy';
import { Unless } from '../directives/unless';
import { NearbyBreweries } from '../nearby-breweries/nearby-breweries';
import { BreweryTypePipe } from '../pipes/brewery-type';

@Component({
  // NearbyBreweries is only used inside the @defer block in the template,
  // so the compiler moves it into its own lazy chunk.
  imports: [
    RouterLink,
    ExternalLink,
    Copy,
    Unless,
    NearbyBreweries,
    BreweryTypePipe,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  selector: 'app-brewery-detail',
  styleUrl: './brewery-detail.scss',
  templateUrl: './brewery-detail.html',
})
export class BreweryDetail {
  private api = inject(BreweryApiService);
  protected store = inject(BreweryService);
  private snackBar = inject(MatSnackBar);

  // Filled from the :id route parameter by withComponentInputBinding().
  // The API uses string UUIDs, so the id is passed through as is.
  id = input.required<string>();

  brewery = this.api.byId(this.id);

  // value() throws while the resource is in an error state, so check hasValue() first.
  address = computed(() => {
    if (!this.brewery.hasValue()) {
      return '';
    }
    const b = this.brewery.value();
    return [b.street, b.city, b.state_province, b.postal_code, b.country].filter(Boolean).join(', ');
  });

  // Called from the appCopy directive's (copied) output. The snack bar closes itself after two seconds.
  protected onCopied(): void {
    this.snackBar.open('Address copied', 'OK', { duration: 2000 });
  }
}
