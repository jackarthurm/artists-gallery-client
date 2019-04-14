import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import * as HttpStatus from 'http-status-codes';
import { Key } from 'ts-key-enum';

import { url, uuid } from '@app/models/shared';
import { GalleryItem, ImageService } from '@app/services/image/image.service';
import { environment } from '@envs/environment';


function wrapIndexPeriodic(index: number, bound: number): number {

  // A modulo operation restricts the index to the range [-bound, bound]
  // We then add the index to get a positive value and apply another modulo
  // to ensure the index is within the range [0, bound]
  return (index % bound + bound) % bound;
}


@Component({
  selector: 'gal-image-details-dialog',
  styleUrls: ['./image-details-dialog.component.scss'],
  templateUrl: './image-details-dialog.component.html',
})
export class ImageDetailsDialogComponent implements OnDestroy {

  public galleryItem: GalleryItem;
  public imageResourceURL: SafeResourceUrl;

  private galleryState: Array<uuid>;
  private galleryItemIndex: number;

  private createdObjectURL: url;
  private urlCreator: any = window.URL || (window as any).webkitURL;

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private router: Router,
    _dialogRef: MatDialogRef<ImageDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public imageID: uuid
  ) {

    this.galleryState = JSON.parse(
      sessionStorage.getItem('gallerystate') as string
    ) || [];

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

  private setImage(imageID: uuid): void {

    this.imageService.getGalleryItem(imageID).subscribe(
      (galleryItem: GalleryItem) => {

        this.galleryItem = galleryItem;

        this.galleryItemIndex = this.galleryState.findIndex(
          (id: uuid) => id === galleryItem.id
        );  // TODO: Handle error if index is not found

        this.imageService.getImage(galleryItem.largeImage.url).subscribe(
          (imageBlob: Blob) => {

            this.releaseImageResource();

            this.createdObjectURL = this.urlCreator.createObjectURL(imageBlob);

            this.imageResourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.createdObjectURL
            );
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
      },
      (err: Error) => console.log(err)
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

  private releaseImageResource(): void {

    if (this.createdObjectURL) {
      this.urlCreator.revokeObjectURL(this.createdObjectURL);
    }
  }

  public ngOnDestroy(): void {

    this.releaseImageResource();
  }
}
