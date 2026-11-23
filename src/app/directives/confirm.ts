import { Directive, inject, input, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

// <button appConfirm="Delete this brewery?" (confirmed)="remove(b.id)">
// The click opens a Material dialog. (confirmed) only fires if the user picks Delete.
@Directive({
  selector: '[appConfirm]',
  host: { '(click)': 'ask()' },
})
export class Confirm {
  message = input.required<string>({ alias: 'appConfirm' });
  confirmed = output<void>();

  private dialog = inject(MatDialog);

  ask(): void {
    this.dialog
      .open(ConfirmDialog, { data: { message: this.message() } })
      .afterClosed()
      .subscribe((ok) => {
        if (ok) this.confirmed.emit();
      });
  }
}
