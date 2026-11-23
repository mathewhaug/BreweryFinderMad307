import { Component, computed, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { BreweryService } from './services/brewery';

@Component({
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected title = 'Brewery Explorer';
  protected favouriteCount = inject(BreweryService).favouriteCount;

  private breakpoints = inject(BreakpointObserver);

  // true on phone sized screens. toSignal turns the Observable into a signal the template can read.
  protected isHandset = toSignal(
    this.breakpoints.observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
    { initialValue: false },
  );

  // One list of links for both the toolbar and the sidenav.
  // It is computed so the Favourites label updates when the count changes.
  // exact: true stops "All breweries" from also being highlighted on /breweries/type/micro.
  // By default, routerLinkActive matches by prefix.
  protected links = computed(() => [
    { path: '/breweries', label: 'All breweries', exact: true },
    { path: '/breweries/type/micro', label: 'Micro', exact: false },
    { path: '/breweries/type/brewpub', label: 'Brewpub', exact: false },
    { path: '/search', label: 'Search', exact: false },
    { path: '/favourites', label: `Favourites (${this.favouriteCount()})`, exact: false },
    { path: '/my-breweries', label: 'My Breweries', exact: false },
    { path: '/add', label: 'Add brewery', exact: false },
  ]);

  constructor() {
    // ng add linked the Material Symbols font in index.html. mat-icon defaults to the older
    // Material Icons font, so tell it to use the Material Symbols class instead.
    inject(MatIconRegistry).setDefaultFontSetClass('material-symbols-outlined');
  }
}
