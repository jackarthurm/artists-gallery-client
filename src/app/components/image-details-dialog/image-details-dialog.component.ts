import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import * as HttpStatus from 'http-status-codes';
import { concatMap, tap } from 'rxjs/operators';
import { Key } from 'ts-key-enum';

import { environment } from '@envs/environment';
import { url, uuid } from '@models/shared';
import { GalleryItem, ImageService } from '@services/image/image.service';


function wrapIndexPeriodic(index: number, bound: number): number {

  // A modulo operation restricts the index to the range [-bound, bound].
  // We then add the index to get a positive value in the region
  // [0, 2 * bound] and finally apply another modulo operation
  // to bring the index within the range [0, bound]
  return (index % bound + bound) % bound;
}


@Component({
  selector: 'gal-image-details-dialog',
  styleUrls: ['./image-details-dialog.component.scss'],
  templateUrl: './image-details-dialog.component.html',
})
export class ImageDetailsDialogComponent implements OnDestroy {

  public galleryItem: GalleryItem;
  public imageResourceURL: SafeResourceUrl | undefined;

  private galleryItemIndex: number;
  private galleryState: Array<uuid>;

  private createdObjectURL: url;
  private urlCreator: any = window.URL || (window as any).webkitURL;

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private dialogRef: MatDialogRef<ImageDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imageID: uuid
  ) {

    this.galleryState = JSON.parse(
      sessionStorage.getItem(
        environment.galleryStateSessionStorageKey
      ) as string
    ) || [];

    // TODO: If gallery state not cached, retrieve a new one

    this.setImage(imageID);
  }

  @HostListener('document:keyup', ['$event'])
  public handleKeyupEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case Key.ArrowLeft:
        this.previous();
        break;
      case Key.ArrowRight:
        this.next();
        break;
    }
  }

  @HostListener('document:keypress', ['$event'])
  public handleKeypressEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case Key.Enter:
        this.next();
    }
  }

  private notFound(): void {

    this.router.navigate(
      [`/${environment.routeURLs.notFoundPage}`]
    );
  }

  private setImage(imageID: uuid): void {

    this.imageService.getGalleryItem(imageID).pipe(
      tap(
        (galleryItem: GalleryItem) => {

          this.galleryItem = galleryItem;

          this.galleryItemIndex = this.galleryState.findIndex(
            (id: uuid) => id === galleryItem.id
          );  // TODO: Handle error if index is not found
        }
      ),
      concatMap(
        (galleryItem: GalleryItem) => this.imageService.getImage(
          galleryItem.largeImage.url
        )
      )
    ).subscribe(
      (imageBlob: Blob) => {

        this.releaseImageResource();
        this.createImageResource(imageBlob);
      },
      (err: HttpErrorResponse) => {

        switch (err.status) {
          case HttpStatus.NOT_FOUND:
            this.notFound();
            break;
          default:
            throw err;
        }
      }
    );
  }

  private navigate(offset: number): void {

    const newIndex: number = wrapIndexPeriodic(
      this.galleryItemIndex + offset,
      this.galleryState.length
    );

    const newID: uuid = this.galleryState[newIndex];

    this.setImage(newID);
  }

  public next(): void {
    this.navigate(1);
  }

  public previous(): void {
    this.navigate(-1);
  }

  public close(): void {
    this.dialogRef.close();
  }

  public openImage(): void {

    if (this.createdObjectURL) {
      window.location.href = this.createdObjectURL;
    }
  }

  public get imageAspectRatio(): number | undefined {

    if (this.galleryItem) {
      return (
        this.galleryItem.largeImage.height / this.galleryItem.largeImage.width
      );
    }

    return undefined;
  }

  private createImageResource(imageBlob: Blob): void {

    this.createdObjectURL = this.urlCreator.createObjectURL(imageBlob);

    this.imageResourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.createdObjectURL
    );
  }

  private releaseImageResource(): void {

    if (this.createdObjectURL) {
      this.urlCreator.revokeObjectURL(this.createdObjectURL);

      this.imageResourceURL = undefined;
    }
  }

  public ngOnDestroy(): void {

    this.releaseImageResource();
  }
}
