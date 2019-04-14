import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


export enum InfoType {
  success,
  warning,
  error,
}

export interface InfoDialogData {
  infoType: InfoType;
  message: string;
}

interface InfoTypeConfig {
  iconName: string;
  colorName: string;
}

const infoTypeMapping: Map<InfoType, InfoTypeConfig> = new Map(
  [
    [
      InfoType.success,
      {
        iconName: 'checked',
        colorName: 'accent',
      },
    ],
    [
      InfoType.warning,
      {
        iconName: 'warning',
        colorName: 'warn',
      },
    ],
    [
      InfoType.error,
      {
        iconName: 'error',
        colorName: 'warn',
      },
    ],
  ]
);


@Component({
  selector: 'gal-info-dialog',
  styleUrls: ['./info-dialog.component.scss'],
  templateUrl: './info-dialog.component.html',
})
export class InfoDialogComponent {


  public infoTypeConfig: InfoTypeConfig | undefined;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: InfoDialogData
  ) {

    this.infoTypeConfig = infoTypeMapping.get(data.infoType);
    this.message = data.message;
  }
}
