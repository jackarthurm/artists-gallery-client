import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';

import { uuid, url } from '@models/shared'
import { ImageService } from '@app/services/image/image.service';
import { ImageDetailsDialogComponent } from '@components/image-details-dialog/image-details-dialog.component';


@Component({
  selector: 'gal-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent {

  private _imageResourceURL: SafeResourceUrl;
  private _createdObjectURL: url;
  private _urlCreator: any = window.URL || window['webkitURL'];

  constructor(
    private _dialog: MatDialog,
    private _imageService: ImageService,
    private _sanitizer: DomSanitizer,
    activatedRoute: ActivatedRoute,
  ) {

    activatedRoute.params.pipe(
      map(params => params['id'])
    ).subscribe(
      (imageID: uuid) => {

        this._imageService.getImage(imageID).subscribe(
          (imageBlob: Blob) => {

            this._createdObjectURL = this._urlCreator.createObjectURL(imageBlob);
    
            const imageResourceURL: SafeResourceUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
              this._createdObjectURL
            );

            this.openDialog(imageResourceURL);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    );
  }

  openDialog(imageResourceURL: SafeResourceUrl): void {
    const dialogRef = this._dialog.open(ImageDetailsDialogComponent, {
      width: '50%',
      data: {imageURL: imageResourceURL}
    });
  }

  ngOnDestroy() {

    if (this._createdObjectURL) {
      this._urlCreator.revokeObjectURL(this._createdObjectURL)
    }
  }
}
