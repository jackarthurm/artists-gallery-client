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
  aboutPage: string;
  galleryPage: string;
  contactPage: string;
  notFoundPage: string;
}

export interface Environment {
  production: boolean;
  siteURL: URLConfig;
  imagesURL: URLConfig;
  routeFragments: RouteFragmentsConfig;
  resizeDebounceTime: number;
}