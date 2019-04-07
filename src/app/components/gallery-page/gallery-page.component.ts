import { Component, OnInit } from '@angular/core';
import { GalleryPage, ImageService } from '@app/services/image/image.service';


@Component({
  selector: 'gal-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
})
export class GalleryPageComponent implements OnInit {

  public page: GalleryPage;

  constructor(private _imagesService: ImageService) {}

  public ngOnInit() {

    this._imagesService.getGalleryPage(1, 100).subscribe(  // TODO: Pagination
      (page: GalleryPage) => this.page = page
    );
  }
}
