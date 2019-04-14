import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  LinksService,
  SocialMediaLinks
} from '@app/services/links/links.service';
import {
  InfoDialogComponent,
  InfoType,
} from '@components/info-dialog/info-dialog.component';


@Component({
  selector: 'gal-media-links-banner',
  styleUrls: ['./media-links-banner.component.scss'],
  templateUrl: './media-links-banner.component.html',
})
export class MediaLinksBannerComponent implements OnInit {

  public socialMediaLinks: SocialMediaLinks;

  constructor(
    private linksService: LinksService,
    private infoDialog: MatDialog
  ) {}

  public ngOnInit(): void {

    this.linksService.getSocialMediaLinks().subscribe(
      (links: SocialMediaLinks) => this.socialMediaLinks = links,
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
