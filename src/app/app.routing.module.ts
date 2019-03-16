import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryPageComponent } from '@components/gallery-page/gallery-page.component';
import { AboutPageComponent } from '@components/about-page/about-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/gallery'
    },
    {
      path: 'gallery',
      pathMatch: 'full',
      component: GalleryPageComponent
    },
    {
      path: 'about-kate',
      pathMatch: 'full',
      component: AboutPageComponent
    },
    {
      path: 'not-found',
      pathMatch: 'full',
      component: NotFoundPageComponent
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: '/not-found'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }