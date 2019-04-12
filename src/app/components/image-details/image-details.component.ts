import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { uuid } from '@app/models/shared';
import { ImageDetailsDialogComponent } from '@components/image-details-dialog/image-details-dialog.component';
import { environment } from '@envs/environment';


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
            data: imageID,
          }
        );

        dialogRef.afterClosed().subscribe(
          () => router.navigate(
            [`/${environment.routeURLs.galleryPage}`]
          )
        );
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }
}
