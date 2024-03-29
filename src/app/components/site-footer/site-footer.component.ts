import { Component } from '@angular/core';


@Component({
  selector: 'gal-site-footer',
  styleUrls: ['./site-footer.component.scss'],
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {

  public currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
