import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutService, AboutContent } from '../../../services/about.service';

@Component({
  selector: 'app-about-manager',
  imports: [ReactiveFormsModule],
  templateUrl: './about-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutManagerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private aboutService = inject(AboutService);

  aboutForm = this.fb.group({
    eyebrow: ['', Validators.required],
    title: ['', Validators.required],
    subtitle: ['', Validators.required],
    mainContent: ['', Validators.required],
  });
  
  saveStatus: 'idle' | 'saved' = 'idle';

  ngOnInit(): void {
    // FIX: The getContent() method returns a signal. It must be called to retrieve its value.
    const currentContent = this.aboutService.getContent()();
    this.aboutForm.patchValue(currentContent);
  }

  onSubmit(): void {
    if (this.aboutForm.valid) {
      // FIX: Replaced `as any` with a proper type assertion to AboutContent.
      this.aboutService.updateContent(this.aboutForm.value as AboutContent);
      this.saveStatus = 'saved';
      setTimeout(() => this.saveStatus = 'idle', 3000);
    }
  }
}
