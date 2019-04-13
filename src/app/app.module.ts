import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
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
import { HomePageHeaderComponent } from '@components/home-page-header/home-page-header.component';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { ImageDetailsDialogComponent } from '@components/image-details-dialog/image-details-dialog.component';
import { ImageDetailsComponent } from '@components/image-details/image-details.component';
import { MediaLinksBannerComponent } from '@components/media-links-banner/media-links-banner.component';
import { NotFoundPageComponent } from '@components/not-found-page/not-found-page.component';
import { SiteFooterComponent } from '@components/site-footer/site-footer.component';
import { SiteHeaderComponent } from '@components/site-header/site-header.component';
import { SuccessDialogComponent } from '@components/success-dialog/success-dialog.component';


@NgModule({
  bootstrap: [AppRootComponent],
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
    SuccessDialogComponent,
    MediaLinksBannerComponent,
    HomePageHeaderComponent,
  ],
  entryComponents: [
    ImageDetailsDialogComponent,
    SuccessDialogComponent,
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
    MatGridListModule,
  ],
  providers: [],
})
export class AppModule {}
