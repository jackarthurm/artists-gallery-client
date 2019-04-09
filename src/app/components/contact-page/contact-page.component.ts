import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '@components/success-dialog/success-dialog.component';
import {
  ContactMessage,
  ContactService,
} from '@services/contact/contact.service';


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

  private _contactForm: FormGroup = new FormGroup({
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
        Validators.email,
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
    private successDialog: MatDialog
  ) {}

  public get contactForm(): FormGroup {
    return this._contactForm;
  }

  public onSubmit(form: FormGroupDirective): void {

    const contactMessage: ContactMessage = {
      name: this._contactForm.controls.name.value,
      email: this._contactForm.controls.email.value,
      subject: this._contactForm.controls.subject.value,
      body: this._contactForm.controls.body.value,
    };

    this.contactService.createContactMessage(contactMessage).subscribe(
      this.sendContactMessageSuccess.bind(this),
      this.sendContactMessageFailure.bind(this)
    );

    form.resetForm();
  }

  private sendContactMessageFailure(err: Error): void {
    console.log(err);
  }

  private sendContactMessageSuccess(): void {

    this.openSuccessDialog();
  }

  private openSuccessDialog(): void {
    this.successDialog.open(
      SuccessDialogComponent,
      {
        data: {message: 'Contact message sent'},
        width: '200px',
      }
    );
  }
}
