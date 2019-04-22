import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  InfoDialogComponent,
  InfoType,
 } from '@components/info-dialog/info-dialog.component';


const DIALOG_WIDTH_PX: number = 300;


@Injectable({
  providedIn: 'root',
})
export class InfoDialogService {

  private readonly dialogWidth: string = `${DIALOG_WIDTH_PX}px`;

  constructor(private infoDialog: MatDialog) {}

  public openSuccessDialog(message: string): void {

    this.infoDialog.open(
      InfoDialogComponent,
      {
        data: {
          infoType: InfoType.success,
          message,
        },
        width: this.dialogWidth,
      }
    );
  }

  public openErrorDialog(message: string): void {

    this.infoDialog.open(
      InfoDialogComponent,
      {
        data: {
          infoType: InfoType.error,
          message,
        },
        width: this.dialogWidth,
      }
    );
  }
}
