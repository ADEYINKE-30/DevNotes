import { apiClient } from './api';

export interface Tutorial {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  duration: string;
  thumbnail: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Lesson {
  _id: string;
  tutorial: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
  content?: string;
  resources?: Array<{ title: string; url: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface TutorialProgress {
  _id: string;
  user: string;
  tutorial: string;
  completedLessons: string[];
  currentLesson?: string;
  progressPercentage: number;
  startedAt: string;
  lastWatchedAt: string;
  completedAt?: string;
}

export interface TutorialsResponse {
  tutorials: Tutorial[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const tutorialService = {
  /**
   * Get all tutorials with optional filters
   */
  async getTutorials(params?: {
    page?: number;
    limit?: number;
    category?: string;
    difficulty?: string;
    featured?: boolean;
    search?: string;
    sort?: string;
  }): Promise<TutorialsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const endpoint = `/tutorials${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<Tutorial[]>(endpoint);
    
    if (response.success && response.data) {
      return {
        tutorials: response.data,
        pagination: response.pagination || { page: 1, limit: 10, total: 0, pages: 0 },
      };
    }
    
    throw new Error(response.message || 'Failed to fetch tutorials');
  },

  /**
   * Get a single tutorial by slug
   */
  async getTutorialBySlug(slug: string): Promise<Tutorial> {
    const response = await apiClient.get<Tutorial>(`/tutorials/${slug}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Tutorial not found');
  },

  /**
   * Get lessons for a tutorial
   */
  async getLessons(tutorialId: string): Promise<Lesson[]> {
    const response = await apiClient.get<Lesson[]>(`/tutorials/${tutorialId}/lessons`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch lessons');
  },

  /**
   * Start a tutorial (requires auth)
   */
  async startTutorial(tutorialId: string): Promise<TutorialProgress> {
    const response = await apiClient.post<TutorialProgress>(
      `/tutorials/${tutorialId}/start`,
      {},
      true
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to start tutorial');
  },

  /**
   * Mark a lesson as complete (requires auth)
   */
  async completeLesson(tutorialId: string, lessonId: string): Promise<TutorialProgress> {
    const response = await apiClient.post<TutorialProgress>(
      `/tutorials/${tutorialId}/lessons/${lessonId}/complete`,
      {},
      true
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to mark lesson complete');
  },

  /**
   * Get tutorial progress (requires auth)
   */
  async getTutorialProgress(tutorialId: string): Promise<TutorialProgress | null> {
    try {
      const response = await apiClient.get<TutorialProgress>(
        `/tutorials/${tutorialId}/progress`,
        true
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      return null;
    } catch (error) {
      // Progress might not exist yet
      return null;
    }
  },

  /**
   * Get user's learning dashboard (requires auth)
   */
  async getLearningDashboard(): Promise<{
    tutorialsStarted: number;
    tutorialsCompleted: number;
    lessonsCompleted: number;
    inProgress: any[];
    recentTutorials: any[];
  }> {
    const response = await apiClient.get<{
      tutorialsStarted: number;
      tutorialsCompleted: number;
      lessonsCompleted: number;
      inProgress: any[];
      recentTutorials: any[];
    }>('/users/me/learning', true);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch learning dashboard');
  },
};
