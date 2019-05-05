import { Component, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { url } from '@models/shared';
import { GalleryItem, ImageService } from '@services/image/image.service';


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
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
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

        this.cdRef.detectChanges();
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
