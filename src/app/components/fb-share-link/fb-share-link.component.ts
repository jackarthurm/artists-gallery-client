import { Component } from '@angular/core';
import { environment } from '@envs/environment';


@Component({
  selector: 'gal-fb-share-link',
  templateUrl: './fb-share-link.component.html',
  styleUrls: ['./fb-share-link.component.scss']
})
export class FbShareLinkComponent {

  fbShareLink: string = `https://www.facebook.com/sharer/sharer.php?u=${environment.siteUrl.schema}%3A%2F%2F${environment.siteUrl.domain}%2F&amp;src=sdkpreparse`
  fbDataHref: string = `${environment.siteUrl.schema}://${environment.siteUrl.domain}`
}
