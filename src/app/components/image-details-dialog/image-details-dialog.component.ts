import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImageDialogData } from '@components/image-details/image-details.component';


@Component({
  selector: 'gal-image-details-dialog',
  styleUrls: ['./image-details-dialog.component.scss'],
  templateUrl: './image-details-dialog.component.html',
})
export class ImageDetailsDialogComponent {

  constructor(
    _dialogRef: MatDialogRef<ImageDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imageData: ImageDialogData
  ) {}
}
