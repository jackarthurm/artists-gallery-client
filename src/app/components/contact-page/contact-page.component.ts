import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactMessage, ContactService } from '@services/contact/contact.service';


const EMAIL_REGEX: string = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';


@Component({
  selector: 'gal-contact-page',
  styleUrls: ['./contact-page.component.scss'],
  templateUrl: './contact-page.component.html',
})
export class ContactPageComponent {

  public readonly maxFieldLengths: {[fieldName: string]: number} = {
    body: 2000,
    name: 70,
    subject: 78,
  };

  private readonly _contactForm: FormGroup = new FormGroup({
    body: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.maxFieldLengths.body),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.maxFieldLengths.name),
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.maxFieldLengths.subject),
    ]),
  });

  constructor(private contactService: ContactService) {}

  public get contactForm(): FormGroup {
    return this._contactForm;
  }

  public onSubmit(): void {

    const contactMessage: ContactMessage = {
      name: this._contactForm.controls.name.value,
      email: this._contactForm.controls.email.value,
      subject: this._contactForm.controls.subject.value,
      body: this._contactForm.controls.body.value,
    };

    this.contactService.createContactMessage(contactMessage).subscribe(
      this.sendContactMessageSuccess,
      this.sendContactMessageFailure
    );
  }

  private sendContactMessageFailure(err: Error): void {

    console.log(err);
  }

  private sendContactMessageSuccess(): void {

    this._contactForm.reset();
  }
}
