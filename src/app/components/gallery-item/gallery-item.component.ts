import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GalleryItem, ImageService } from '@app/services/image/image.service';
import { url } from '@models/shared';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'gal-gallery-item',
  styleUrls: ['./gallery-item.component.scss'],
  templateUrl: './gallery-item.component.html',
})
export class GalleryItemComponent implements OnInit, OnDestroy {

  public imageResourceURL: SafeResourceUrl;

  private createdObjectURL: url;
  private urlCreator: any = window.URL || (window as any).webkitURL;

  @Input()
  public galleryItem: GalleryItem;

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {

    this.imageService.getImage(
      this.galleryItem.thumbnailImage.url
    ).subscribe(
      (imageBlob: Blob) => {

        this.createdObjectURL = this.urlCreator.createObjectURL(imageBlob);

        this.imageResourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.createdObjectURL
        );
      },
      (_err: Error) => {
        // We ignore the error, this means the image
        // will appear to be stuck loading
      }
    );
  }

  public ngOnDestroy(): void {

    if (this.createdObjectURL) {
      this.urlCreator.revokeObjectURL(this.createdObjectURL);
    }
  }
}
