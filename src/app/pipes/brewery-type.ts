import { Pipe, PipeTransform } from '@angular/core';

// Turns an API brewery_type value into a readable label: 'brewpub' becomes 'Brewpub',
// 'micro' becomes 'Micro brewery'. Unknown values are passed through with a capital letter.
@Pipe({ name: 'breweryType' })
export class BreweryTypePipe implements PipeTransform {
  private labels: Record<string, string> = {
    micro: 'Micro brewery',
    nano: 'Nano brewery',
    regional: 'Regional brewery',
    brewpub: 'Brewpub',
    large: 'Large brewery',
    planning: 'In planning',
    bar: 'Bar',
    contract: 'Contract brewery',
    proprietor: 'Proprietor',
    closed: 'Closed',
  };

  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    return this.labels[value] ?? value.charAt(0).toUpperCase() + value.slice(1);
  }
}
