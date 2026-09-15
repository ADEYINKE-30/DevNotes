export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  articleId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  total: number;
  date: string;
  answers: number[];
}

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    articleId: "getting-started-with-react",
    title: "React Fundamentals",
    questions: [
      {
        id: "q1",
        question: "What is React?",
        options: [
          "A backend framework",
          "A JavaScript library for building user interfaces",
          "A database management system",
          "A CSS preprocessor",
        ],
        correctAnswer: 1,
        explanation:
          "React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications.",
      },
      {
        id: "q2",
        question: "What is JSX?",
        options: [
          "A type of database query",
          "A syntax extension for JavaScript that looks like HTML",
          "A CSS framework",
          "A build tool",
        ],
        correctAnswer: 1,
        explanation:
          "JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It is used with React to describe UI components.",
      },
      {
        id: "q3",
        question: "What is a React component?",
        options: [
          "A CSS class",
          "A reusable piece of UI",
          "A JavaScript variable",
          "An HTML element only",
        ],
        correctAnswer: 1,
        explanation:
          "A React component is a reusable, self-contained piece of UI that can accept inputs (props) and returns React elements describing what should appear on the screen.",
      },
      {
        id: "q4",
        question: "What hook is used to manage state in a functional component?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation:
          "useState is the React hook used to add state management to functional components. It returns a state variable and a setter function.",
      },
      {
        id: "q5",
        question: "What does the useEffect hook do?",
        options: [
          "Manages component styling",
          "Performs side effects in functional components",
          "Creates new components",
          "Handles routing",
        ],
        correctAnswer: 1,
        explanation:
          "useEffect allows you to perform side effects in functional components, such as fetching data, subscribing to events, or manually changing the DOM.",
      },
    ],
  },
  {
    id: "quiz-2",
    articleId: "typescript-basics",
    title: "TypeScript Basics",
    questions: [
      {
        id: "q6",
        question: "What is TypeScript?",
        options: [
          "A CSS framework",
          "A typed superset of JavaScript",
          "A database language",
          "A version of HTML",
        ],
        correctAnswer: 1,
        explanation:
          "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and other features.",
      },
      {
        id: "q7",
        question: "How do you define an interface in TypeScript?",
        options: [
          "interface Person { name: string; }",
          "class Person { name: string; }",
          "type Person = { name: string; }",
          "object Person { name: string; }",
        ],
        correctAnswer: 0,
        explanation:
          "The `interface` keyword is used to define the shape of an object in TypeScript. It describes the properties and their types.",
      },
      {
        id: "q8",
        question: "What does the `any` type do?",
        options: [
          "Disables type checking for a variable",
          "Creates a new type",
          "Makes a variable optional",
          "Converts a value to a string",
        ],
        correctAnswer: 0,
        explanation:
          "The `any` type disables type checking for a variable, allowing it to hold any value. It should be used sparingly as it defeats the purpose of TypeScript.",
      },
    ],
  },
  {
    id: "quiz-3",
    articleId: "tailwind-css-utility-first",
    title: "Tailwind CSS",
    questions: [
      {
        id: "q9",
        question: "What is Tailwind CSS?",
        options: [
          "A JavaScript framework",
          "A utility-first CSS framework",
          "A database tool",
          "A React component library",
        ],
        correctAnswer: 1,
        explanation:
          "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML.",
      },
      {
        id: "q10",
        question: "How do you add padding in Tailwind?",
        options: ["padding: 4px", "p-4", "pad-4", "spacing-4"],
        correctAnswer: 1,
        explanation:
          "In Tailwind, `p-4` adds padding of 1rem (16px) to all sides. The `p` stands for padding and the number represents the scale value.",
      },
    ],
  },
];

export const mockQuizHistory: QuizAttempt[] = [
  {
    id: "attempt-1",
    quizId: "quiz-1",
    score: 4,
    total: 5,
    date: "2026-07-10T14:30:00Z",
    answers: [1, 1, 1, 1, 0],
  },
  {
    id: "attempt-2",
    quizId: "quiz-2",
    score: 2,
    total: 3,
    date: "2026-07-11T09:15:00Z",
    answers: [1, 0, 0],
  },
];
