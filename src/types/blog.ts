export interface BlogPost {
  _id?: string;
  id?: string | number; // Alias for _id for compatibility
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  thumbnail?: string;
  image?: string; // Alias for thumbnail for compatibility
  published?: boolean;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  date?: string;
}