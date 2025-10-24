import { Injectable, signal } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';

const MOCK_POSTS: BlogPost[] = [
  {
    slug: 'why-repairing-is-better-than-replacing',
    title: 'Why Repairing Your Electronics is Better Than Replacing Them',
    author: 'Jane Doe, Lead Technician',
    publishDate: '2024-07-21',
    excerpt: 'In a world of disposable tech, choosing to repair your devices is a powerful act. It saves you money, protects the environment, and gives you a deeper connection to the technology you use every day.',
    content: `
      <p class="mb-4">In today's fast-paced consumer culture, the moment a device glitches, the immediate thought is often "time for an upgrade." But what if we paused and considered an alternative? Repairing, rather than replacing, our electronics offers a multitude of benefits that extend far beyond a simple fix.</p>
      <h3 class="text-xl font-semibold text-white mt-6 mb-2">The Economic Advantage</h3>
      <p class="mb-4">The most obvious benefit is cost savings. A screen replacement for a smartphone or a new battery for a laptop is significantly cheaper than purchasing a brand new device. At RADI, we see customers save hundreds of dollars every day by opting for a simple repair. This saved money can be allocated to other important things in your life.</p>
      <h3 class="text-xl font-semibold text-white mt-6 mb-2">Environmental Responsibility</h3>
      <p class="mb-4">Electronic waste, or e-waste, is a growing global problem. Discarded devices leak toxic materials into landfills, harming ecosystems and human health. By choosing to repair, you are directly contributing to the reduction of e-waste. Extending the lifespan of a single laptop by just one year can have a significant positive impact on its environmental footprint.</p>
      <h3 class="text-xl font-semibold text-white mt-6 mb-2">Understanding Your Tech</h3>
      <p>When you get a device repaired, you often learn more about how it works. It demystifies the black box in your pocket. This understanding fosters a greater appreciation for the complex engineering that goes into your gadgets and empowers you as a consumer.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/repair/1200/800',
  },
  {
    slug: 'common-laptop-problems-and-how-to-fix-them',
    title: '5 Common Laptop Problems and How to Fix Them',
    author: 'John Smith, PC Specialist',
    publishDate: '2024-07-15',
    excerpt: 'Laptops are essential, but they can be frustrating when they fail. We break down five of the most common issues we see at the workshop, from slow performance to battery woes, and what you can do about them.',
    content: `
      <p class="mb-4">Your laptop is your connection to work, entertainment, and communication. When it acts up, it can bring your productivity to a halt. Here are five common issues we regularly diagnose and fix at RADI.</p>
      <h3 class="text-xl font-semibold text-white mt-6 mb-2">1. Slow Performance</h3>
      <p class="mb-4">Over time, laptops can get bogged down with unnecessary files and software. A quick fix can be running disk cleanup utilities and uninstalling unused programs. For a bigger boost, upgrading from a traditional hard drive (HDD) to a solid-state drive (SSD) can make an old laptop feel brand new.</p>
      <h3 class="text-xl font-semibold text-white mt-6 mb-2">2. Battery Won't Hold a Charge</h3>
      <p class="mb-4">Laptop batteries have a finite lifespan. If you find yourself constantly plugged in, it's time for a replacement. This is a straightforward repair that can restore your laptop's portability and convenience.</p>
      <h3 class="text-xl font-semibold text-white mt-6 mb-2">3. Overheating</h3>
      <p class="mb-4">Dust and debris can clog your laptop's cooling fans, causing it to overheat and throttle performance. A professional internal cleaning can resolve this, preventing long-term damage to your CPU and other components.</p>
      <h3 class="text-xl font-semibold text-white mt-6 mb-2">4. Wi-Fi Connectivity Issues</h3>
      <p class="mb-4">Can't connect to the internet? It could be a driver issue, a software conflict, or a failing Wi-Fi card. We can diagnose the root cause and get you back online quickly.</p>
      <h3 class="text-xl font-semibold text-white mt-6 mb-2">5. The Blue Screen of Death (BSOD)</h3>
      <p>This dreaded error can be caused by hardware failures, driver conflicts, or corrupt system files. It requires careful diagnostics to pinpoint the exact problem, but it's often fixable without needing a whole new machine.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/laptop/1200/800',
  },
];


@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private posts = signal<BlogPost[]>(MOCK_POSTS);

  getPosts() {
    return this.posts.asReadonly();
  }

  getPostBySlug(slug: string) {
    return this.posts().find(p => p.slug === slug);
  }

  addPost(post: BlogPost) {
    this.posts.update(posts => [...posts, post]);
  }

  updatePost(updatedPost: BlogPost) {
    this.posts.update(posts => 
      posts.map(post => post.slug === updatedPost.slug ? updatedPost : post)
    );
  }

  deletePost(slug: string) {
    this.posts.update(posts => posts.filter(post => post.slug !== slug));
  }
}