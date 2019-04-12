import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { uuid } from '@app/models/shared';
import { ImageDialogData } from '@components/image-details/image-details.component';
import { environment } from '@envs/environment';


// enum ImageOrientation {
//   PORTRAIT = 'portrait',
//   LANDSCAPE = 'landscape',
// }


@Component({
  selector: 'gal-image-details-dialog',
  styleUrls: ['./image-details-dialog.component.scss'],
  templateUrl: './image-details-dialog.component.html',
})
export class ImageDetailsDialogComponent {

  // public imageOrientation: ImageOrientation;

  private galleryState: Array<uuid>;
  private galleryItemIndex: number;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<ImageDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imageData: ImageDialogData
  ) {

    this.galleryState = JSON.parse(
      sessionStorage.getItem('gallerystate')
    );

    this.galleryItemIndex = this.galleryState.findIndex(
      (id: uuid) => id === imageData.galleryItem.id
    );

    // this.imageOrientation = (
    //   imageData.galleryItem.largeImage.height >= imageData.galleryItem.largeImage.width ?
    //   ImageOrientation.PORTRAIT : ImageOrientation.LANDSCAPE
    // );
  }

  public next(): void {

    let newIndex: number = this.galleryItemIndex + 1;

    if (newIndex === this.galleryState.length) {
      newIndex = 0;  // Wrap the index around
    }

    const nextID: uuid = this.galleryState[newIndex];

    this.router.navigate(
      [
        `/${environment.routeURLs.galleryPage}`,
        {
          outlets: {modal: nextID}},
      ]
    );

    this.dialogRef.close(true);
  }

  public previous(): void {

    let newIndex: number = this.galleryItemIndex - 1;

    if (newIndex === 0) {
      newIndex = this.galleryState.length - 1;  // Wrap the index around
    }

    const previousID: uuid =  this.galleryState[newIndex];

    this.router.navigate(
      [
        `/${environment.routeURLs.galleryPage}`,
        {outlets: {modal: previousID}},
      ]
    );

    this.dialogRef.close(true);
  }
}
