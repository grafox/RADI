import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogManagerComponent } from './blog-manager/blog-manager.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { ServicesManagerComponent } from './services-manager/services-manager.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { AboutManagerComponent } from './about-manager/about-manager.component';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'Admin - Dashboard' },
      { path: 'blog', component: BlogManagerComponent, title: 'Admin - Blog' },
      { path: 'blog/new', component: BlogEditComponent, title: 'Admin - New Post' },
      { path: 'blog/edit/:slug', component: BlogEditComponent, title: 'Admin - Edit Post' },
      { path: 'services', component: ServicesManagerComponent, title: 'Admin - Services' },
      { path: 'services/new', component: ServiceEditComponent, title: 'Admin - New Service' },
      { path: 'services/edit/:id', component: ServiceEditComponent, title: 'Admin - Edit Service' },
      { path: 'about', component: AboutManagerComponent, title: 'Admin - About Page' },
      { path: 'contact', component: ContactManagerComponent, title: 'Admin - Messages' },
    ]
  }
];
