import { Component, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'gal-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {

  @Output()
  menuToggled: EventEmitter<void> = new EventEmitter();

  onMenuClicked(evt: Event) {

    this.menuToggled.emit()
    evt.preventDefault()
  }
}
