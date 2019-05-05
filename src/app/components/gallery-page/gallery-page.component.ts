import { Component, OnInit } from '@angular/core';

import { GalleryItem, GalleryPage } from '@app/models/image';
import { ImageService } from '@services/image/image.service';
import {
  InfoDialogService,
} from '@services/info-dialog/info-dialog.service';
import { setGalleryState } from '@utils/gallery-state';


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

        setGalleryState(this.galleryItems);
      },
      (_err: Error) => this.infoDialogService.openErrorDialog(
        `Failed to contact server. Please check your
        internet connection or try again later.`
      )
    );
  }
}
