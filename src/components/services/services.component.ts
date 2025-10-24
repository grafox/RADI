import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  private sanitizer = inject(DomSanitizer);
  private servicesService = inject(ServicesService);

  services = computed(() => {
    return this.servicesService.getServices()().map(service => ({
      ...service,
      safeIcon: this.sanitizer.bypassSecurityTrustHtml(service.icon)
    }));
  });
}