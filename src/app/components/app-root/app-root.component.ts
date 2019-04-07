import {
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { NavLink } from '@app/models/environment';
import { environment } from '@envs/environment';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';


const SIDENAV_BREAKPOINTS: Array<string> = [
  '(max-width: 599px)',
];


@Component({
  selector: 'gal-app-root',
  styleUrls: ['./app-root.component.scss'],
  templateUrl: './app-root.component.html',
})
export class AppRootComponent implements OnInit {

  public readonly navLinks: Array<NavLink> = environment.navLinks;

  private _showSmallScreenLayout: boolean = false;

  @ViewChild('sideNav')
  public sideNav: MatSidenav;

  constructor(private _breakpointObserver: BreakpointObserver) {}

  public ngOnInit(): void {
    this._breakpointObserver.observe(
      SIDENAV_BREAKPOINTS
    ).pipe(
      debounceTime(environment.resizeDebounceTimeMS)
    ).subscribe(
      (state: BreakpointState) => {

        if (state.matches !== this._showSmallScreenLayout) {
          this._showSmallScreenLayout = state.matches;

          // If the sidenav is open when the layout switches we close it
          if (!this._showSmallScreenLayout) {
            this.sideNav.close();
          }
        }
      }
    );
  }

  public onSidenavSwipeRight(event: Event): void {

    if (!this._showSmallScreenLayout) {
      return;
    }

    this.sideNav.open();
    event.preventDefault();
  }

  public onSidenavSwipeLeft(event: Event): void {

    if (!this._showSmallScreenLayout) {
      return;
    }

    this.sideNav.close();
    event.preventDefault();
  }

  get showSmallScreenLayout(): boolean {
    return this._showSmallScreenLayout;
  }
}
