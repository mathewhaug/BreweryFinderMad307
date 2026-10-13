import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { BREWERY_CONFIG } from './shared/brewery-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withComponentInputBinding() lets a route parameter such as :id arrive
    // in the component as a signal input with the same name.
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: BREWERY_CONFIG,
      useValue: { apiBaseUrl: 'https://api.openbrewerydb.org', defaultCity: 'Windsor' }
    }
  ]
};
