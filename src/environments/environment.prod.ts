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
  socialMediaLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },
};
