export interface CommunityUser {
  _id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface BackendDiscussion {
  id: string;
  user: CommunityUser;
  title: string;
  content: string;
  tags: string[];
  locked: boolean;
  likesCount: number;
  hasLiked: boolean;
  createdAt: string;
  updatedAt: string;
  category?: string;
  commentCount?: number;
}

export interface Discussion {
  _id: string;
  title: string;
  content: string;
  category?: string;
  tags: string[];
  author: CommunityUser;
  createdAt: string;
  updatedAt: string;
  locked: boolean;
  likesCount: number;
  hasLiked: boolean;
  commentCount?: number;
}

export interface DiscussionListResponse {
  discussions: BackendDiscussion[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Comment {
  _id: string;
  content: string;
  author: CommunityUser;
  createdAt: string;
  updatedAt: string;
}

export interface BackendComment {
  id: string;
  user: CommunityUser;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiscussionData {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface UpdateDiscussionData {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
}

export interface UpdateCommentData {
  content: string;
}