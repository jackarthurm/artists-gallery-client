import { routeURL, url } from '@models/shared';


export interface SocialMediaLinks {
  facebook: url;
  instagram: url;
  linkedin: url;
}

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
  homePage: routeURL;
  aboutPage: routeURL;
  galleryPage: routeURL;
  contactPage: routeURL;
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
  routeURLs: RouteURLConfig;
  navLinks: Array<NavLink>;
  resizeDebounceTimeMS: number;
  socialMediaLinks: SocialMediaLinks;
}


export function makeURL(urlConfig: URLConfig): url {
  return `${urlConfig.schema}://${urlConfig.domain}${urlConfig.ext}`;
}
