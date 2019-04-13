import { Component, OnInit } from '@angular/core';
import { GalleryItem, GalleryPage, ImageService } from '@app/services/image/image.service';


@Component({
  selector: 'gal-gallery-page',
  styleUrls: ['./gallery-page.component.scss'],
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent implements OnInit {

  public galleryItems: Array<GalleryItem>;

  constructor(private imagesService: ImageService) {}

  public ngOnInit(): void {

    this.imagesService.getGalleryPage(1, 100).subscribe(  // TODO: Pagination
      (page: GalleryPage) => {
        this.galleryItems = page.items;

        sessionStorage.setItem(
          'gallerystate',
          JSON.stringify(
            this.galleryItems.map(
              (item: GalleryItem) => item.id
            )
          )
        );
      }
    );
  }
}
