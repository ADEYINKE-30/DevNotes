# DevNotes

**Learn. Build. Share.**

DevNotes is a full-stack developer learning and blogging platform designed to help developers learn programming concepts, explore practical tutorials, test their knowledge through quizzes, and engage with developer-focused content.

## 🚀 Features

* 📚 **Developer Articles** — Read practical articles covering web development and programming.
* 🎥 **Video Tutorials** — Learn through structured tutorials and video lessons.
* 🧠 **Quizzes** — Test your understanding with interactive programming quizzes.
* 🤖 **AI Assistant** — Get programming explanations and learning support.
* 🔐 **Authentication** — Secure user registration and login using JWT authentication.
* 👤 **User Profiles** — Manage your profile and account information.
* 🛠️ **Admin Dashboard** — Manage platform content and users.
* 🌙 **Dark Mode** — Switch between light and dark themes.
* 🔎 **Search** — Find relevant articles and learning content.
* 📱 **Responsive Design** — Designed to work across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication

### Development Tools

* Git
* GitHub
* pnpm
* npm
* VS Code
* GitHub Copilot
* AI-assisted development tools

## 📁 Project Structure

```text
DevNotes/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── hooks/
│   ├── constants/
│   ├── utils/
│   └── main.tsx
│
├── server/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── middleware/
│       └── scripts/
│
├── public/
├── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* pnpm
* MongoDB

### 1. Clone the repository

```bash
git clone https://github.com/ADEYINKE-30/DevNotes.git
cd DevNotes
```

### 2. Install frontend dependencies

```bash
pnpm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory.

Add the required environment variables for your local development environment.

> Do not commit your `.env` file to GitHub.

### 5. Seed the database

From the `server` directory:

```bash
npm run seed:posts
npm run seed:tutorials
npm run seed:quizzes
npm run seed:demo-users
```

### 6. Start the backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 7. Start the frontend

Open another terminal in the project root:

```bash
pnpm run dev
```

The frontend will be available through the Vite development server.

## 🔐 Authentication

DevNotes uses JWT-based authentication.

Users can:

* Create an account
* Log in
* Update their profile
* Change their password
* Log out securely

The application also includes separate user roles for regular users and administrators.

## 📚 Articles

DevNotes provides developer-focused articles designed to explain programming concepts in a practical and beginner-friendly way.

Articles can include:

* Programming concepts
* Code examples
* Practical explanations
* Development best practices
* Web development topics

## 🎥 Tutorials

The tutorial section provides structured learning content with multiple lessons and video resources.

The current platform includes:

* 5 tutorials
* 30 lessons

## 🧠 Quizzes

DevNotes includes interactive quizzes that allow users to test their understanding of programming topics.

The current database includes:

* 3 quizzes
* 21 questions

Users can start quizzes, submit answers, and view their results.

## 🤖 AI Assistant

DevNotes includes an AI-powered learning assistant designed to help users understand programming concepts.

The assistant can provide explanations about topics such as:

* HTML
* CSS
* JavaScript
* TypeScript
* React
* Tailwind CSS
* Git
* GitHub
* Node.js
* Express.js
* MongoDB
* REST APIs
* Debugging
* Responsive web design

The application supports external AI providers through environment configuration and also includes an offline fallback mode for development.

## 🛡️ Admin Features

Administrators have access to protected management functionality for platform administration.

Admin functionality includes management areas for:

* Users
* Articles
* Tutorials
* Quizzes
* Platform content

## 🧪 Build

To verify the frontend production build:

```bash
pnpm run build
```

To verify the backend build:

```bash
cd server
npm run build
```

## 🔒 Security

Environment variables containing secrets and credentials should never be committed to the repository.

The project uses `.gitignore` to exclude sensitive and generated files such as:

```text
.env
.env.example
node_modules/
dist/
```

For deployment, use secure environment variables provided by your hosting platform.

## 🎯 Project Goal

DevNotes was created to provide a simple and practical learning environment for developers.

The goal is to make technical learning more approachable by combining:

**Learning → Practice → Testing → Support**

Users can learn through articles and tutorials, test their knowledge with quizzes, and use the AI assistant when they need additional explanations.

## 🚧 Future Improvements

Possible future improvements include:

* More developer tutorials
* More quizzes and questions
* Expanded AI capabilities
* Community discussions
* Bookmarks and personalized learning
* Improved admin analytics
* Deployment and production infrastructure
* Additional developer resources

## 👨🏽‍💻 Author

**Adepoju Adeyinka**

Software Developer

Lagos, Nigeria

* GitHub: [ADEYINKE-30](https://github.com/ADEYINKE-30)

## 📄 License

This project was created as a software development portfolio and learning project.
