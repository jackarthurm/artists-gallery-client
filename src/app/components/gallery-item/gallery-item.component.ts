import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ImageProperties, ImageService } from '@app/services/image/image.service';
import { url } from '@app/types/shared';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'gal-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit, OnDestroy {

  imageResourceURL: SafeResourceUrl;

  private _createdObjectURLs: Array<url> = [];
  private _urlCreator: any = window.URL || window['webkitURL'];

  @Input()
  imageProperties: ImageProperties

  constructor(
    private _imageService: ImageService,
    private _sanitizer:DomSanitizer
  ) {}

  ngOnInit() {

    this._imageService.getImage(this.imageProperties).subscribe(
      (imageBlob: Blob) => {

        const createdObjectURL: url = this._urlCreator.createObjectURL(imageBlob);
        this._createdObjectURLs.push(createdObjectURL);

        this.imageResourceURL = this._sanitizer.bypassSecurityTrustResourceUrl(createdObjectURL);
      },
      (err) => {
        console.log(err)
      }
    )
  }

  ngOnDestroy() {

    console.log(this._createdObjectURLs);

    this._createdObjectURLs.forEach(
      (createdObjectURL: url) => this._urlCreator.revokeObjectURL(createdObjectURL)
    )
  }
}
