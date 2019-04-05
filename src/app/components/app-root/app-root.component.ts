import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BreakpointState, 
  BreakpointObserver,
} from '@angular/cdk/layout';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { environment } from '@envs/environment';
import { MatSidenav } from '@angular/material';
import { NavLink } from '@app/models/environment';


const SIDENAV_BREAKPOINTS: Array<string> = [
  '(max-width: 599px)'
];


@Component({
  selector: 'gal-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {

  readonly navLinks: Array<NavLink> = environment.navLinks;
  
  showSmallScreenLayout: boolean = false;

  @ViewChild('sideNav')
  sideNav: MatSidenav;

  constructor(private _breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this._breakpointObserver.observe(
      SIDENAV_BREAKPOINTS
    ).pipe(
      debounceTime(environment.resizeDebounceTimeMS)
    ).subscribe(
      (state: BreakpointState) => {

        if (state.matches !== this.showSmallScreenLayout) {
          this.showSmallScreenLayout = state.matches

          // If the sidenav is open when the layout switches we close it
          if (!this.showSmallScreenLayout) {
            this.sideNav.close();
          }
        }
      }
    );
  }
}
