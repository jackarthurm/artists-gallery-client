import { Component } from '@angular/core';
import { environment } from '@envs/environment';


@Component({
  selector: 'gal-fb-share-link',
  templateUrl: './fb-share-link.component.html',
  styleUrls: ['./fb-share-link.component.scss'],
})
export class FbShareLinkComponent {

  public fbShareLink: string = `https://www.facebook.com/sharer/sharer.php
  ?u=${environment.siteURL.schema}%3A%2F%2F${environment.siteURL.domain}%2F&amp;
  src=sdkpreparse`;
  public fbDataHref: string = `${environment.siteURL.schema}://${environment.siteURL.domain}`;
}
