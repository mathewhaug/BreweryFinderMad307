import { InjectionToken } from '@angular/core';
import { BreweryConfig } from './models/brewery-config';

export const BREWERY_CONFIG = new InjectionToken<BreweryConfig>('brewery.config');
