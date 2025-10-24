import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  aboutService = inject(AboutService);
  content = this.aboutService.getContent();
}