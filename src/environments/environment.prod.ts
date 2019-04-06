import {
  Environment,
  HTTPSchema,
  RouteURLConfig
} from '@models/environment';


const routeURLs: RouteURLConfig = {
  homePage: 'home',
  aboutPage: 'about',
  galleryPage: 'gallery',
  contactPage: 'contact',
  notFoundPage: 'not-found'
}


export const environment: Environment = {
  production: true,
  routeURLs: routeURLs,
  navLinks: [
    {
      name: 'HOME', 
      url: `/${routeURLs.homePage}`
    },
    {
      name: 'GALLERY', 
      url: `/${routeURLs.galleryPage}`
    },
    {
      name: 'ABOUT', 
      url: `/${routeURLs.aboutPage}`
    },
    {
      name: 'CONTACT', 
      url: `/${routeURLs.contactPage}`
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
