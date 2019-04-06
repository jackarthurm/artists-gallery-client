import {
  Environment,
  HTTPSchema,
  RouteFragmentsConfig
} from '@models/environment';


const routeFragments: RouteFragmentsConfig = {
  homePage: 'home',
  aboutPage: 'about',
  galleryPage: 'gallery',
  contactPage: 'contact',
  notFoundPage: 'not-found'
}


export const environment: Environment = {
  production: true,
  routeFragments: routeFragments,
  navLinks: [
    {
      name: 'HOME', 
      route: `/${routeFragments.homePage}`
    },
    {
      name: 'GALLERY', 
      route: `/${routeFragments.galleryPage}`
    },
    {
      name: 'ABOUT', 
      route: `/${routeFragments.aboutPage}`
    },
    {
      name: 'CONTACT', 
      route: `/${routeFragments.contactPage}`
    }
  ],
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
  resizeDebounceTimeMS: 100
};
