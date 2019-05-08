import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import * as HttpStatus from 'http-status-codes';
import { Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { Key } from 'ts-key-enum';

import { environment } from '@envs/environment';
import { GalleryItem, GalleryPage } from '@models/image';
import { url, uuid } from '@models/shared';
import { ImageService } from '@services/image/image.service';
import { getGalleryState, setGalleryState } from '@utils/gallery-state';


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
export class ImageDetailsDialogComponent implements OnInit, OnDestroy {

  public galleryItem: GalleryItem;
  public imageResourceURL: SafeResourceUrl | undefined;

  private galleryItemIndex: number;
  private galleryState: Array<uuid>;

  private createdObjectURL: url;
  private urlCreator: any = window.URL || (window as any).webkitURL;

  private imageSubscription: Subscription;

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private dialogRef: MatDialogRef<ImageDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imageID: uuid
  ) {}

  public ngOnInit(): void {

    const galleryState: Array<uuid> | undefined = getGalleryState();

    if (galleryState !== undefined) {

      this.galleryState = galleryState;
      this.setImage(this.imageID);
    }
    else {

      // If the gallery state isn't cached we retrieve the default one and cache it
      this.imageService.getInitialGalleryPage().subscribe(
        (page: GalleryPage) => {
          this.galleryState = setGalleryState(page.items);
          this.setImage(this.imageID);
        },
        (_err: Error) => console.log('Failed to retrieve initial gallery page')
      );
    }
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

    this.cancelRetrieveImageData();

    this.imageSubscription = this.imageService.getGalleryItem(imageID).pipe(
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

  private cancelRetrieveImageData(): void {

    if (this.imageSubscription && !this.imageSubscription.closed) {
      this.imageSubscription.unsubscribe();
    }
  }

  public ngOnDestroy(): void {

    this.releaseImageResource();
    this.cancelRetrieveImageData();
  }
}
