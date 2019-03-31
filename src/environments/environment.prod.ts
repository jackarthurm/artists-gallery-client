import { Environment, HTTPSchema } from '@models/environment';


export const environment: Environment = {
  production: true,
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
    domain: 'katealicemann.eu-west-1.elasticbeanstalk.com',
    ext: '/api/gallery-items/'
  },
  resizeDebounceTime: 1000
};
