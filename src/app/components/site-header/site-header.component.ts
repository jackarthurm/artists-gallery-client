import { Component } from '@angular/core';

import { environment } from '@envs/environment';


interface NavLink {
  name: string,
  route: string
}


@Component({
  selector: 'gal-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {

  readonly navLinks: Array<NavLink> = [
    {
      name: 'Home', 
      route: `/${environment.routeFragments.homePage}`
    },
    {
      name: 'Gallery', 
      route: `/${environment.routeFragments.galleryPage}`
    },
    {
      name: 'About', 
      route: `/${environment.routeFragments.aboutPage}`
    },
    {
      name: 'Contact', 
      route: `/${environment.routeFragments.contactPage}`
    }
  ];
}
