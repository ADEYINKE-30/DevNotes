import { blogService } from "./blogService";
import { tutorialService } from "./tutorialService";
import type { SearchResult } from "../data/mockSearchData";

export const searchService = {
  async search(query: string): Promise<SearchResult[]> {
    if (!query.trim()) return [];

    const [posts, tutorials] = await Promise.all([
      blogService.getPosts({ search: query, limit: 20 }),
      tutorialService.getTutorials({ search: query, limit: 20 }),
    ]);

    return [
      ...posts.posts.map((post): SearchResult => ({
        id: post._id,
        title: post.title,
        description: post.description,
        url: `/blog/${post.slug}`,
        type: "blog",
        category: post.category,
      })),
      ...tutorials.tutorials.map((tutorial): SearchResult => ({
        id: tutorial._id,
        title: tutorial.title,
        description: tutorial.description,
        url: `/videos/${tutorial.slug}`,
        type: "video",
        category: tutorial.category,
      })),
    ];
  },

  async getAll(): Promise<SearchResult[]> {
    const [posts, tutorials] = await Promise.all([
      blogService.getPosts({ limit: 100 }),
      tutorialService.getTutorials({ limit: 100 }),
    ]);

    return [
      ...posts.posts.map((post): SearchResult => ({
        id: post._id,
        title: post.title,
        description: post.description,
        url: `/blog/${post.slug}`,
        type: "blog",
        category: post.category,
      })),
      ...tutorials.tutorials.map((tutorial): SearchResult => ({
        id: tutorial._id,
        title: tutorial.title,
        description: tutorial.description,
        url: `/videos/${tutorial.slug}`,
        type: "video",
        category: tutorial.category,
      })),
    ];
  },
};
