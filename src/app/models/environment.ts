import { routeURL } from '@models/shared';


export enum HTTPSchema {
  HTTP = 'http',
  HTTPS = 'https'
}

export interface URLConfig {
  domain: string;
  schema: HTTPSchema;
  ext: string;
}

export interface RouteURLConfig {
  homePage: routeURL;
  aboutPage: routeURL;
  galleryPage: routeURL;
  contactPage: routeURL;
  notFoundPage: routeURL;
}

export interface NavLink {
  name: string,
  url: routeURL
}


export interface Environment {
  production: boolean;
  siteURL: URLConfig;
  imagesURL: URLConfig;
  routeURLs: RouteURLConfig;
  navLinks: Array<NavLink>;
  resizeDebounceTimeMS: number;
}
