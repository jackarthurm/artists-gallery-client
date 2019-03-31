import { Injectable } from '@angular/core';


interface ContactEmail {
  name: string;
  email: string;
  subject: string;
  body: string;
}



@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }
}
