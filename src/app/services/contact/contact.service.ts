import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { environment } from '@envs/environment';
import { makeURL } from '@models/environment';


export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  body: string;
}


@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(private _http: HttpClient) {}

  public createContactMessage(message: ContactMessage): Observable<ContactMessage> {

    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this._http.post<ContactMessage>(
      makeURL(environment.contactURL),
      message,
      {headers}
    ).pipe(
      retry(environment.requestRetryAttempts)
    );
  }
}
