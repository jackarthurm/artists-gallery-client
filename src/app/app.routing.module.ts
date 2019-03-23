import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryPageComponent } from '@components/gallery-page/gallery-page.component';
import { AboutPageComponent } from '@components/about-page/about-page.component';
import { NotFoundPageComponent } from '@components/not-found-page/not-found-page.component';
import { ImageDetailsComponent } from '@components/image-details/image-details.component';
import { ContactPageComponent } from '@components/contact-page/contact-page.component';
import { environment } from '@envs/environment';


const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: `/${environment.routeFragments.galleryPage}`
    },
    {
      path: environment.routeFragments.galleryPage,
      pathMatch: 'prefix',
      children: [
        {
          path: '',
          component: GalleryPageComponent,
          pathMatch: 'prefix'
        },
        {
          path: ':id',
          component: ImageDetailsComponent,
          pathMatch: 'full',
          outlet: 'modal'
        }
      ]
    },
    {
      path: environment.routeFragments.contactPage,
      pathMatch: 'full',
      component: ContactPageComponent
    },
    {
      path: environment.routeFragments.aboutPage,
      pathMatch: 'full',
      component: AboutPageComponent
    },
    {
      path: environment.routeFragments.notFoundPage,
      pathMatch: 'full',
      component: NotFoundPageComponent
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: `/${environment.routeFragments.notFoundPage}`
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}