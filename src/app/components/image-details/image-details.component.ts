import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

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
export class ImageDetailsComponent {

  constructor(
    dialog: MatDialog,
    router: Router,
    activatedRoute: ActivatedRoute
  ) {

    activatedRoute.params.pipe(
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
            maxWidth: '100%',
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
}
