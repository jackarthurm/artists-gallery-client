import { Component } from '@angular/core';
import { SocialMediaLinks } from '@app/models/environment';
import { environment } from '@envs/environment.prod';


@Component({
  selector: 'gal-media-links-banner',
  styleUrls: ['./media-links-banner.component.scss'],
  templateUrl: './media-links-banner.component.html',
})
export class MediaLinksBannerComponent {

  public readonly socialMediaLinks: SocialMediaLinks = (
    environment.socialMediaLinks
  );
}
