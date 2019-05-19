import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetaConfig, MetaGuard, MetaModule } from 'ng2-meta';

import { AboutPageComponent } from '@components/about-page/about-page.component';
import { ContactPageComponent } from '@components/contact-page/contact-page.component';
import { GalleryPageComponent } from '@components/gallery-page/gallery-page.component';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { ImageDetailsComponent } from '@components/image-details/image-details.component';
import { NotFoundPageComponent } from '@components/not-found-page/not-found-page.component';
import { environment } from '@envs/environment';


const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: `/${environment.routeURLs.homePage}`,
    },
    {
      path: environment.routeURLs.homePage,
      pathMatch: 'full',
      component: HomePageComponent,
      canActivate: [MetaGuard],
      data: {
        meta: {
          title: 'Home page',
          description: 'Description of the home page',
        },
      },
    },
    {
      path: environment.routeURLs.galleryPage,
      pathMatch: 'prefix',
      children: [
        {
          path: '',
          pathMatch: 'prefix',
          component: GalleryPageComponent,
        },
        {
          path: ':id',
          pathMatch: 'full',
          component: ImageDetailsComponent,
          outlet: 'image',
        },
      ],
    },
    {
      path: environment.routeURLs.contactPage,
      pathMatch: 'full',
      component: ContactPageComponent,
      canActivate: [MetaGuard],
      data: {
        meta: {
          title: 'Contact page',
          description: 'Description of the contact page',
        },
      },
    },
    {
      path: environment.routeURLs.aboutPage,
      pathMatch: 'full',
      component: AboutPageComponent,
      canActivate: [MetaGuard],
      data: {
        meta: {
          title: 'About page',
          description: 'Description of the about page',
        },
      },
    },
    {
      path: environment.routeURLs.notFoundPage,
      pathMatch: 'full',
      component: NotFoundPageComponent,
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: `/${environment.routeURLs.notFoundPage}`,
    },
];


const metaConfig: MetaConfig = {
  useTitleSuffix: true,
  defaults: {
    title: 'Kate Alice Mann',
    author: 'Jack Mann',
    description: 'A gallery of expressive artworks by Leeds-based artist Kate Alice Mann',
    titleSuffix: ' | Kate Alice Mann',
    'og:image': 'http://example.com/default-image.png',
    'any other': 'arbitrary tag can be used',
  },
};


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MetaModule.forRoot(metaConfig),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
