import { apiClient } from './api';

export interface QuizQuestion {
  _id: string;
  quiz: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer?: string; // Only visible after submission
  explanation: string;
  points: number;
  order: number;
}

export interface Quiz {
  _id: string;
  tutorial: string | any;
  title: string;
  description: string;
  passingScore: number;
  timeLimit?: number;
  published: boolean;
  questions?: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface QuizAttempt {
  _id: string;
  user: string;
  quiz: string;
  answers: Array<{
    question: string;
    answer: string;
    isCorrect: boolean;
    pointsEarned: number;
  }>;
  score: number;
  percentage: number;
  passed: boolean;
  startedAt: string;
  submittedAt: string;
}

export interface QuizStartResponse {
  attemptId: string;
  attempt?: QuizAttempt;
  quiz?: Quiz;
  startedAt?: string;
}

export interface QuizResult {
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  answers?: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }>;
}

export interface QuizzesResponse {
  quizzes: Quiz[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const quizService = {
    async createQuiz(data: {
      tutorial: string;
      title: string;
      description: string;
      passingScore: number;
      timeLimit: number;
      published: boolean;
    }): Promise<Quiz> {
      const response = await apiClient.post<Quiz>("/quizzes", data, true);
      if (response.success && response.data) return response.data;
      throw new Error(response.message || "Failed to create quiz");
    },

    async createQuestion(
      quizId: string,
      data: {
        question: string;
        type: QuizQuestion["type"];
        options: string[];
        correctAnswer: string;
        explanation: string;
        points: number;
        order: number;
      },
    ): Promise<QuizQuestion> {
      const response = await apiClient.post<QuizQuestion>(
        `/quizzes/${quizId}/questions`,
        data,
        true,
      );
      if (response.success && response.data) return response.data;
      throw new Error(response.message || "Failed to create quiz question");
    },
  /**
   * Get all quizzes with optional filters
   */
  async getQuizzes(params?: {
    page?: number;
    limit?: number;
    tutorial?: string;
    search?: string;
  }): Promise<QuizzesResponse> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const endpoint = `/quizzes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await apiClient.get<Quiz[]>(endpoint);
    
    if (response.success && response.data) {
      return {
        quizzes: response.data,
        pagination: response.pagination || { page: 1, limit: 10, total: 0, pages: 0 },
      };
    }
    
    throw new Error(response.message || 'Failed to fetch quizzes');
  },

  /**
   * Get a single quiz by ID
   */
  async getQuizById(quizId: string): Promise<Quiz> {
    const response = await apiClient.get<Quiz>(`/quizzes/${quizId}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Quiz not found');
  },

  /**
   * Get questions for a quiz
   */
  async getQuizQuestions(quizId: string): Promise<QuizQuestion[]> {
    const response = await apiClient.get<QuizQuestion[]>(`/quizzes/${quizId}/questions`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch questions');
  },

  /**
   * Start a quiz attempt (requires auth)
   */
  async startQuiz(quizId: string): Promise<QuizStartResponse> {
    const response = await apiClient.post<any>(
      `/quizzes/${quizId}/start`,
      {},
      true
    );
    
    if (response.success && response.data) {
      const data = response.data as {
        attempt?: QuizAttempt;
        attemptId?: string;
        quiz?: Quiz;
        startedAt?: string;
        _id?: string;
      };
      const attemptId = data.attemptId || data.attempt?._id || data._id;

      if (!attemptId) {
        throw new Error('Quiz start response did not include an attempt ID');
      }

      return {
        attemptId,
        attempt: data.attempt,
        quiz: data.quiz,
        startedAt: data.startedAt,
      };
    }
    
    throw new Error(response.message || 'Failed to start quiz');
  },

  /**
   * Submit quiz answers (requires auth)
   */
  async submitQuiz(
    quizId: string,
    attemptId: string,
    answers: Array<{ question: string; answer: string }>
  ): Promise<QuizResult> {
    const response = await apiClient.post<QuizResult>(
      `/quizzes/${quizId}/submit`,
      { attemptId, answers },
      true
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to submit quiz');
  },

  /**
   * Get quiz results (requires auth)
   */
  async getQuizResults(quizId: string): Promise<QuizAttempt[]> {
    const response = await apiClient.get<QuizAttempt[]>(
      `/quizzes/${quizId}/results`,
      true
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch quiz results');
  },

  /**
   * Get user's quiz history (requires auth)
   */
  async getQuizHistory(): Promise<{ attempts: QuizAttempt[] }> {
    const response = await apiClient.get<{ attempts: QuizAttempt[] }>(
      '/users/me/quizzes',
      true
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch quiz history');
  },
};
