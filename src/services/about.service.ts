import { Injectable, signal } from '@angular/core';

export interface AboutContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  mainContent: string;
}

const INITIAL_CONTENT: AboutContent = {
  eyebrow: 'Our Story',
  title: 'About RADI',
  subtitle: 'We provide expert repair and maintenance services for personal electronic devices, combining precision, quality, and trust.',
  mainContent: 'Founded by a team of passionate technicians, RADI was born out of a desire to offer a transparent, high-quality alternative to mainstream repair services. We believe in extending the life of your devices, saving you money and reducing electronic waste. Our state-of-the-art workshop is equipped to handle everything from simple fixes to the most intricate repairs, ensuring your technology is in the most capable hands.'
};

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private content = signal<AboutContent>(INITIAL_CONTENT);

  getContent() {
    return this.content.asReadonly();
  }

  updateContent(newContent: AboutContent) {
    this.content.set(newContent);
  }
}
