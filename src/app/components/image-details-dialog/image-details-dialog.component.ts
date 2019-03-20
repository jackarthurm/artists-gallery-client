import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { url } from '@app/models/shared';


@Component({
  selector: 'gal-image-details-dialog',
  templateUrl: './image-details-dialog.component.html',
  styleUrls: ['./image-details-dialog.component.scss']
})
export class ImageDetailsDialogComponent {

  public imageURL: url;

  constructor(
    public dialogRef: MatDialogRef<ImageDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {imageURL: url}
  ) {

    this.imageURL = data.imageURL;
  }
}
