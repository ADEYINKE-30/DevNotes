export interface LessonProgress {
  postId: string | number;
  title: string;
  category: string;
  readTime: string;
  progress: number; // 0-100
  lastAccessed: string;
  completed: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  todayActive: boolean;
  weeklyActivity: boolean[]; // last 7 days
}

export const mockProgress: LessonProgress[] = [
  {
    postId: 1,
    title: "Getting Started with React",
    category: "React",
    readTime: "5 min read",
    progress: 75,
    lastAccessed: "2026-07-10",
    completed: false,
  },
  {
    postId: 2,
    title: "Understanding TypeScript",
    category: "TypeScript",
    readTime: "7 min read",
    progress: 100,
    lastAccessed: "2026-07-09",
    completed: true,
  },
  {
    postId: 3,
    title: "Styling with Tailwind CSS",
    category: "Tailwind CSS",
    readTime: "6 min read",
    progress: 30,
    lastAccessed: "2026-07-08",
    completed: false,
  },
  {
    postId: 4,
    title: "Understanding Flexbox",
    category: "CSS",
    readTime: "4 min read",
    progress: 100,
    lastAccessed: "2026-07-07",
    completed: true,
  },
  {
    postId: 5,
    title: "JavaScript Array Methods",
    category: "JavaScript",
    readTime: "6 min read",
    progress: 0,
    lastAccessed: "2026-07-06",
    completed: false,
  },
  {
    postId: 6,
    title: "React Hooks Explained",
    category: "React",
    readTime: "8 min read",
    progress: 50,
    lastAccessed: "2026-07-05",
    completed: false,
  },
];

export const mockStreak: StreakData = {
  currentStreak: 3,
  longestStreak: 7,
  totalDays: 15,
  todayActive: true,
  weeklyActivity: [true, true, true, false, true, false, true],
};