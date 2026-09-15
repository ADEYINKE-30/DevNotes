export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  category: string;
  tags: string[];
  comments: Comment[];
  reactions: Reaction[];
  viewCount: number;
  isPinned: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  reactions: Reaction[];
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Thread {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  category: string;
  createdAt: string;
  replyCount: number;
  postIds: string[];
}

export const mockThreads: Thread[] = [
  {
    id: "post-1",
    title: "Tips for learning React as a beginner?",
    description: "Discussion about React learning resources and tips for beginners.",
    author: "JaneDev",
    authorAvatar: "👩‍💻",
    category: "React",
    createdAt: "2026-07-11",
    replyCount: 2,
    postIds: ["post-1"],
  },
  {
    id: "post-2",
    title: "TypeScript vs JavaScript for new projects",
    description: "Debating whether to use TypeScript from the start on new projects.",
    author: "WebWizard",
    authorAvatar: "🧙",
    category: "TypeScript",
    createdAt: "2026-07-10",
    replyCount: 1,
    postIds: ["post-2"],
  },
  {
    id: "post-3",
    title: "Showcase: My first Tailwind CSS project!",
    description: "A showcase of a landing page built entirely with Tailwind CSS utility classes.",
    author: "CSSQueen",
    authorAvatar: "👸",
    category: "CSS",
    createdAt: "2026-07-09",
    replyCount: 0,
    postIds: ["post-3"],
  },
  {
    id: "post-4",
    title: "Best resources for learning JavaScript closures?",
    description: "Seeking recommendations for tutorials on understanding closures.",
    author: "CodeNinja",
    authorAvatar: "🥷",
    category: "JavaScript",
    createdAt: "2026-07-08",
    replyCount: 1,
    postIds: ["post-4"],
  },
];

export const mockForumPosts: ForumPost[] = [
  {
    id: "post-1",
    title: "Tips for learning React as a beginner?",
    content: "I just started learning React and I'm finding the hooks concept a bit confusing. Does anyone have tips or resources that helped them understand useState and useEffect better?",
    author: "JaneDev",
    authorAvatar: "👩‍💻",
    createdAt: "2026-07-11T10:30:00Z",
    category: "React",
    tags: ["react", "beginners", "hooks"],
    comments: [
      {
        id: "c1",
        content: "Start with class components first to understand lifecycle, then move to hooks. The official React docs are great!",
        author: "CodeNinja",
        authorAvatar: "🥷",
        createdAt: "2026-07-11T11:00:00Z",
        reactions: [{ emoji: "👍", count: 5, users: ["user-1", "user-3"] }],
      },
      {
        id: "c2",
        content: "I recommend building a simple todo app. It covers both useState and useEffect in practice.",
        author: "WebWizard",
        authorAvatar: "🧙",
        createdAt: "2026-07-11T12:15:00Z",
        reactions: [{ emoji: "👍", count: 3, users: ["user-2"] }, { emoji: "❤️", count: 1, users: ["user-1"] }],
      },
    ],
    reactions: [
      { emoji: "👍", count: 12, users: ["user-1", "user-2", "user-3"] },
      { emoji: "❤️", count: 7, users: ["user-1", "user-4"] },
      { emoji: "🚀", count: 3, users: ["user-3"] },
    ],
    viewCount: 234,
    isPinned: true,
  },
  {
    id: "post-2",
    title: "TypeScript vs JavaScript for new projects",
    content: "I'm starting a new project and wondering if I should use TypeScript from the start. What are the pros and cons?",
    author: "WebWizard",
    authorAvatar: "🧙",
    createdAt: "2026-07-10T14:20:00Z",
    category: "TypeScript",
    tags: ["typescript", "javascript", "discussion"],
    comments: [
      {
        id: "c3",
        content: "Always use TypeScript! It catches errors early and makes refactoring so much easier.",
        author: "Adepoju Adeyinka",
        authorAvatar: "👨‍💻",
        createdAt: "2026-07-10T15:00:00Z",
        reactions: [{ emoji: "👍", count: 8, users: ["user-2", "user-3"] }],
      },
    ],
    reactions: [
      { emoji: "👍", count: 15, users: ["user-1", "user-3", "user-5"] },
      { emoji: "🤔", count: 4, users: ["user-4"] },
    ],
    viewCount: 189,
    isPinned: false,
  },
  {
    id: "post-3",
    title: "Showcase: My first Tailwind CSS project!",
    content: "I built a landing page using only Tailwind CSS utility classes. No custom CSS needed! Here's what I learned...",
    author: "CSSQueen",
    authorAvatar: "👸",
    createdAt: "2026-07-09T09:00:00Z",
    category: "CSS",
    tags: ["tailwind", "showcase", "css"],
    comments: [],
    reactions: [
      { emoji: "🎉", count: 20, users: ["user-1", "user-2", "user-3", "user-4"] },
      { emoji: "🔥", count: 10, users: ["user-1", "user-5"] },
    ],
    viewCount: 345,
    isPinned: false,
  },
  {
    id: "post-4",
    title: "Best resources for learning JavaScript closures?",
    content: "Closures are really confusing to me. Can anyone recommend good tutorials or explanations?",
    author: "CodeNinja",
    authorAvatar: "🥷",
    createdAt: "2026-07-08T16:45:00Z",
    category: "JavaScript",
    tags: ["javascript", "closures", "learning"],
    comments: [
      {
        id: "c4",
        content: "Watch the 'JavaScript Array Methods Explained' video on this site - it helped me understand scope and closures!",
        author: "JaneDev",
        authorAvatar: "👩‍💻",
        createdAt: "2026-07-08T17:30:00Z",
        reactions: [{ emoji: "👍", count: 4, users: ["user-1"] }],
      },
    ],
    reactions: [
      { emoji: "👍", count: 8, users: ["user-1", "user-2"] },
    ],
    viewCount: 156,
    isPinned: false,
  },
];

export const mockCommunityPosts: ForumPost[] = [...mockForumPosts];

export const forumCategories = ["React", "TypeScript", "CSS", "JavaScript", "General", "Showcase"];