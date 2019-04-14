import { environment as prodEnv } from '@envs/environment.prod';
import { Environment } from '@models/environment';


const domain: string = 'jack-laptop:8001';

prodEnv.production = false;
prodEnv.imagesURL.domain = domain;
prodEnv.contactURL.domain = domain;
prodEnv.socialMediaLinksURL.domain = domain;

export const environment: Environment = prodEnv;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
