import { Component, OnInit } from '@angular/core';

import {
  GalleryItem,
  GalleryPage,
  ImageService,
} from '@services/image/image.service';
import {
  InfoDialogService,
} from '@services/info-dialog/info-dialog.service';
import { environment } from '@envs/environment';


@Component({
  selector: 'gal-gallery-page',
  styleUrls: ['./gallery-page.component.scss'],
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent implements OnInit {

  public galleryItems: Array<GalleryItem>;

  constructor(
    private imagesService: ImageService,
    private infoDialogService: InfoDialogService
  ) {}

  public ngOnInit(): void {

    this.imagesService.getInitialGalleryPage().subscribe(  // TODO: Pagination
      (page: GalleryPage) => {
        this.galleryItems = page.items;

        sessionStorage.setItem(
          environment.galleryStateSessionStorageKey,
          JSON.stringify(
            this.galleryItems.map(
              (item: GalleryItem) => item.id
            )
          )
        );
      },
      (_err: Error) => this.infoDialogService.openErrorDialog(
        `Failed to contact server. Please check your
        internet connection or try again later.`
      )
    );
  }
}
