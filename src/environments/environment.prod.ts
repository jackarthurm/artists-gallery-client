import {
  Environment,
  HTTPSchema,
  RouteURLConfig
} from '@models/environment';


const routeURLs: RouteURLConfig = {
  aboutPage: 'about',
  contactPage: 'contact',
  galleryPage: 'gallery',
  homePage: 'home',
  notFoundPage: 'not-found',
};


export const environment: Environment = {
  production: true,
  siteURL: {
    schema: HTTPSchema.HTTP,
    domain: 'katealicemann.com',
    ext: '',
  },
  imagesURL: {
    schema: HTTPSchema.HTTP,
    domain: 'admin.katealicemann.com',
    ext: '/api/gallery-items/',
  },
  contactURL: {
    schema: HTTPSchema.HTTP,
    domain: 'admin.katealicemann.com',
    ext: '/api/contact/',
  },
  socialMediaLinksURL: {
    schema: HTTPSchema.HTTP,
    domain: 'admin.katealicemann.com',
    ext: '/api/social-media-links/',
  },
  routeURLs,
  navLinks: [
    {
      name: 'HOME',
      url: `/${routeURLs.homePage}`,
    },
    {
      name: 'GALLERY',
      url: `/${routeURLs.galleryPage}`,
    },
    {
      name: 'ABOUT',
      url: `/${routeURLs.aboutPage}`,
    },
    {
      name: 'CONTACT',
      url: `/${routeURLs.contactPage}`,
    },
  ],
  resizeDebounceTimeMS: 100,
  requestRetryAttempts: 2,
  galleryStateSessionStorageKey: 'gallerystate',
};
