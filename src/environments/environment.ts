import { environment as prodEnv } from '@envs/environment.prod';
import {
  Environment,
  HTTPSchema
  } from '@models/environment';


prodEnv.siteURL.domain = 'localhost:4200';

const apiDomain: string = 'localhost:8001';

prodEnv.production = false;
prodEnv.imagesURL.domain = apiDomain;
prodEnv.contactURL.domain = apiDomain;
prodEnv.socialMediaLinksURL.domain = apiDomain;
prodEnv.siteURL.schema = HTTPSchema.HTTP;
prodEnv.imagesURL.schema = HTTPSchema.HTTP;
prodEnv.contactURL.schema = HTTPSchema.HTTP;
prodEnv.socialMediaLinksURL.schema = HTTPSchema.HTTP;

export const environment: Environment = prodEnv;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
