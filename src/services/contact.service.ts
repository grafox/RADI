import { Injectable, signal } from '@angular/core';
import { ContactSubmission } from '../models/contact-submission.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private submissions = signal<ContactSubmission[]>([]);

  getSubmissions() {
    return this.submissions.asReadonly();
  }

  addSubmission(submission: Omit<ContactSubmission, 'id' | 'date'> & { id: string, date: Date }) {
    this.submissions.update(submissions => [submission, ...submissions]);
  }

  deleteSubmission(id: string) {
    this.submissions.update(submissions => submissions.filter(s => s.id !== id));
  }
}
