import { Component, computed, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreweryService } from '../services/brewery';
import { BreweryType } from '../shared/models/brewery';

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

  /**
   *
   * localhost:4200/add
   * localhost:4200/edit/:id
   */

  protected isEditMode = computed(() => this.id() !== undefined);

  // Same list as the browse by type page. large and bar are deprecated in the API.
  protected types: BreweryType[] = ['micro', 'nano', 'regional', 'brewpub', 'contract', 'proprietor'];

  // nonNullable means reset() goes back to these starting values instead of null,
  // and getRawValue() is typed without null.
  protected breweryForm =
    this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    brewery_type: ['micro' as BreweryType],
    city: ['', Validators.required],
    state_province: ['', Validators.required],
    country: ['Canada', Validators.required],
  });

  constructor() {
    // An effect reruns when id() changes, so going from one /edit/:id to another
    // refills the form even though Angular reuses the same component.
    effect(() => {
      const id = this.id();
      if (id === undefined) {
        return;
      }
      const brewery =
        this.breweryService.getBrewery(id);
      if (brewery) {
        // patchValue() fills only the fields the form has. The id is ignored here and added back on submit.
        this.breweryForm.patchValue(brewery);
      }
    });
  }

  protected onSubmit(): void {
    if (this.breweryForm.invalid) {
      return;
    }

    // getRawValue() includes disabled controls too. value would skip them.
    const formValue =
      this.breweryForm.getRawValue();
    const id = this.id();

    if (id !== undefined) {
      this.breweryService.updateBrewery({ id, ...formValue });
    } else {
      // The store creates the id with crypto.randomUUID().
      this.breweryService.addBrewery(formValue);
    }

    this.breweryForm.reset();
    this.router.navigate(['/my-breweries']);
  }
}
