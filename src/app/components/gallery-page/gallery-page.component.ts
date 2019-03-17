import { Component, OnInit } from '@angular/core';
import { ImageService, GalleryPage, ImageProperties } from '@app/services/image/image.service';

@Component({
  selector: 'gal-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {

  imageProperties: ImageProperties;

  constructor(private _imagesService: ImageService) {}

  ngOnInit() {

    this._imagesService.getGalleryPage(1).subscribe(
      (page: GalleryPage) => {
        this.imageProperties = page.images[0]
      }
    )
  }
}
