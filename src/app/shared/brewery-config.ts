import { InjectionToken } from '@angular/core';

export interface BreweryConfig {
  apiBaseUrl: string;
  defaultCity: string;
}

export const BREWERY_CONFIG = new InjectionToken<BreweryConfig>('brewery.config');
