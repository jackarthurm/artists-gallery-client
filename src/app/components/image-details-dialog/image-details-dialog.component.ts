import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageDialogData } from '@components/image-details/image-details.component';


@Component({
  selector: 'gal-image-details-dialog',
  templateUrl: './image-details-dialog.component.html',
  styleUrls: ['./image-details-dialog.component.scss'],
})
export class ImageDetailsDialogComponent {

  constructor(
    _dialogRef: MatDialogRef<ImageDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imageData: ImageDialogData
  ) {}
}
