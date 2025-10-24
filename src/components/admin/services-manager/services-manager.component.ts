import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-services-manager',
  imports: [RouterLink],
  templateUrl: './services-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesManagerComponent {
  servicesService = inject(ServicesService);
  services = this.servicesService.getServices();

  deleteService(id: string) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.servicesService.deleteService(id);
    }
  }
}
