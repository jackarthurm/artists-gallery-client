import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import { MatCardModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from '@app/app.routing.module';

import { AboutPageComponent } from '@components/about-page/about-page.component';
import { AppRootComponent } from '@components/app-root/app-root.component';
import { ContactPageComponent } from '@components/contact-page/contact-page.component';
import { FbShareLinkComponent } from '@components/fb-share-link/fb-share-link.component';
import { GalleryItemComponent } from '@components/gallery-item/gallery-item.component';
import { GalleryPageComponent } from '@components/gallery-page/gallery-page.component';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { ImageDetailsDialogComponent } from '@components/image-details-dialog/image-details-dialog.component';
import { ImageDetailsComponent } from '@components/image-details/image-details.component';
import { NotFoundPageComponent } from '@components/not-found-page/not-found-page.component';
import { SiteFooterComponent } from '@components/site-footer/site-footer.component';
import { SiteHeaderComponent } from '@components/site-header/site-header.component';


@NgModule({
  declarations: [
    AppRootComponent,
    GalleryPageComponent,
    AboutPageComponent,
    NotFoundPageComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    FbShareLinkComponent,
    GalleryItemComponent,
    ImageDetailsComponent,
    ImageDetailsDialogComponent,
    ContactPageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppRootComponent],
  entryComponents: [ImageDetailsDialogComponent],
})
export class AppModule {}
