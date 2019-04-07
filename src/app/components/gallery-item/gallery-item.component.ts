import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GalleryItem, ImageService } from '@app/services/image/image.service';
import { url } from '@models/shared';


@Component({
  selector: 'gal-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss'],
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

  public ngOnInit() {

    this.imageService.getImage(
      this.galleryItem.thumbnailImage.url
    ).subscribe(
      (imageBlob: Blob) => {

        this.createdObjectURL = this.urlCreator.createObjectURL(imageBlob);

        this.imageResourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.createdObjectURL
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public ngOnDestroy() {

    if (this.createdObjectURL) {
      this.urlCreator.revokeObjectURL(this.createdObjectURL);
    }
  }
}
