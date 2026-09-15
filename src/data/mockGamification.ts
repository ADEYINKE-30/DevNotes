export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface XPEntry {
  userId: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  badges: Badge[];
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

export interface WeeklyGoal {
  id: string;
  title: string;
  progress: number;
  target: number;
  xpReward: number;
}

export const mockBadges: Badge[] = [
  { id: "badge-1", name: "First Steps", description: "Complete your first lesson", icon: "🌟", unlockedAt: "2026-07-01" },
  { id: "badge-2", name: "React Rookie", description: "Complete the React quiz", icon: "⚛️", unlockedAt: "2026-07-03" },
  { id: "badge-3", name: "TypeScript Fan", description: "Complete the TypeScript quiz", icon: "📘", unlockedAt: "2026-07-05" },
  { id: "badge-4", name: "Streak Master", description: "Maintain a 7-day streak", icon: "🔥" },
  { id: "badge-5", name: "Video Learner", description: "Watch 5 video tutorials", icon: "🎬", unlockedAt: "2026-07-08" },
  { id: "badge-6", name: "Quiz Champion", description: "Score 100% on any quiz", icon: "🏆" },
  { id: "badge-7", name: "Community Member", description: "Post your first comment", icon: "💬" },
  { id: "badge-8", name: "Knowledge Seeker", description: "Read 10 blog articles", icon: "📚", unlockedAt: "2026-07-10" },
];

export const mockXPData: XPEntry[] = [
  {
    userId: "user-1",
    username: "Adepoju Adeyinka",
    avatar: "👨‍💻",
    xp: 2450,
    level: 12,
    badges: [mockBadges[0], mockBadges[1], mockBadges[2], mockBadges[4], mockBadges[7]],
  },
  {
    userId: "user-2",
    username: "JaneDev",
    avatar: "👩‍💻",
    xp: 1890,
    level: 9,
    badges: [mockBadges[0], mockBadges[1], mockBadges[3]],
  },
  {
    userId: "user-3",
    username: "CodeNinja",
    avatar: "🥷",
    xp: 3200,
    level: 15,
    badges: [mockBadges[0], mockBadges[1], mockBadges[2], mockBadges[4], mockBadges[5]],
  },
  {
    userId: "user-4",
    username: "WebWizard",
    avatar: "🧙",
    xp: 1500,
    level: 7,
    badges: [mockBadges[0], mockBadges[1]],
  },
  {
    userId: "user-5",
    username: "CSSQueen",
    avatar: "👸",
    xp: 2800,
    level: 13,
    badges: [mockBadges[0], mockBadges[2], mockBadges[4], mockBadges[7]],
  },
];

export const mockDailyChallenges: DailyChallenge[] = [
  { id: "dc-1", title: "Read an Article", description: "Read any blog article today", xpReward: 50, completed: true },
  { id: "dc-2", title: "Watch a Video", description: "Watch one video tutorial", xpReward: 75, completed: false },
  { id: "dc-3", title: "Complete a Quiz", description: "Take any quiz and score 60%+", xpReward: 100, completed: false },
];

export const mockWeeklyGoals: WeeklyGoal[] = [
  { id: "wg-1", title: "Read 5 Articles", progress: 3, target: 5, xpReward: 200 },
  { id: "wg-2", title: "Watch 3 Videos", progress: 1, target: 3, xpReward: 150 },
  { id: "wg-3", title: "Complete 2 Quizzes", progress: 1, target: 2, xpReward: 250 },
  { id: "wg-4", title: "7-Day Streak", progress: 4, target: 7, xpReward: 500 },
];
