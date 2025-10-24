import { Component, ChangeDetectionStrategy, inject, input, computed, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostComponent {
  slug = input.required<string>();
  
  private blogService = inject(BlogService);
  private router = inject(Router);
  private titleService = inject(Title);
  private sanitizer = inject(DomSanitizer);

  post = computed(() => {
    return this.blogService.getPostBySlug(this.slug());
  });

  safeContent = computed(() => {
    const content = this.post()?.content;
    return content ? this.sanitizer.bypassSecurityTrustHtml(content) : '';
  });

  constructor() {
    effect(() => {
      const post = this.post();
      if (post) {
        this.titleService.setTitle(`RADI Blog - ${post.title}`);
      } else {
        // Post not found for the given slug, navigate away.
        // Using a timeout to avoid issues with expression changed after it has been checked.
        setTimeout(() => this.router.navigate(['/blog']), 0);
      }
    });
  }
}
