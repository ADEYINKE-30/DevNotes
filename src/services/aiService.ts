import { apiClient } from "./api";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface AISuggestion {
  id: string;
  text: string;
  category: string;
}

// Comprehensive knowledge covering Frontend, Backend, DevOps, Languages, Databases, and more
const knowledgeBase: Record<string, string> = {
  // === Frontend Frameworks & Libraries ===
  react:
    "React is a JavaScript library for building user interfaces, developed by Meta. It uses a component-based architecture where you build reusable UI pieces. Key concepts include JSX (JavaScript XML), props for passing data, state for managing component data, and hooks like useState, useEffect, useContext, useReducer, and custom hooks. React uses a virtual DOM for efficient rendering and supports server-side rendering with Next.js. It's one of the most popular frontend frameworks.",
  angular:
    "Angular is a TypeScript-based web application framework developed by Google. It uses a component-based architecture with modules, services, dependency injection, and routing built-in. Key features include two-way data binding, RxJS for reactive programming, directives (ngFor, ngIf), pipes for data transformation, and a powerful CLI. Angular is ideal for large-scale enterprise applications.",
  vue:
    "Vue.js is a progressive JavaScript framework for building UIs. It uses a reactive data system and component-based architecture. Key features include the Composition API, single-file components (SFCs) with template/script/style, directives (v-if, v-for, v-bind, v-model), computed properties, watchers, and Vue Router for SPA routing. Vue is known for its gentle learning curve and flexibility.",
  svelte:
    "Svelte is a radical JavaScript compiler that shifts the work from the browser to compile time. Instead of using a virtual DOM, Svelte compiles your components into efficient imperative code that directly manipulates the DOM. Key features include reactive declarations ($:), stores for state management, and built-in animations. It produces smaller bundle sizes and has excellent performance.",
  nextjs:
    "Next.js is a React framework for production-grade applications. It provides server-side rendering (SSR), static site generation (SSG), API routes, file-based routing, image optimization, and middleware. It supports both Pages Router and App Router. Next.js is developed by Vercel and is ideal for SEO-friendly, performant web applications.",
  "next.js": "Next.js is a React framework for production-grade applications. It provides server-side rendering (SSR), static site generation (SSG), API routes, file-based routing, image optimization, and middleware. It supports both Pages Router and App Router. Next.js is developed by Vercel and is ideal for SEO-friendly, performant web applications.",
  nuxt: "Nuxt.js is a Vue framework that provides server-side rendering, static site generation, file-based routing, and auto-imports. It supports both Vue 3 and the Composition API. Nuxt 3 uses Nitro for the server engine, providing excellent performance and flexibility for building universal Vue applications.",
  gatsby: "Gatsby is a React-based static site generator that uses GraphQL for data layer. It excels at building blazing-fast websites with features like image optimization, progressive web app support, and a rich plugin ecosystem. It's particularly popular for content-heavy sites like blogs and documentation.",
  flutter:
    "Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. It uses the Dart language and provides a rich set of pre-built Material Design and Cupertino widgets. Flutter uses its own rendering engine (Skia) for high-performance, consistent UIs across platforms.",

  // === HTML ===
  html: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It uses tags to structure content: headings (<h1>-<h6>), paragraphs (<p>), links (<a>), images (<img>), lists (<ul>, <ol>, <li>), tables (<table>, <tr>, <td>), forms (<form>, <input>, <button>, <select>, <textarea>), semantic elements (<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>), and media elements (<video>, <audio>). HTML5 introduced APIs like Canvas, Geolocation, Local Storage, and Drag & Drop.",
  html5: "HTML5 is the latest version of HTML with new semantic elements (<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>), multimedia support (<video>, <audio>), form enhancements (date, email, url, range inputs), Canvas for 2D graphics, SVG for vector graphics, Geolocation API, Web Storage (localStorage, sessionStorage), Web Workers for background tasks, and the Drag & Drop API.",
  "html5 api": "HTML5 APIs include Canvas for 2D drawing, Geolocation for device location, Web Storage (localStorage/sessionStorage) for client-side data, Web Workers for background threads, WebSockets for real-time communication, History API for SPA navigation, Drag & Drop for interactive UIs, and the File API for file handling in the browser.",
  canvas: "The HTML5 Canvas element allows dynamic, scriptable rendering of 2D shapes, text, and images. You can draw paths, rectangles, circles, gradients, patterns, and text. Canvas is widely used for games, data visualization, image editing, and animations in the browser.",
  svg: "SVG (Scalable Vector Graphics) is an XML-based vector image format for 2D graphics. Unlike Canvas, SVG elements are part of the DOM and can be styled with CSS and manipulated with JavaScript. SVG is resolution-independent and ideal for icons, logos, charts, and illustrations.",
  dom: "The DOM (Document Object Model) is a programming interface for HTML and XML documents. It represents the page as a tree of nodes that can be manipulated with JavaScript. Key operations include selecting elements (getElementById, querySelector), modifying content (innerHTML, textContent), changing styles, adding/removing classes, and handling events (addEventListener).",
  "dom manipulation": "DOM manipulation involves selecting elements (getElementById, querySelector, querySelectorAll), traversing the DOM (parentNode, children, nextSibling), modifying content (innerHTML, textContent, innerText), changing attributes (setAttribute, getAttribute), manipulating styles (style property, classList), creating/removing elements (createElement, appendChild, removeChild), and handling events (addEventListener, event delegation).",

  // === CSS & Styling ===
  tailwind:
    "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes. Instead of writing custom CSS, you compose designs using classes like `flex`, `pt-4`, `text-center`, `bg-blue-500`, and `hover:shadow-lg`. It features a customizable design system with configuration in tailwind.config.js, responsive breakpoints, dark mode support, and JIT (Just-In-Time) compilation for optimal production builds.",
  css: "CSS (Cascading Style Sheets) controls the visual presentation of web pages. Modern CSS includes Flexbox for one-dimensional layouts, CSS Grid for two-dimensional layouts, custom properties (variables) for theming, animations and transitions for motion, media queries for responsive design, and features like container queries, cascade layers (@layer), and the :has() selector.",
  sass: "Sass (Syntactically Awesome Style Sheets) is a CSS preprocessor that adds features like variables, nesting, mixins, functions, and partials. It uses .scss syntax (similar to CSS) or .sass (indented syntax). Sass helps keep stylesheets organized and DRY, and compiles to standard CSS.",
  bootstrap: "Bootstrap is a popular CSS framework developed by Twitter. It provides a responsive grid system, pre-built components (navbars, cards, modals, forms), utility classes, and JavaScript plugins. Bootstrap 5 uses CSS custom properties and removes jQuery dependency for a modern approach to web styling.",

  // === JavaScript / TypeScript ===
  javascript:
    "JavaScript is a versatile, high-level programming language that runs in browsers and on servers via Node.js. Modern ES6+ features include arrow functions, destructuring, spread/rest operators, template literals, modules (import/export), Promises and async/await, classes, Map/Set data structures, and optional chaining (?.) and nullish coalescing (??). JavaScript is the language of the web.",
  typescript:
    "TypeScript is a typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript. It adds static typing with interfaces, type aliases, generics, enums, union/intersection types, decorators, and utility types (Partial, Pick, Omit, Record). TypeScript catches errors at compile time, provides better IDE support, and is widely used in large-scale applications.",
  jsx: "JSX (JavaScript XML) is a syntax extension for JavaScript that looks like HTML. It's used by React to describe what the UI should look like. JSX allows you to write HTML-like code directly in JavaScript, which then gets compiled to React.createElement calls. Expressions can be embedded with curly braces {}.",
  node: "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on the server. It uses an event-driven, non-blocking I/O model making it efficient for real-time applications. Key features include the npm ecosystem, the CommonJS module system, the EventEmitter pattern, streams, and the libuv library handling asynchronous I/O.",
  "node.js": "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on the server. It uses an event-driven, non-blocking I/O model making it efficient for real-time applications. Key features include the npm ecosystem, the CommonJS module system, the EventEmitter pattern, streams, and the libuv library handling asynchronous I/O.",
  deno: "Deno is a secure JavaScript and TypeScript runtime created by the original Node.js creator, Ryan Dahl. It supports TypeScript natively, has a secure-by-default permission system, uses ES modules (import from URLs), and includes built-in tools like a formatter, linter, and test runner. It aims to improve on Node.js design limitations.",
  bun: "Bun is an all-in-one JavaScript runtime and toolkit designed for speed. It includes a built-in bundler, transpiler, package manager (bun install), and test runner. Bun uses WebKit's JavaScriptCore engine and is written in Zig, providing significantly faster startup times and execution compared to Node.js.",

  // === Backend Frameworks (Node.js) ===
  express: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It offers middleware for request processing, routing, template engine integration, and HTTP utility methods. Express is the de facto standard server framework for Node.js.",
  nestjs: "NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript by default and incorporates concepts from Angular (modules, decorators, dependency injection). It supports multiple transport layers (HTTP, WebSockets, gRPC) and integrates well with databases via TypeORM or Prisma.",
  fastify: "Fastify is a fast and low-overhead Node.js web framework focused on performance. It features schema-based validation (JSON Schema), fast serialization, a hook-based plugin system, and TypeScript support. Fastify is often used as a faster alternative to Express in production environments.",
  socket: "Socket.IO is a library for real-time, bidirectional communication between web clients and servers. It uses WebSocket protocol with fallback options (HTTP long-polling). It's commonly used for chat applications, live notifications, collaborative tools, and real-time data streaming.",
  "socket.io": "Socket.IO is a library for real-time, bidirectional communication between web clients and servers. It uses WebSocket protocol with fallback options (HTTP long-polling). It's commonly used for chat applications, live notifications, collaborative tools, and real-time data streaming.",

  // === Python & Backend ===
  python:
    "Python is a high-level, interpreted programming language known for its readability and simplicity. It's used in web development (Django, Flask), data science, machine learning, automation, and scripting. Python features dynamic typing, garbage collection, extensive standard library, and a rich ecosystem of third-party packages via pip.",
  django:
    "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the 'batteries-included' philosophy with built-in admin panel, ORM, authentication, URL routing, template engine, and migrations. Django is known for its security features and scalability.",
  flask: "Flask is a lightweight Python web framework that gives you flexibility and control. It provides essential features like routing, request handling, and template rendering (Jinja2). Flask is designed to be simple and extensible, with a large ecosystem of extensions for adding features like database integration and authentication.",
  fastapi: "FastAPI is a modern Python web framework for building APIs with automatic OpenAPI documentation. It leverages Python type hints for request validation and serialization, supports async operations, and provides interactive API docs via Swagger UI and ReDoc. It's one of the fastest Python frameworks available.",

  // === Databases ===
  sql: "SQL (Structured Query Language) is the standard language for managing relational databases. Key operations include SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, JOINs (INNER, LEFT, RIGHT, FULL), GROUP BY, HAVING, subqueries, indexes, and transactions (ACID properties: Atomicity, Consistency, Isolation, Durability).",
  mysql: "MySQL is a popular open-source relational database management system. It uses SQL and is known for its reliability, performance, and ease of use. MySQL supports ACID transactions, stored procedures, triggers, views, full-text search, and replication for high availability.",
  postgresql: "PostgreSQL is an advanced open-source relational database known for its extensibility and standards compliance. It supports JSON/JSONB for NoSQL-style queries, full-text search, custom data types, geospatial data via PostGIS, advanced indexing (B-tree, Hash, GiST, GIN), and sophisticated query optimization.",
  postgres: "PostgreSQL is an advanced open-source relational database known for its extensibility and standards compliance. It supports JSON/JSONB for NoSQL-style queries, full-text search, custom data types, geospatial data via PostGIS, advanced indexing (B-tree, Hash, GiST, GIN), and sophisticated query optimization.",
  mongodb:
    "MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents (BSON). It supports dynamic schemas, horizontal scaling via sharding, replication for high availability, and rich query capabilities including aggregation pipelines, text search, and geospatial queries. Fields include databases, collections, and documents.",
  prisma: "Prisma is a next-generation ORM for Node.js and TypeScript. It provides a declarative data model, auto-generated query client, database migrations, and a visual editor (Prisma Studio). Prisma supports PostgreSQL, MySQL, SQLite, SQL Server, and MongoDB, and provides type-safe database access.",
  typeorm: "TypeORM is an ORM for TypeScript and JavaScript that supports both Active Record and Data Mapper patterns. It works with MySQL, PostgreSQL, SQLite, MS SQL Server, MongoDB, and more. Features include entity relations, migrations, subscribers, and query builder with TypeScript decorators.",
  redis: "Redis is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports data structures like strings, hashes, lists, sets, sorted sets, bitmaps, and streams. Redis is known for its blazing-fast performance and is commonly used for caching, session management, real-time analytics, and pub/sub messaging.",

  // === DevOps & Cloud ===
  docker:
    "Docker is a platform for developing, shipping, and running applications in containers. Containers are lightweight, standalone packages that include everything needed to run an application (code, runtime, system tools, libraries). Docker uses Dockerfiles for building images, Docker Compose for multi-container applications, and container registries for distribution.",
  kubernetes:
    "Kubernetes (K8s) is an open-source platform for automating deployment, scaling, and management of containerized applications. It provides pod scheduling, service discovery, load balancing, rolling updates, self-healing, and horizontal scaling. Key concepts include Pods, Services, Deployments, ConfigMaps, and Ingress controllers.",
  k8s: "Kubernetes (K8s) is an open-source platform for automating deployment, scaling, and management of containerized applications. It provides pod scheduling, service discovery, load balancing, rolling updates, self-healing, and horizontal scaling. Key concepts include Pods, Services, Deployments, ConfigMaps, and Ingress controllers.",
  aws: "Amazon Web Services (AWS) is a comprehensive cloud computing platform offering over 200 services. Key services include EC2 (virtual servers), S3 (object storage), Lambda (serverless functions), RDS (relational databases), DynamoDB (NoSQL), API Gateway, CloudFront (CDN), and IAM (identity management).",
  azure: "Microsoft Azure is a cloud computing platform offering services for computing, analytics, storage, and networking. It supports both Windows and Linux virtual machines, Azure Functions for serverless computing, Azure DevOps for CI/CD, Azure SQL Database, and integrates well with Microsoft enterprise products.",
  gcp: "Google Cloud Platform (GCP) offers cloud computing services including Compute Engine (VMs), Cloud Storage, Cloud Functions, Cloud Run, BigQuery for analytics, and Kubernetes Engine (GKE). GCP is known for its strong data analytics and machine learning capabilities.",
  ci: "CI/CD (Continuous Integration/Continuous Deployment) automates building, testing, and deploying code. Popular tools include GitHub Actions, GitLab CI, Jenkins, CircleCI, and Bitbucket Pipelines. A typical pipeline includes linting, testing, building, and deploying to staging/production environments.",
  "ci/cd": "CI/CD (Continuous Integration/Continuous Deployment) automates building, testing, and deploying code. Popular tools include GitHub Actions, GitLab CI, Jenkins, CircleCI, and Bitbucket Pipelines. A typical pipeline includes linting, testing, building, and deploying to staging/production environments.",
  github: "GitHub is a platform for version control and collaboration using Git. Features include repositories, pull requests, issues, actions (CI/CD), pages (hosting), discussions, code review, project boards, and GitHub Copilot for AI-assisted coding. It's the largest host of source code worldwide.",

  // === Git ===
  git: "Git is a distributed version control system for tracking changes in source code. Key commands: git init, clone, add, commit, push, pull, branch, merge, rebase, stash, log, diff, reset, revert. Git enables branching strategies like GitFlow, feature branches, and trunk-based development for team collaboration.",

  // === Java / JVM ===
  java: "Java is a class-based, object-oriented programming language designed for portability (Write Once, Run Anywhere). Key concepts include JVM (Java Virtual Machine), garbage collection, OOP (inheritance, polymorphism, encapsulation, abstraction), interfaces, generics, collections framework, streams, and multithreading.",
  spring: "Spring Boot is a Java framework for creating stand-alone, production-grade Spring-based applications. It provides auto-configuration, embedded servers (Tomcat, Jetty), starter dependencies, Actuator for monitoring, and seamless integration with databases via Spring Data JPA. It's the most popular Java framework for microservices.",
  kotlin: "Kotlin is a modern JVM language developed by JetBrains that's fully interoperable with Java. It features null safety, data classes, coroutines for async programming, extension functions, sealed classes, and is officially supported for Android development. Kotlin reduces boilerplate compared to Java.",

  // === Go / Rust / C++ ===
  golang: "Go (Golang) is a statically typed, compiled language by Google designed for simplicity and concurrency. Key features include goroutines (lightweight threads), channels for communication, fast compilation, garbage collection, and a rich standard library. Go is excellent for building microservices, CLI tools, and networked applications.",
  go: "Go (Golang) is a statically typed, compiled language by Google designed for simplicity and concurrency. Key features include goroutines (lightweight threads), channels for communication, fast compilation, garbage collection, and a rich standard library. Go is excellent for building microservices, CLI tools, and networked applications.",
  rust: "Rust is a systems programming language focused on safety, speed, and concurrency. It guarantees memory safety without a garbage collector through its ownership system (ownership, borrowing, lifetimes). Rust is used for systems programming, WebAssembly, game engines, and performance-critical applications.",
  
  // === PHP ===
  php: "PHP is a widely-used open-source scripting language especially suited for web development. Key features include server-side scripting, database integration (MySQL, PostgreSQL), Laravel and Symfony frameworks, Composer for dependency management, and PSR standards for coding conventions.",
  laravel: "Laravel is a PHP web framework with an elegant syntax. Features include Eloquent ORM, Blade templating, routing, middleware, Artisan CLI, database migrations, queues for job processing, and built-in authentication. Laravel follows the MVC pattern and emphasizes developer productivity.",

  // === Mobile ===
  "react native":
    "React Native is a framework for building native mobile applications using React. It allows you to write mobile apps for iOS and Android using JavaScript and React. Key concepts include native components (View, Text, ScrollView), styling with Flexbox, navigation libraries, and accessing native device features through modules.",
  swift: "Swift is Apple's programming language for iOS, macOS, watchOS, and tvOS development. It features type safety, optionals, protocol-oriented programming, closures, and memory management via ARC (Automatic Reference Counting). SwiftUI is the modern declarative UI framework for Apple platforms.",

  // === API & Architecture ===
  api: "API (Application Programming Interface) allows different software systems to communicate. Common styles include REST (Representational State Transfer) using HTTP methods, GraphQL for flexible queries, gRPC for high-performance RPC, and WebSocket for real-time communication. Good API design follows RESTful principles, uses proper HTTP status codes, versioning, and authentication.",
  rest: "REST (Representational State Transfer) is an architectural style for designing networked applications. Key principles include statelessness, resource-based URLs, standard HTTP methods (GET, POST, PUT, DELETE, PATCH), proper status codes, and HATEOAS. REST APIs typically return JSON or XML.",
  graphql:
    "GraphQL is a query language for APIs developed by Meta. It allows clients to request exactly the data they need, reducing over-fetching and under-fetching. Key concepts include Schema Definition Language (SDL), queries, mutations, subscriptions, resolvers, and the GraphiQL IDE for exploration.",
  grpc: "gRPC is a high-performance RPC framework by Google that uses Protocol Buffers for serialization. It supports HTTP/2, bidirectional streaming, flow control, and generates client/server code for multiple languages. gRPC is well-suited for microservices communication.",

  // === Testing ===
  testing: "Testing ensures code quality and reliability. Types include unit tests (testing individual functions), integration tests (testing components together), end-to-end tests (testing full user flows). Popular tools: Jest, Vitest, Mocha, Cypress, Playwright, Testing Library, and React Testing Library.",
  jest: "Jest is a JavaScript testing framework developed by Meta. Features include zero-config setup, built-in assertions, mocking, code coverage, snapshot testing, and parallel test execution. It's the most popular testing framework for React applications.",
  cypress: "Cypress is an end-to-end testing framework for web applications. It provides real-time reloading, time-travel debugging, automatic waiting, and screenshots/videos of test runs. Cypress runs in the same event loop as your application for more reliable tests.",

  // === Build Tools ===
  webpack: "Webpack is a static module bundler for JavaScript applications. It processes modules with dependencies and generates static assets. Key concepts include entry, output, loaders (for different file types), plugins (for bundle optimization), code splitting, and HMR (Hot Module Replacement).",
  vite: "Vite is a modern build tool that significantly improves development experience. It uses native ES modules for fast dev server startup and Rollup for production bundling. Vite supports HMR, TypeScript, JSX, CSS preprocessing, and optimizes builds out of the box.",
  esbuild: "esbuild is an extremely fast JavaScript bundler written in Go. It can bundle JavaScript, TypeScript, JSX, and CSS files 10-100x faster than traditional bundlers. It's used internally by Vite and other tools for its speed.",

  // === Data Science & ML ===
  "machine learning":
    "Machine Learning is a subset of AI where systems learn from data. Types include supervised learning (classification, regression), unsupervised learning (clustering, dimensionality reduction), and reinforcement learning. Popular frameworks: TensorFlow, PyTorch, scikit-learn.",
  tensorflow:
    "TensorFlow is Google's open-source ML platform. It provides Keras for high-level neural network APIs, TensorFlow Serving for deployment, TensorFlow Lite for mobile/edge, and TensorFlow.js for browser-based ML. It supports both CPU and GPU computing.",
  pytorch: "PyTorch is Facebook's open-source ML framework known for its dynamic computation graphs and Pythonic design. It provides torch.nn for neural networks, torch.optim for optimization, and TorchScript for production deployment. PyTorch is widely used in research and production.",

  // === Default / General ===
  default:
    "I'm your versatile AI learning assistant! I can help you with a wide range of technologies including:\n\n🌐 **HTML/CSS**: HTML5, Canvas, SVG, DOM, CSS, Tailwind, Bootstrap, Sass\n🎨 **Frontend**: React, Vue, Angular, Next.js, Svelte, TypeScript\n🖥️ **Backend**: Node.js, Express, NestJS, Python, Django, Flask, FastAPI, Java, Spring Boot, Go, PHP, Laravel\n🗄️ **Databases**: PostgreSQL, MySQL, MongoDB, Redis, Prisma, TypeORM\n☁️ **DevOps**: Docker, Kubernetes, AWS, Azure, GCP, CI/CD, GitHub Actions\n📱 **Mobile**: React Native, Flutter, Swift\n🔧 **Languages**: JavaScript, TypeScript, Python, Java, Kotlin, Go, Rust, C++, PHP, Swift\n🧪 **Testing**: Jest, Cypress, Playwright, Vitest\n🚀 **Build Tools**: Vite, Webpack, esbuild\n🤖 **ML/AI**: TensorFlow, PyTorch\n\nWhat would you like to learn about today?",
};

