export interface StoredBookmark {
  postId: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  image?: string;
  createdAt: string;
}

const getStorageKey = (userId: string) => `devnotes:bookmarks:${userId}`;

export const bookmarkService = {
  getAll(userId: string): StoredBookmark[] {
    try {
      const stored = localStorage.getItem(getStorageKey(userId));
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  has(userId: string, postId: string): boolean {
    return this.getAll(userId).some((bookmark) => bookmark.postId === postId);
  },

  toggle(userId: string, bookmark: StoredBookmark): boolean {
    const bookmarks = this.getAll(userId);
    const existingIndex = bookmarks.findIndex((item) => item.postId === bookmark.postId);

    if (existingIndex >= 0) {
      bookmarks.splice(existingIndex, 1);
      localStorage.setItem(getStorageKey(userId), JSON.stringify(bookmarks));
      return false;
    }

    localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify([{ ...bookmark, createdAt: new Date().toISOString() }, ...bookmarks]),
    );
    return true;
  },

  remove(userId: string, postId: string): void {
    const bookmarks = this.getAll(userId).filter((bookmark) => bookmark.postId !== postId);
    localStorage.setItem(getStorageKey(userId), JSON.stringify(bookmarks));
  },
};