import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';

import { url } from '@models/shared';
import { InfoDialogService } from '@services/info-dialog/info-dialog.service';
import { LinksService, SocialMediaLinks } from '@services/links/links.service';


@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  private _socialMediaLinks: SocialMediaLinks;

  constructor(
    private linksService: LinksService,
    private infoDialogService: InfoDialogService
  ) {}

  public get socialMediaLinks(): SocialMediaLinks {
    return this._socialMediaLinks;
  }

  public initApp(): Promise<void> {

    return this.linksService.getSocialMediaLinks().pipe(
      catchError(
        (_err: HttpErrorResponse, _caught: Observable<SocialMediaLinks>) => {

          this.infoDialogService.openErrorDialog(
            `Failed to contact server. Please check your
            internet connection or try again later.`
          );

          return of();
        }
      ),
      tap(
        (links: SocialMediaLinks) => {

          if (
            [
              links.facebook,
              links.instagram,
              links.linkedin,
            ].some((link: url) => !link)
          ) {

            this.infoDialogService.openErrorDialog(
              `Invalid configuration, one or more
              social media links are not defined.`
            );
          }

          this._socialMediaLinks = links;
        }
      ),
      mergeMap(
        () => of()
      )
    ).toPromise<void>();
  }
}
