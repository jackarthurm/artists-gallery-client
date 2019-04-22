import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { environment } from '@envs/environment';
import { url } from '@models/shared';


export interface SocialMediaLinks {
  facebook: url;
  instagram: url;
  linkedin: url;
}


@Injectable({
  providedIn: 'root',
})
export class LinksService {

  constructor(private http: HttpClient) {}

  public getSocialMediaLinks(): Observable<SocialMediaLinks> {

    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.get<SocialMediaLinks>(

      `${environment.socialMediaLinksURL.schema}://
${environment.socialMediaLinksURL.domain}
${environment.socialMediaLinksURL.ext}`,
      {
        headers,
        responseType: 'json',
      }
    ).pipe(
      retry(2)
    );
  }
}
