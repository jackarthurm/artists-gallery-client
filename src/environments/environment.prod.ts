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
    domain: 'localhost:8001',
    ext: '/api/gallery-items/'
  },
  resizeDebounceTime: 1000
};
