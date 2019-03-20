import { Environment, HTTPSchema } from '@models/environment';


export const environment: Environment = {
  production: false,
  routeFragments: {
    about: 'about-kate',
    gallery: 'gallery'
  },
  siteURL: {
    schema: HTTPSchema.HTTP,
    domain: 'katealicemann.com',
    ext: ''
  },
  imagesURL: {
    schema: HTTPSchema.HTTPS,
    domain: 'picsum.photos',
    ext: '/300/400/'
  },
  resizeDebounceTime: 1000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
