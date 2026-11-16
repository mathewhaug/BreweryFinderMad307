import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';

// A structural directive. The * in *appUnless wraps the element in an <ng-template>,
// and the directive decides whether to stamp that template into the page.
@Directive({ selector: '[appUnless]' })
export class Unless {
  private template = inject(TemplateRef);
  private container = inject(ViewContainerRef);
  appUnless = input.required<boolean>();
  private shown = false;

  constructor() {
    effect(() => {
      const hide = this.appUnless();
      if (!hide && !this.shown) { this.container.createEmbeddedView(this.template); this.shown = true; }
      if (hide && this.shown)   { this.container.clear(); this.shown = false; }
    });
  }
}
