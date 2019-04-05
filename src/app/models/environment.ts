import { routeFragment } from '@models/shared';


export enum HTTPSchema {
  HTTP = 'http',
  HTTPS = 'https'
}

export interface URLConfig {
  domain: string;
  schema: HTTPSchema;
  ext: string;
}

export interface RouteFragmentsConfig {
  homePage: routeFragment;
  aboutPage: routeFragment;
  galleryPage: routeFragment;
  contactPage: routeFragment;
  notFoundPage: routeFragment;
}

export interface NavLink {
  name: string,
  route: routeFragment
}


export interface Environment {
  production: boolean;
  siteURL: URLConfig;
  imagesURL: URLConfig;
  routeFragments: RouteFragmentsConfig;
  navLinks: Array<NavLink>;
  resizeDebounceTimeMS: number;
}
