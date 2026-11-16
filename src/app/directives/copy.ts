import { Directive, input, output } from '@angular/core';

// A directive can have outputs as well as inputs.
// The parent listens with (copied)="..." on the same element.
@Directive({
  selector: '[appCopy]',
  host: { '(click)': 'copy()', 'title': 'Click to copy' },
})
export class Copy {
  text = input.required<string>({ alias: 'appCopy' });
  copied = output<string>();

  async copy() {
    try {
      await navigator.clipboard.writeText(this.text());
      this.copied.emit(this.text());
    } catch { /* clipboard blocked: emit nothing */ }
  }
}
