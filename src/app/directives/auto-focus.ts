import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

@Directive({ selector: '[appAutoFocus]' })
export class AutoFocus {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // The element exists in the constructor but is not on screen yet.
    // afterNextRender waits until the browser has drawn it, then focuses it once.
    afterNextRender(() => this.el.nativeElement.focus());
  }
}
