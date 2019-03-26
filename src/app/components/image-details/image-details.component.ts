import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';

import { uuid, url } from '@models/shared'
import {
  ImageService, 
  ImageProperties
} from '@app/services/image/image.service';
import { ImageDetailsDialogComponent } from '@components/image-details-dialog/image-details-dialog.component';
import { environment } from '@envs/environment';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';


export interface ImageDialogData {
  imageProperties: ImageProperties,
  localImageURL: SafeResourceUrl
}


@Component({
  selector: 'gal-image-details',
  template: ''
})
export class ImageDetailsComponent {

  imageResourceURL: SafeResourceUrl;
  private _createdObjectURL: url;
  private _urlCreator: any = window.URL || window['webkitURL'];

  constructor(
    private _dialog: MatDialog,
    private _imageService: ImageService,
    private _sanitizer: DomSanitizer,
    private _router: Router,
    activatedRoute: ActivatedRoute
  ) {

    activatedRoute.params.pipe(
      map(params => params['id'])
    ).subscribe(
      (imageID: uuid) => {

        this._imageService.getGalleryItem(imageID).subscribe(
          (imageProperties: ImageProperties) => {

          this._imageService.getImage(
            imageProperties.originalImage.location
          ).subscribe(
            (imageBlob: Blob) => {

              this._createdObjectURL = this._urlCreator.createObjectURL(imageBlob);
      
              const imageResourceURL: SafeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
                this._createdObjectURL
              );

              this.openDialog(imageProperties, imageResourceURL);
            },
            (err: HttpErrorResponse) => {

              switch (err.status) {
                case HttpStatus.NOT_FOUND:
                  this._router.navigate(
                    [`/${environment.routeFragments.notFoundPage}`]
                  )
                  break;
                default:
                  console.log(err);
              }
            }
          );
        });
      }
    );
  }

  openDialog(
    imageProperties: ImageProperties, 
    imageResourceURL: SafeResourceUrl
  ): void {
    const dialogRef = this._dialog.open(
      ImageDetailsDialogComponent, 
      {
        data: {
          imageProperties: imageProperties,
          localImageURL: imageResourceURL
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate([`/${environment.routeFragments.galleryPage}`]);
    });
  }

  ngOnDestroy() {

    if (this._createdObjectURL) {
      this._urlCreator.revokeObjectURL(this._createdObjectURL)
    }
  }
}
