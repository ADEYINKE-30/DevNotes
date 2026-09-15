import { apiClient } from './api';

export interface Notification {
  _id: string;
  user: string;
  type: 'announcement' | 'new_post' | 'new_tutorial' | 'quiz_result' | 'achievement';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  tutorialNotifications: boolean;
  quizNotifications: boolean;
  systemNotifications: boolean;
  newsletterNotifications: boolean;
}

export const notificationService = {
  /**
   * Get user notifications (requires auth)
   */
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    read?: boolean;
  }): Promise<{ notifications: Notification[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const endpoint = `/notifications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<Notification[]>(endpoint, true);
    
    if (response.success && response.data) {
      return {
        notifications: response.data,
        pagination: response.pagination || { page: 1, limit: 10, total: 0, pages: 0 },
      };
    }
    
    throw new Error(response.message || 'Failed to fetch notifications');
  },

  /**
   * Get unread notification count (requires auth)
   */
  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<{ count: number }>('/notifications/unread-count', true);
    
    if (response.success && response.data) {
      return response.data.count;
    }
    
    return 0;
  },

  /**
   * Mark notification as read (requires auth)
   */
  async markAsRead(notificationId: string): Promise<Notification> {
    const response = await apiClient.patch<Notification>(
      `/notifications/${notificationId}/read`,
      {},
      true
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to mark notification as read');
  },

  /**
   * Mark all notifications as read (requires auth)
   */
  async markAllAsRead(): Promise<void> {
    const response = await apiClient.patch<void>('/notifications/read-all', {}, true);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to mark all notifications as read');
    }
  },

  /**
   * Delete a notification (requires auth)
   */
  async deleteNotification(notificationId: string): Promise<void> {
    const response = await apiClient.delete<void>(`/notifications/${notificationId}`, true);
    
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete notification');
    }
  },

  /**
   * Get notification preferences (requires auth)
   */
  async getPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.get<NotificationPreferences>(
      '/users/me/notification-preferences',
      true
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch notification preferences');
  },

  /**
   * Update notification preferences (requires auth)
   */
  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const response = await apiClient.put<NotificationPreferences>(
      '/users/me/notification-preferences',
      preferences,
      true
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to update notification preferences');
  },
};
