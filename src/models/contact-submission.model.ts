export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: Date;
}
