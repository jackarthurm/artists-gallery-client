export enum HTTPSchema {
  HTTP = 'http',
  HTTPS = 'https'
}

export interface URLConfig {
  domain: string;
  schema: HTTPSchema,
  ext: string;
}

export interface RouteFragmentsConfig {
  about: string;
  gallery: string;
}

export interface Environment {

  production: boolean;
  siteURL: URLConfig;
  imagesURL: URLConfig
  routeFragments: RouteFragmentsConfig;
  resizeDebounceTime: number
}