export interface Bookmark {
  postId: number;
  userId: string;
  createdAt: string;
}

export interface Like {
  postId: number;
  userId: string;
}

export const mockBookmarks: Bookmark[] = [
  { postId: 1, userId: "user@test.com", createdAt: "2026-07-10" },
  { postId: 3, userId: "user@test.com", createdAt: "2026-07-08" },
  { postId: 5, userId: "user@test.com", createdAt: "2026-07-06" },
];

export const mockLikes: Like[] = [
  { postId: 1, userId: "user@test.com" },
  { postId: 2, userId: "user@test.com" },
  { postId: 4, userId: "user@test.com" },
];