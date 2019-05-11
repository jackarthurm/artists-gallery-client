import {
  Component,
  Input,
} from '@angular/core';

import { GalleryItem } from '@models/image';


@Component({
  selector: 'gal-gallery-item',
  styleUrls: ['./gallery-item.component.scss'],
  templateUrl: './gallery-item.component.html',
})
export class GalleryItemComponent {

  @Input()
  public galleryItem: GalleryItem;
}
