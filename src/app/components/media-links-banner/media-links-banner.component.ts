import { Component, OnInit } from '@angular/core';
import {
  LinksService,
  SocialMediaLinks
} from '@app/services/links/links.service';


@Component({
  selector: 'gal-media-links-banner',
  styleUrls: ['./media-links-banner.component.scss'],
  templateUrl: './media-links-banner.component.html',
})
export class MediaLinksBannerComponent implements OnInit {

  public socialMediaLinks: SocialMediaLinks;

  constructor(private linksService: LinksService) {}

  public ngOnInit(): void {

    this.linksService.getSocialMediaLinks().subscribe(
      (links: SocialMediaLinks) => this.socialMediaLinks = links,
      (err: Error) => console.log(err)
    );
  }
}
