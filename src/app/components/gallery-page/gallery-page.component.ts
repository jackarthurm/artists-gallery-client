import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService, GalleryPage } from '@app/services/image/image.service';
import { environment } from '@envs/environment';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'gal-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit, OnDestroy {

  page: GalleryPage;
  innerWidth: number = window.innerWidth;

  private readonly _resizeDebounceTime: number = environment.resizeDebounceTime

  private _resize: Subscription

  constructor(private _imagesService: ImageService) {

    this._resize = fromEvent(window, 'resize').pipe(
      debounceTime(this._resizeDebounceTime)
    )
    .subscribe((event: Event) => {
      this.onResize(event);
    });
  }

  ngOnInit() {

    this._imagesService.getGalleryPage(1).subscribe(
      (page: GalleryPage) => this.page = page
    )
  }

  ngOnDestroy() {

    this._resize.unsubscribe();
  }

  onResize(event: Event) {

    this.innerWidth = event.target['innerWidth'];
  }
}
