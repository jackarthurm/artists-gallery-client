import { Environment, HTTPSchema } from '@models/environment';


export const environment: Environment = {
  production: true,
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
