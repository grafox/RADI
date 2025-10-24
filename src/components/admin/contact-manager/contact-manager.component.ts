import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  imports: [DatePipe],
  templateUrl: './contact-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactManagerComponent {
  contactService = inject(ContactService);
  submissions = this.contactService.getSubmissions();

  deleteSubmission(id: string) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.contactService.deleteSubmission(id);
    }
  }
}
