export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  publishDate: string;
  excerpt: string;
  content: string; // Will contain HTML
  imageUrl: string;
}
