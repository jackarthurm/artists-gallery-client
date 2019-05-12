import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ImageDetailsDialogComponent,
} from '@components/image-details-dialog/image-details-dialog.component';
import { environment } from '@envs/environment';
import { uuid } from '@models/shared';


@Component({
  selector: 'gal-image-details',
  template: '',
})
export class ImageDetailsComponent implements OnDestroy {

  private imageSubscription: Subscription;

  constructor(
    dialog: MatDialog,
    router: Router,
    activatedRoute: ActivatedRoute
  ) {

    this.cancelRetrieveImageData();

    this.imageSubscription = activatedRoute.params.pipe(
      map(
        (params: {[param: string]: string}) => params.id
      )
    ).subscribe(
      (imageID: uuid) => {

        const dialogRef: MatDialogRef<ImageDetailsDialogComponent> = dialog.open(
          ImageDetailsDialogComponent,
          {
            backdropClass: 'darker-backdrop',
            data: imageID,
            panelClass: 'image-detail-dialog-panel',
            maxWidth: '85vw',
            maxHeight: '85vh',
          }
        );

        dialogRef.afterClosed().subscribe(
          () => router.navigate(
            [`/${environment.routeURLs.galleryPage}`]
          )
        );
      }
    );
  }

  private cancelRetrieveImageData(): void {

    if (this.imageSubscription && !this.imageSubscription.closed) {
      this.imageSubscription.unsubscribe();
    }
  }

  public ngOnDestroy(): void {

    this.cancelRetrieveImageData();
  }
}
