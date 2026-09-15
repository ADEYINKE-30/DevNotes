export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "blog" | "video" | "page";
  category?: string;
}

export const mockSearchData: SearchResult[] = [
  {
    id: "search-1",
    title: "Getting Started with React",
    description: "Learn the fundamentals of React including components, JSX, and props.",
    url: "/blog/getting-started-with-react",
    type: "blog",
    category: "React",
  },
  {
    id: "search-2",
    title: "TypeScript Basics: A Beginner's Guide",
    description: "Introduction to TypeScript, types, interfaces, and how to use it with React.",
    url: "/blog/typescript-basics",
    type: "blog",
    category: "TypeScript",
  },
  {
    id: "search-3",
    title: "Tailwind CSS: Utility-First Styling",
    description: "Master Tailwind CSS with utility classes for rapid UI development.",
    url: "/blog/tailwind-css-utility-first",
    type: "blog",
    category: "CSS",
  },
  {
    id: "search-4",
    title: "Understanding JavaScript Closures",
    description: "Deep dive into closures, scope, and lexical environment in JavaScript.",
    url: "/blog/javascript-closures",
    type: "blog",
    category: "JavaScript",
  },
  {
    id: "search-5",
    title: "CSS Grid Layout Masterclass",
    description: "Complete guide to CSS Grid for building complex layouts easily.",
    url: "/blog/css-grid-layout",
    type: "blog",
    category: "CSS",
  },
  {
    id: "search-6",
    title: "React Fundamentals - Components & Props",
    description: "Learn the core concepts of React components and how to pass data with props.",
    url: "/videos/vid-1",
    type: "video",
    category: "React",
  },
  {
    id: "search-7",
    title: "React Hooks - useState & useEffect Deep Dive",
    description: "Master the most important React hooks with practical examples.",
    url: "/videos/vid-2",
    type: "video",
    category: "React",
  },
  {
    id: "search-8",
    title: "TypeScript for Beginners",
    description: "Get started with TypeScript and learn type annotations, interfaces, and more.",
    url: "/videos/vid-3",
    type: "video",
    category: "TypeScript",
  },
  {
    id: "search-9",
    title: "Tailwind CSS - Build a Responsive Layout",
    description: "Learn how to build beautiful responsive layouts using Tailwind CSS.",
    url: "/videos/vid-4",
    type: "video",
    category: "CSS",
  },
  {
    id: "search-10",
    title: "JavaScript Array Methods Explained",
    description: "Master map, filter, reduce, and other essential array methods.",
    url: "/videos/vid-5",
    type: "video",
    category: "JavaScript",
  },
  {
    id: "search-11",
    title: "About DevNotes",
    description: "Learn more about DevNotes and our mission to teach web development.",
    url: "/about",
    type: "page",
  },
  {
    id: "search-12",
    title: "Contact Us",
    description: "Get in touch with the DevNotes team.",
    url: "/contact",
    type: "page",
  },
];
