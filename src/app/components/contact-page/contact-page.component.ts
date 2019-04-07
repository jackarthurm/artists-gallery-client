import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'gal-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

  readonly maxFieldLengths: Map<string, number> = new Map([
    ['name', 70],
    ['email', 254],
    ['subject', 78],
    ['message', 2000],
  ]);

  private readonly _contactForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(
        this.maxFieldLengths.get('name')
      ),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(
        this.maxFieldLengths.get('email')
      ),
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.maxLength(
        this.maxFieldLengths.get('subject')
      ),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(
        this.maxFieldLengths.get('message')
      ),
    ]),
  });

  get contactForm(): FormGroup {
    return this._contactForm;
  }

  onSubmit(): void {

    console.log('Submitted');
  }
}
