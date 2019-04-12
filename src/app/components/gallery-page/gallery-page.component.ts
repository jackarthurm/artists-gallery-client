import { Component, OnInit } from '@angular/core';
import { GalleryPage, ImageService, GalleryItem } from '@app/services/image/image.service';


@Component({
  selector: 'gal-gallery-page',
  styleUrls: ['./gallery-page.component.scss'],
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent implements OnInit {

  public page: GalleryPage;

  constructor(private _imagesService: ImageService) {}

  public ngOnInit(): void {

    this._imagesService.getGalleryPage(1, 100).subscribe(  // TODO: Pagination
      (page: GalleryPage) => {
        this.page = page;

        sessionStorage.setItem(
          'gallerystate',
          JSON.stringify(
            this.page.items.map(
              (item: GalleryItem) => item.id
            )
          )
        );
      }
    );
  }
}
