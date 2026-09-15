import { apiClient } from './api';

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  image?: string;
  thumbnail?: string;
  published: boolean;
  views?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const blogService = {
  /**
   * Get all blog posts with optional filters
   */
  async getPosts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: string;
  }): Promise<BlogPostsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const endpoint = `/posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<BlogPost[]>(endpoint);
    
    if (response.success && response.data) {
      return {
        posts: response.data,
        pagination: response.pagination || { page: 1, limit: 10, total: 0, pages: 0 },
      };
    }
    
    throw new Error(response.message || 'Failed to fetch blog posts');
  },

  /**
   * Get a single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await apiClient.get<BlogPost>(`/posts/${slug}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Blog post not found');
  },

  /**
   * Create a new blog post (admin only)
   */
  async createPost(postData: Partial<BlogPost>): Promise<BlogPost> {
    const response = await apiClient.post<BlogPost>('/posts', postData, true);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to create blog post');
  },

  /**
   * Update a blog post (admin only)
   */
  async updatePost(postId: string, postData: Partial<BlogPost>): Promise<BlogPost> {
    const response = await apiClient.put<BlogPost>(`/posts/${postId}`, postData, true);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to update blog post');
  },

  /**
   * Delete a blog post (admin only)
   */
  async deletePost(postId: string): Promise<void> {
    const response = await apiClient.delete<void>(`/posts/${postId}`, true);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete blog post');
    }
  },
};
