import { Component, ChangeDetectionStrategy, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { BlogPost } from '../../../models/blog-post.model';

@Component({
  selector: 'app-blog-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './blog-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogEditComponent implements OnInit {
  slug = input<string>();

  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  private router = inject(Router);

  isEditMode = false;
  private existingPost: BlogPost | undefined;

  postForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    publishDate: [new Date().toISOString().split('T')[0], Validators.required],
    imageUrl: ['', Validators.required],
    excerpt: ['', Validators.required],
    content: ['', Validators.required],
  });

  ngOnInit(): void {
    const slug = this.slug();
    if (slug) {
      this.isEditMode = true;
      this.existingPost = this.blogService.getPostBySlug(slug);
      if (this.existingPost) {
        this.postForm.patchValue(this.existingPost);
      } else {
        // Post not found, redirect
        this.router.navigate(['/admin/blog']);
      }
    }
  }
  
  private createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;
      
      if (this.isEditMode && this.existingPost) {
        const updatedPost: BlogPost = {
          ...this.existingPost,
          ...formValue as any,
        };
        this.blogService.updatePost(updatedPost);
      } else {
         const newPost: BlogPost = {
          slug: this.createSlug(formValue.title!),
          ...formValue as any
        };
        this.blogService.addPost(newPost);
      }
      this.router.navigate(['/admin/blog']);
    }
  }
}
