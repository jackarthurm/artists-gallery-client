import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavLink } from '@app/models/environment';


@Component({
  selector: 'gal-site-header',
  styleUrls: ['./site-header.component.scss'],
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {

  constructor(private _router: Router) {}

  @Input()
  public navLinks: Array<NavLink>;

  @Output()
  public menuClick: EventEmitter<void> = new EventEmitter();

  public onMenuClicked(evt: Event): void {

    this.menuClick.emit();
    evt.preventDefault();
  }

  public navLinkIsActive(link: NavLink): boolean {

    return this._router.url.match(link.url) !== null;
  }
}
