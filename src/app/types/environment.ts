export enum HTTPSchema {
  HTTP = 'http',
  HTTPS = 'https'
}

export interface SiteURLConfig {
  domain: string;
  schema: HTTPSchema
}

export interface RouteFragmentsConfig {
  about: string;
  gallery: string;
}

export interface Environment {

  production: boolean;
  siteUrl: SiteURLConfig;
  routeFragments: RouteFragmentsConfig;
}