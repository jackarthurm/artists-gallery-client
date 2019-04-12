import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import {
  GalleryItem,
  ImageService
} from '@app/services/image/image.service';
import { ImageDetailsDialogComponent } from '@components/image-details-dialog/image-details-dialog.component';
import { environment } from '@envs/environment';
import { url, uuid } from '@models/shared';
import * as HttpStatus from 'http-status-codes';


export interface ImageDialogData {
  galleryItem: GalleryItem;
  localImageURL: SafeResourceUrl;
}


@Component({
  selector: 'gal-image-details',
  template: '',
})
export class ImageDetailsComponent implements OnDestroy {

  public imageResourceURL: SafeResourceUrl;
  private createdObjectURL: url;
  private urlCreator: any = window.URL || (window as any).webkitURL;

  constructor(
    private dialog: MatDialog,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private router: Router,
    activatedRoute: ActivatedRoute
  ) {

    activatedRoute.params.pipe(
      map(
        (params: {[param: string]: string}) => params.id
      )
    ).subscribe(
      (imageID: uuid) => {

        this.imageService.getGalleryItem(imageID).subscribe(
          (galleryItem: GalleryItem) => {

          this.imageService.getImage(
            galleryItem.largeImage.url
          ).subscribe(
            (imageBlob: Blob) => {

              this.createdObjectURL = this.urlCreator.createObjectURL(imageBlob);

              const imageResourceURL: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                this.createdObjectURL
              );

              this.openDialog(galleryItem, imageResourceURL);
            },
            (err: HttpErrorResponse) => {

              switch (err.status) {
                case HttpStatus.NOT_FOUND:
                  this.router.navigate(
                    [`/${environment.routeURLs.notFoundPage}`]
                  );
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

  public openDialog(
    galleryItem: GalleryItem,
    imageResourceURL: SafeResourceUrl
  ): void {

    const dialogRef: MatDialogRef<ImageDetailsDialogComponent> = this.dialog.open(
      ImageDetailsDialogComponent,
      {
        data: {
          galleryItem,
          localImageURL: imageResourceURL,
        },
      }
    );

    dialogRef.afterClosed().subscribe((didNavigate: boolean) => {

      if (!didNavigate) {
        this.router.navigate([`/${environment.routeURLs.galleryPage}`]);
      }
    });
  }

  public ngOnDestroy(): void {

    if (this.createdObjectURL) {
      this.urlCreator.revokeObjectURL(this.createdObjectURL);
    }
  }
}
