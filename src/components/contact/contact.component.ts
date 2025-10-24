import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private contactService = inject(ContactService);
  
  submissionStatus = signal<'idle' | 'success' | 'error'>('idle');

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', Validators.required],
  });

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
      // FIX: The contactForm.value contains properties that can be null, which is not compatible
      // with the ContactSubmission model. We explicitly create the object with the correct types,
      // using non-null assertions for fields that are validated with Validators.required.
      const { name, email, phone, message } = this.contactForm.value;
      this.contactService.addSubmission({
        id: Date.now().toString(),
        date: new Date(),
        name: name!,
        email: email!,
        phone: phone ?? undefined,
        message: message!,
      });
      this.submissionStatus.set('success');
      this.contactForm.reset();
    } else {
      console.log('Form is invalid');
      this.submissionStatus.set('error');
      this.contactForm.markAllAsTouched();
    }
  }
}
