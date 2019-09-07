import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { environment } from '@envs/environment';
import { url } from '@models/shared';
import { makeURL } from '@app/models/environment';


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
      makeURL(environment.socialMediaLinksURL),
      {
        headers,
        responseType: 'json',
      }
    ).pipe(
      retry(2)
    );
  }
}
