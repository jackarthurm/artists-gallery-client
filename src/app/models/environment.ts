import { routeURL, url } from '@models/shared';


export enum HTTPSchema {
  HTTP = 'http',
  HTTPS = 'https',
}

export interface URLConfig {
  schema: HTTPSchema;
  domain: string;
  ext: string;
}

export interface RouteURLConfig {
  aboutPage: routeURL;
  contactPage: routeURL;
  galleryPage: routeURL;
  homePage: routeURL;
  notFoundPage: routeURL;
}

export interface NavLink {
  name: string;
  url: routeURL;
}


export interface Environment {
  production: boolean;
  siteURL: URLConfig;
  imagesURL: URLConfig;
  contactURL: URLConfig;
  socialMediaLinksURL: URLConfig;
  routeURLs: RouteURLConfig;
  navLinks: Array<NavLink>;
  resizeDebounceTimeMS: number;
  requestRetryAttempts: number;
  galleryStateSessionStorageKey: string;
}


export function makeURL(urlConfig: URLConfig): url {
  return `${urlConfig.schema}://${urlConfig.domain}${urlConfig.ext}`;
}
