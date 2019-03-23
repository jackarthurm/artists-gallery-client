import { Component } from '@angular/core';
import { environment } from '@envs/environment';


interface NavLink {
  name: string,
  route: string
}

@Component({
  selector: 'gal-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent {

  readonly navLinks: Array<NavLink> = [
    {
      name: 'About Kate', 
      route: `/${environment.routeFragments.aboutPage}`
    },
    {
      name: 'Gallery', 
      route: `/${environment.routeFragments.galleryPage}`
    },
    {
      name: 'Contact', 
      route: `/${environment.routeFragments.contactPage}`
    }
  ];
}
