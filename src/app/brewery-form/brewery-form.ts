import { Component, computed, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreweryService } from '../services/brewery';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-brewery-form',
  styleUrl: './brewery-form.scss',
  templateUrl: './brewery-form.html',
})
export class BreweryForm {
  private fb = inject(FormBuilder);
  private breweryService = inject(BreweryService);
  private router = inject(Router);

  // Filled from the :id route parameter on /edit/:id by withComponentInputBinding().
  // On /add there is no :id, so the input stays undefined and the form is in add mode.
  id = input<string>();

  protected isEditMode = computed(() => this.id() !== undefined);

  // nonNullable means reset() goes back to these starting values instead of null,
  // and getRawValue() is typed without null.
  protected breweryForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    city: ['', Validators.required],
    breweryType: ['micro'],
    hasFoodMenu: [false],
  });

  constructor() {
    // An effect reruns when id() changes, so going from /edit/1 to /edit/2
    // refills the form even though Angular reuses the same component.
    effect(() => {
      const id = this.id();
      if (id === undefined) {
        return;
      }
      const brewery = this.breweryService.getBrewery(Number(id));
      if (brewery) {
        // patchValue() fills only the fields it is given. The form has no id field,
        // so the id is ignored here and added back on submit.
        this.breweryForm.patchValue({ ...brewery, hasFoodMenu: brewery.hasFoodMenu ?? false });
      }
    });
  }

  protected onSubmit(): void {
    if (this.breweryForm.invalid) {
      return;
    }

    // getRawValue() includes disabled controls too. value would skip them.
    const formValue = this.breweryForm.getRawValue();
    const id = this.isEditMode() ? Number(this.id()) : this.breweryService.nextId();

    if (this.isEditMode()) {
      this.breweryService.updateBrewery({ id, ...formValue });
    } else {
      this.breweryService.addBrewery({ id, ...formValue });
    }

    this.breweryForm.reset();
    this.router.navigate(['/breweries', id]);
  }
}
