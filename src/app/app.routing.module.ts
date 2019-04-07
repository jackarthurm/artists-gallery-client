import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
          outlet: 'modal',
        },
      ],
    },
    {
      path: environment.routeURLs.contactPage,
      pathMatch: 'full',
      component: ContactPageComponent,
    },
    {
      path: environment.routeURLs.aboutPage,
      pathMatch: 'full',
      component: AboutPageComponent,
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


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
