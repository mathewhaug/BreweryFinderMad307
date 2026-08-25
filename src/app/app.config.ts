import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BREWERY_CONFIG } from './shared/brewery-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: BREWERY_CONFIG,
      useValue: { apiBaseUrl: 'https://api.openbrewerydb.org', defaultCity: 'Windsor' }
    }
  ]
};
