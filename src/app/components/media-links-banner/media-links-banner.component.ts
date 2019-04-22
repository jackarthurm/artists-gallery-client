import { Component, OnInit } from '@angular/core';

import { ConfigService } from '@services/config/config.service';
import { SocialMediaLinks } from '@services/links/links.service';


@Component({
  selector: 'gal-media-links-banner',
  styleUrls: ['./media-links-banner.component.scss'],
  templateUrl: './media-links-banner.component.html',
})
export class MediaLinksBannerComponent implements OnInit {

  public socialMediaLinks: SocialMediaLinks;

  constructor(
    private configService: ConfigService
  ) {}

  public ngOnInit(): void {

    this.socialMediaLinks = this.configService.socialMediaLinks;
  }
}
