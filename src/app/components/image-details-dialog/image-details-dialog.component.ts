import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import * as HttpStatus from 'http-status-codes';
import { Subscription } from 'rxjs';
import { Key } from 'ts-key-enum';

import { environment } from '@envs/environment';
import { GalleryItem, GalleryPage } from '@models/image';
import { url, uuid } from '@models/shared';
import { ImageService } from '@services/image/image.service';
import { getGalleryState, setGalleryState } from '@utils/gallery-state';
import { MetaService } from 'ng2-meta';


function wrapIndexPeriodic(index: number, bound: number): number {

  // A modulo operation restricts the index to the range [-bound, bound].
  // We then add the index to get a positive value in the region
  // [0, 2 * bound] and finally apply another modulo operation
  // to bring the index within the range [0, bound]
  return (index % bound + bound) % bound;
}


function createImageShareURLs(imageID: uuid): SocialMediaShareURLs {

  // TODO: This needs refactoring using ActivatedRoute to make it less fragile
  const urlToShare: url = `${environment.siteURL.schema}%3A%2F%2F${environment.siteURL.domain}%2Fgallery%2F(image:${imageID})`;

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`,
    twitter: `https://twitter.com/intent/tweet?url=${urlToShare}&amp;hashtags=katealicemann`,
  };
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
    private location: Location,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<ImageDetailsDialogComponent>,
    private metaService: MetaService,
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

  private notFound(): void {

    this.dialogRef.close({
      notFound: true,
    });
  }

  private setImage(imageID: uuid): void {

    this.cancelRetrieveImageData();

    this.imageSubscription = this.imageService.getGalleryItem(imageID).subscribe(
      (galleryItem: GalleryItem) => {

        this.galleryItem = galleryItem;

        this.galleryItemIndex = this.galleryState.findIndex(
          (id: uuid) => id === galleryItem.id
        );  // TODO: Handle error if index is not found


        this.updateMetaTagsForItem(galleryItem);
        this.shareURLs = createImageShareURLs(galleryItem.id);
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

  private updateMetaTagsForItem(galleryItem: GalleryItem): void {

    this.metaService.setTitle('Detail page for ' + galleryItem.title);
    this.metaService.setTag('og:image', galleryItem.largeImage.url);
  }

  private navigate(offset: number): void {

    const newIndex: number = wrapIndexPeriodic(
      this.galleryItemIndex + offset,
      this.galleryState.length
    );

    const newID: uuid = this.galleryState[newIndex];

    // TODO: This needs refactoring using ActivatedRoute to make it less fragile
    this.location.go(`/gallery/(image:${newID})`);

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
