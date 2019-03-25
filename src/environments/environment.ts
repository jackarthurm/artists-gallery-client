import { Environment, HTTPSchema } from '@models/environment';


export const environment: Environment = {
  production: false,
  routeFragments: {
    aboutPage: 'about-kate',
    galleryPage: 'gallery',
    contactPage: 'contact',
    notFoundPage: 'not-found'
  },
  siteURL: {
    schema: HTTPSchema.HTTP,
    domain: 'katealicemann.com',
    ext: ''
  },
  imagesURL: {
    schema: HTTPSchema.HTTP,
    domain: 'localhost:8001',
    ext: '/api/gallery-items/'
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
