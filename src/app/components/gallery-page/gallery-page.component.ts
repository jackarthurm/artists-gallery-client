import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GalleryItem, GalleryPage, ImageService } from '@app/services/image/image.service';
import { InfoDialogComponent, InfoType } from '../info-dialog/info-dialog.component';


@Component({
  selector: 'gal-gallery-page',
  styleUrls: ['./gallery-page.component.scss'],
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent implements OnInit {

  public galleryItems: Array<GalleryItem>;

  constructor(
    private imagesService: ImageService,
    private infoDialog: MatDialog) {}

  public ngOnInit(): void {

    this.imagesService.getInitialGalleryPage().subscribe(  // TODO: Pagination
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
      },
      (_err: Error) => this.openErrorDialog()
    );
  }

  private openErrorDialog(): void {

    this.infoDialog.open(
      InfoDialogComponent,
      {
        data: {
          infoType: InfoType.error,
          message: `Failed to contact server.
                    Please check your internet connection or try again later.`,
        },
        width: '300px',
      }
    );
  }
}
