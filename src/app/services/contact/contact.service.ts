import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@envs/environment';
import { makeURL } from '@app/models/environment';
import { Observable } from 'rxjs';


export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  body: string;
}


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http: HttpClient) {}

  createContactMessage(message: ContactMessage): Observable<ContactMessage> {

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this._http.post<ContactMessage>(
      makeURL(environment.contactURL),
      message,
      {headers: headers}
    );
  }
}
