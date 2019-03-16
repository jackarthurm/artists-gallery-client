import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '@app/app.component';
import { MainComponent } from '@components/main/main.component';
import { AppRoutingModule } from '@app/app.routing.module';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GalleryPageComponent,
    AboutPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
