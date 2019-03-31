import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GalleryItem, ImageService } from '@app/services/image/image.service';
import { url } from '@models/shared';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'gal-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent implements OnInit, OnDestroy {

  imageResourceURL: SafeResourceUrl;

  private _createdObjectURL: url;
  private _urlCreator: any = window.URL || window['webkitURL'];

  @Input()
  galleryItem: GalleryItem

  constructor(
    private _imageService: ImageService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {

    this._imageService.getImage(
      this.galleryItem.thumbnailImage.url
    ).subscribe(
      (imageBlob: Blob) => {

        this._createdObjectURL = this._urlCreator.createObjectURL(imageBlob);

        this.imageResourceURL = this._sanitizer.bypassSecurityTrustResourceUrl(
          this._createdObjectURL
        );
      },
      (err) => {
        console.log(err);
      }
    )
  }

  ngOnDestroy() {

    if (this._createdObjectURL) {
      this._urlCreator.revokeObjectURL(this._createdObjectURL)
    }
  }
}
