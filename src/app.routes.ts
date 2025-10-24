import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, title: 'RADI - Home', data: { animation: 'home' } },
  { path: 'about', component: AboutComponent, title: 'RADI - About Us', data: { animation: 'about' } },
  { path: 'services', component: ServicesComponent, title: 'RADI - Services', data: { animation: 'services' } },
  { path: 'contact', component: ContactComponent, title: 'RADI - Contact Us', data: { animation: 'contact' } },
  { path: 'blog', component: BlogComponent, title: 'RADI - Blog', data: { animation: 'blog' } },
  { path: 'blog/:slug', component: BlogPostComponent, data: { animation: 'blogPost' } }, // Title is set dynamically
  { path: 'login', component: LoginComponent, title: 'RADI - Admin Login' },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./components/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    title: 'RADI - Admin'
  },
  { path: '**', component: NotFoundComponent, title: 'RADI - Page Not Found', data: { animation: 'notFound' } }
];