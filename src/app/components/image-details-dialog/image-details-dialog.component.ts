import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import * as HttpStatus from 'http-status-codes';
import { Subscription } from 'rxjs';
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


interface SocialMediaShareURLs {
  facebook: url;
  twitter: url;
}


@Component({
  selector: 'gal-image-details-dialog',
  styleUrls: ['./image-details-dialog.component.scss'],
  templateUrl: './image-details-dialog.component.html',
})
export class ImageDetailsDialogComponent implements OnInit, OnDestroy {

  public galleryItem: GalleryItem;
  public shareURLs: SocialMediaShareURLs;

  private galleryItemIndex: number;
  private galleryState: Array<uuid>;

  private imageSubscription: Subscription;

  constructor(
    activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    private router: Router,
    private dialogRef: MatDialogRef<ImageDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imageID: uuid
  ) {

    // TODO: This needs refactoring using ActivatedRoute to make it less fragile
    const shareURL: string = `${environment.siteURL.schema}%3A%2F%2F${environment.siteURL.domain}%2Fgallery%2F(image:${imageID})`;

    this.shareURLs = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareURL}`,
      twitter: `https://twitter.com/intent/tweet?url=${shareURL}&amp;hashtags=katealicemann`,
    };
  }

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

    this.imageSubscription = this.imageService.getGalleryItem(imageID).subscribe(
      (galleryItem: GalleryItem) => {

        this.galleryItem = galleryItem;

        this.galleryItemIndex = this.galleryState.findIndex(
          (id: uuid) => id === galleryItem.id
        );  // TODO: Handle error if index is not found
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

  private cancelRetrieveImageData(): void {

    if (this.imageSubscription && !this.imageSubscription.closed) {
      this.imageSubscription.unsubscribe();
    }
  }

  public ngOnDestroy(): void {

    this.cancelRetrieveImageData();
  }
}
