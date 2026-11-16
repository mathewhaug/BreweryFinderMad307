import { Directive, input, signal } from '@angular/core';

// The host property replaces the older HostListener and HostBinding decorators.
// Keys in (round brackets) listen to events on the host element.
// Keys in [square brackets] bind to properties on the host element.
@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'active.set(true)',
    '(mouseleave)': 'active.set(false)',
    '[style.backgroundColor]': "active() ? (color() || '#F4F1EA') : ''",
  },
})
export class Highlight {
  // The alias lets the colour be passed through the selector itself: appHighlight="#FDE7C8".
  // A bare appHighlight attribute gives an empty string, so the default colour is used.
  color = input('', { alias: 'appHighlight' });
  protected active = signal(false);
}
