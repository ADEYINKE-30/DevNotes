import { apiClient } from "./api";
import type {
  BackendComment,
  BackendDiscussion,
  Comment,
  CommunityUser,
  CreateDiscussionData,
  Discussion,
  DiscussionListResponse,
  UpdateCommentData,
  UpdateDiscussionData,
} from "../types/community";

const normalizeDiscussion = (
  discussion: BackendDiscussion,
  fallbackCategory?: string,
): Discussion => ({
  _id: discussion.id,
  title: discussion.title,
  content: discussion.content,
  category: discussion.category ?? fallbackCategory,
  tags: discussion.tags ?? [],
  author: discussion.user,
  createdAt: discussion.createdAt,
  updatedAt: discussion.updatedAt,
  locked: discussion.locked,
  likesCount: discussion.likesCount,
  hasLiked: discussion.hasLiked,
  commentCount: discussion.commentCount,
});

const normalizeComment = (
  comment: BackendComment,
  fallbackAuthor?: CommunityUser,
): Comment => {
  const author = comment.user?._id ? comment.user : fallbackAuthor;
  if (!author) {
    throw new Error("Comment response did not include an author");
  }

  return {
    _id: comment.id || (comment as BackendComment & { _id?: string })._id || "",
    content: comment.content,
    author,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
};

export const communityService = {
  async getDiscussions(): Promise<Discussion[]> {
    const response = await apiClient.get<DiscussionListResponse>("/discussions");
    if (response.success && response.data) {
      return response.data.discussions.map((discussion) => normalizeDiscussion(discussion));
    }
    throw new Error(response.message || "Failed to fetch discussions");
  },

  async getDiscussion(discussionId: string): Promise<Discussion> {
    const response = await apiClient.get<BackendDiscussion>(`/discussions/${discussionId}`);
    if (response.success && response.data) {
      return normalizeDiscussion(response.data);
    }
    throw new Error(response.message || "Discussion not found");
  },

  async createDiscussion(data: CreateDiscussionData): Promise<Discussion> {
    const response = await apiClient.post<BackendDiscussion>("/discussions", data, true);
    if (response.success && response.data) {
      return normalizeDiscussion(response.data, data.category);
    }
    throw new Error(response.message || "Failed to create discussion");
  },

  async updateDiscussion(
    discussionId: string,
    data: UpdateDiscussionData,
  ): Promise<Discussion> {
    const response = await apiClient.patch<BackendDiscussion>(
      `/discussions/${discussionId}`,
      data,
      true,
    );
    if (response.success && response.data) {
      return normalizeDiscussion(response.data, data.category);
    }
    throw new Error(response.message || "Failed to update discussion");
  },

  async deleteDiscussion(discussionId: string): Promise<void> {
    const response = await apiClient.delete<void>(`/discussions/${discussionId}`, true);
    if (!response.success) {
      throw new Error(response.message || "Failed to delete discussion");
    }
  },

  async getComments(discussionId: string): Promise<Comment[]> {
    const response = await apiClient.get<BackendComment[]>(
      `/discussions/${discussionId}/comments`,
    );
    if (response.success && response.data) {
      return response.data.map((comment) => normalizeComment(comment));
    }
    throw new Error(response.message || "Failed to fetch comments");
  },

  async createComment(
    discussionId: string,
    content: string,
    fallbackAuthor: CommunityUser,
  ): Promise<Comment> {
    const response = await apiClient.post<BackendComment>(
      `/discussions/${discussionId}/comments`,
      { content },
      true,
    );
    if (response.success && response.data) {
      return normalizeComment(response.data, fallbackAuthor);
    }
    throw new Error(response.message || "Failed to create comment");
  },

  async updateComment(
    commentId: string,
    data: UpdateCommentData,
    fallbackAuthor?: CommunityUser,
  ): Promise<Comment> {
    if (!commentId || commentId.length !== 24) {
      throw new Error("Invalid comment ID");
    }
    const response = await apiClient.patch<BackendComment>(`/comments/${commentId}`, data, true);
    if (response.success && response.data) {
      return normalizeComment(response.data, fallbackAuthor);
    }
    throw new Error(response.message || "Failed to update comment");
  },

  async deleteComment(commentId: string): Promise<void> {
    if (!commentId || commentId.length !== 24) {
      throw new Error("Invalid comment ID");
    }
    const response = await apiClient.delete<void>(`/comments/${commentId}`, true);
    if (!response.success) {
      throw new Error(response.message || "Failed to delete comment");
    }
  },
};