const suggestions: AISuggestion[] = [
  // HTML/CSS
  { id: "s1", text: "HTML5 semantic elements", category: "html5" },
  { id: "s2", text: "CSS Grid vs Flexbox", category: "css" },
  { id: "s3", text: "How does Tailwind CSS work?", category: "tailwind" },
  { id: "s4", text: "DOM manipulation basics", category: "dom" },
  // Frontend
  { id: "s5", text: "Explain React components & hooks", category: "react" },
  { id: "s6", text: "What is TypeScript?", category: "typescript" },
  { id: "s7", text: "Explain Vue vs React", category: "vue" },
  { id: "s8", text: "What is Next.js?", category: "nextjs" },
  // Backend
  { id: "s9", text: "Node.js fundamentals", category: "node" },
  { id: "s10", text: "Python vs JavaScript", category: "python" },
  { id: "s11", text: "What is Docker?", category: "docker" },
  { id: "s12", text: "REST APIs explained", category: "rest" },
  // Databases
  { id: "s13", text: "SQL vs NoSQL databases", category: "sql" },
  { id: "s14", text: "What is MongoDB?", category: "mongodb" },
  // DevOps
  { id: "s15", text: "Kubernetes basics", category: "kubernetes" },
  { id: "s16", text: "CI/CD pipeline", category: "ci" },
  // Languages
  { id: "s17", text: "Go language features", category: "golang" },
  { id: "s18", text: "Rust ownership explained", category: "rust" },
  { id: "s19", text: "JavaScript closures", category: "javascript" },
  { id: "s20", text: "GraphQL vs REST", category: "graphql" },
  { id: "s21", text: "Machine learning basics", category: "machine learning" },
  { id: "s22", text: "HTML5 Canvas tutorial", category: "canvas" },
];

void knowledgeBase;

export const aiService = {
  async sendMessage(message: string, conversationId?: string): Promise<{ message: ChatMessage; conversationId: string }> {
    const response = await apiClient.post<{
      conversationId: string;
      message: { role: "assistant"; content: string };
    }>("/ai/chat", { message, conversationId }, true);

    if (!response.success || !response.data) {
      throw new Error(response.message || "AI request failed");
    }

    return {
      message: {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: response.data.message.content,
        timestamp: new Date(),
      },
      conversationId: response.data.conversationId,
    };
  },

  getSuggestions(): AISuggestion[] {
    return suggestions;
  },
};