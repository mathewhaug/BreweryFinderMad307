import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { BREWERY_CONFIG } from './shared/brewery-config';
import { loggingInterceptor } from './interceptors/logging-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withComponentInputBinding() lets a route parameter such as :id arrive
    // in the component as a signal input with the same name.
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: BREWERY_CONFIG,
      useValue: { apiBaseUrl: 'https://api.openbrewerydb.org/v1', defaultCity: 'Windsor' }
    },
    // HttpClient is already provided by default. This call is only here to add the interceptor.
    provideHttpClient(withInterceptors([loggingInterceptor])),
  ]
};
