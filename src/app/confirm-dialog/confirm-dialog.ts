import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

// Opened by the appConfirm directive. Whatever goes in [mat-dialog-close]
// is the value afterClosed() delivers: true for Delete, false for Cancel.
// Closing with Escape or a backdrop click delivers undefined, which counts as no.
@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Please confirm</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button matButton [mat-dialog-close]="false">Cancel</button>
      <button matButton="filled" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>`,
})
export class ConfirmDialog {
  data = inject<{ message: string }>(MAT_DIALOG_DATA);
}
