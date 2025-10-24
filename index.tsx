import '@angular/compiler';
import { bootstrapApplication, Title } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './src/app.component';
import { APP_ROUTES } from './src/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(APP_ROUTES, withHashLocation()),
    Title,
    provideAnimations(),
  ],
}).catch((err) => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.