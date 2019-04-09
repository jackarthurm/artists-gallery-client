import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'gal-success-dialog',
  styleUrls: ['./success-dialog.component.scss'],
  templateUrl: './success-dialog.component.html',
})
export class SuccessDialogComponent {

  public message: string;

  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {[message: string]: string}
  ) {
    this.message = data.message;
  }
}
