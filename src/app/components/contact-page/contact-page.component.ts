import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import * as EmailValidator from 'email-validator';

import {
  ContactMessage,
  ContactService,
} from '@services/contact/contact.service';
import { InfoDialogService } from '@services/info-dialog/info-dialog.service';


function emailWithTLDValidator(
  control: AbstractControl
): ValidationErrors | null {

  return EmailValidator.validate(control.value) ? null : {email: true};
}


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

  private _isLoading: boolean = false;

  public contactForm: FormGroup = new FormGroup({
    body: new FormControl(
      '',
      [
        Validators.required,
        Validators.maxLength(this.maxFieldLengths.body),
      ]
    ),
    email: new FormControl(
      '',
      [
        Validators.required,
        emailWithTLDValidator,
      ]
    ),
    name: new FormControl(
      '',
      [
        Validators.required,
        Validators.maxLength(this.maxFieldLengths.name),
      ]
    ),
    subject: new FormControl(
      '',
      [
        Validators.required,
        Validators.maxLength(this.maxFieldLengths.subject),
      ]
    ),
  });

  constructor(
    private contactService: ContactService,
    private infoDialogService: InfoDialogService
  ) {}

  public onSubmit(form: FormGroupDirective): void {

    const contactMessage: ContactMessage = {
      name: this.contactForm.controls.name.value,
      email: this.contactForm.controls.email.value,
      subject: this.contactForm.controls.subject.value,
      body: this.contactForm.controls.body.value,
    };

    this._isLoading = true;
    this.contactForm.disable();

    this.contactService.createContactMessage(contactMessage).subscribe(
      () => {
        this._isLoading = false;
        this.contactForm.enable();
        form.resetForm();
        this.infoDialogService.openSuccessDialog(
          `Contact message sent.`
        );
      },
      (_err: Error) => {
        this._isLoading = false;
        this.contactForm.enable();
        this.infoDialogService.openErrorDialog(
          `Failed to send contact message.
           Please check your internet connection or try again later.`
        );
      }
    );
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public set isLoading(value: boolean) {

    if (value) {
      this.contactForm.disable();
    }
    else {
      this.contactForm.enable();
    }

    this._isLoading = value;
  }
}
