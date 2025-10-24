import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ServicesService } from '../../../services/services.service';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  blogService = inject(BlogService);
  servicesService = inject(ServicesService);
  contactService = inject(ContactService);

  stats = computed(() => ({
    blogPosts: this.blogService.getPosts()().length,
    services: this.servicesService.getServices()().length,
    contactMessages: this.contactService.getSubmissions()().length
  }));
}
