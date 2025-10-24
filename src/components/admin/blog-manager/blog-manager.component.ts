import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-blog-manager',
  imports: [RouterLink],
  templateUrl: './blog-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogManagerComponent {
  blogService = inject(BlogService);
  posts = this.blogService.getPosts();

  deletePost(slug: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.blogService.deletePost(slug);
    }
  }
}
