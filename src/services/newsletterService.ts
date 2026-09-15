import { apiClient } from './api';

export interface Subscriber {
  _id: string;
  email: string;
  name: string;
  subscribed: boolean;
  subscribedAt?: string;
  unsubscribedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface NewsletterResponse {
  success: boolean;
  message: string;
}

export const newsletterService = {
  /**
   * Subscribe to newsletter
   */
  async subscribe(email: string, name: string): Promise<NewsletterResponse> {
    try {
      const response = await apiClient.post<{ subscriber: Subscriber }>(
        '/newsletter/subscribe',
        { email, name }
      );

      if (response.success) {
        return {
          success: true,
          message: response.message || 'Successfully subscribed! Check your email for a confirmation.',
        };
      }

      return {
        success: false,
        message: response.message || 'Failed to subscribe',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to subscribe. Please try again.',
      };
    }
  },

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(email: string): Promise<NewsletterResponse> {
    try {
      const response = await apiClient.post<void>('/newsletter/unsubscribe', { email });

      if (response.success) {
        return {
          success: true,
          message: response.message || "You've been unsubscribed successfully.",
        };
      }

      return {
        success: false,
        message: response.message || 'Failed to unsubscribe',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to unsubscribe. Please try again.',
      };
    }
  },

  /**
   * Get subscription status (requires auth)
   */
  async getSubscriptionStatus(): Promise<{ subscribed: boolean; subscriber?: Subscriber }> {
    try {
      const response = await apiClient.get<{ subscribed: boolean; subscriber?: Subscriber }>(
        '/newsletter/status',
        true
      );

      if (response.success && response.data) {
        return response.data;
      }

      return { subscribed: false };
    } catch (error) {
      return { subscribed: false };
    }
  },

  /**
   * Get all subscribers (admin only)
   */
  async getSubscribers(params?: { page?: number; limit?: number }): Promise<{
    subscribers: Subscriber[];
    pagination: any;
  }> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const endpoint = `/admin/newsletter/subscribers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<Subscriber[]>(endpoint, true);

    if (response.success && response.data) {
      return {
        subscribers: response.data,
        pagination: response.pagination || { page: 1, limit: 10, total: 0, pages: 0 },
      };
    }

    throw new Error(response.message || 'Failed to fetch subscribers');
  },

  /**
   * Get active subscriber count (for stats)
   */
  async getActiveCount(): Promise<number> {
    try {
      const result = await this.getSubscribers({ page: 1, limit: 1 });
      return result.pagination?.total || 0;
    } catch {
      return 0;
    }
  },
};
