import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NavLink } from '@app/models/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'gal-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {

  constructor(private _router: Router) {}

  @Input()
  navLinks: Array<NavLink>;

  @Output()
  menuClick: EventEmitter<void> = new EventEmitter();

  onMenuClicked(evt: Event) {

    this.menuClick.emit()
    evt.preventDefault()
  }

  navLinkIsActive(link: NavLink) {

    return this._router.url.match(link.url);
  }
}
