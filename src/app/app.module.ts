import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRootComponent } from '@components/app-root/app-root.component';
import { AppRoutingModule } from '@app/app.routing.module';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { FbShareLinkComponent } from './components/fb-share-link/fb-share-link.component';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppRootComponent,
    GalleryPageComponent,
    AboutPageComponent,
    NotFoundPageComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    FbShareLinkComponent,
    GalleryItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppRootComponent]
})
export class AppModule {}
