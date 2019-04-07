import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactMessage, ContactService } from '@services/contact/contact.service';


@Component({
  selector: 'gal-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent {

  public readonly maxFieldLengths: Map<string, number> = new Map([
    ['name', 70],
    ['email', 254],
    ['subject', 78],
    ['body', 2000],
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
    body: new FormControl('', [
      Validators.required,
      Validators.maxLength(
        this.maxFieldLengths.get('body')
      ),
    ]),
  });

  constructor(private _contactService: ContactService) {}

  public get contactForm(): FormGroup {
    return this._contactForm;
  }

  public onSubmit(): void {

    const contactMessage: ContactMessage = {
      name: this._contactForm.get('name').value,
      email: this._contactForm.get('email').value,
      subject: this._contactForm.get('subject').value,
      body: this._contactForm.get('body').value,
    };

    this._contactService.createContactMessage(contactMessage).subscribe(
      this._sendContactMessageSuccess,
      this._sendContactMessageFailure
    );
  }

  private _sendContactMessageFailure(err: Error) {

    console.log(err);
  }

  private _sendContactMessageSuccess() {}
}
