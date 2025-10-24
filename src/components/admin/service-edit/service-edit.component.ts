import { Component, ChangeDetectionStrategy, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicesService } from '../../../services/services.service';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-service-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './service-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceEditComponent implements OnInit {
  id = input<string>();

  private fb = inject(FormBuilder);
  private servicesService = inject(ServicesService);
  private router = inject(Router);

  isEditMode = false;
  private existingService: Service | undefined;

  serviceForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    icon: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.id();
    if (id) {
      this.isEditMode = true;
      this.existingService = this.servicesService.getServiceById(id);
      if (this.existingService) {
        this.serviceForm.patchValue(this.existingService);
      } else {
        this.router.navigate(['/admin/services']);
      }
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formValue = this.serviceForm.value;
      
      if (this.isEditMode && this.existingService) {
        const updatedService: Service = {
          id: this.existingService.id,
          ...formValue as any,
        };
        this.servicesService.updateService(updatedService);
      } else {
         this.servicesService.addService(formValue as any);
      }
      this.router.navigate(['/admin/services']);
    }
  }
}
