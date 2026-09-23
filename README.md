# DevNotes

**Learn. Build. Share.**

DevNotes is a developer learning and blogging platform. It combines practical articles, video tutorials, quizzes, progress tracking, community features, and an AI learning assistant in one responsive React application.

This repository contains the frontend. It connects to a separately hosted backend API for application data and JWT authentication.

## Features

- Developer articles and practical programming content
- Video tutorials and structured learning paths
- Interactive quizzes and progress tracking
- AI assistant with online and offline response support
- JWT-based registration, login, profiles, and protected routes
- Community discussions, reactions, bookmarks, and notifications
- Admin dashboard for managing platform content
- Search across articles and learning content
- Light and dark themes
- Responsive layouts for desktop, tablet, and mobile

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Integrated Services

- REST API for articles, tutorials, quizzes, users, and authentication
- JWT bearer tokens for authenticated API requests
- Firebase Firestore for contact message storage
- EmailJS for contact email delivery

### Development Tools

- pnpm
- Git and GitHub
- VS Code
- Oxlint

## Project Structure

```text
DevNotes/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   └── ...
│   ├── components/
│   ├── config/
│   ├── constants/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── main.tsx
├── .env.example
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- pnpm
- Access to the DevNotes backend API, or a locally running compatible backend
- Firebase and EmailJS projects if you want to use the contact form

### Installation

```bash
git clone https://github.com/ADEYINKE-30/DevNotes.git
cd DevNotes
pnpm install
```

### Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
copy .env.example .env
```

Configure these values as needed:

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend API base URL, including `/api` |
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase authentication domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase application ID |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

The frontend uses the deployed API as a fallback when `VITE_API_URL` is not set. Set `VITE_API_URL` explicitly when using a local or different backend.

Do not commit `.env` or any secret credentials to GitHub.

### Run Locally

Start the Vite development server:

```bash
pnpm dev
```

The application will be available at the local URL printed by Vite, usually `http://localhost:5173`.

### Build and Preview

```bash
pnpm build
pnpm preview
```

Run the linter with:

```bash
pnpm lint
```

## Backend Integration

The backend is maintained and deployed separately from this frontend repository. The frontend API client reads `VITE_API_URL` and sends JWT bearer tokens from browser storage for authenticated requests.

The frontend expects the backend to provide endpoints for authentication, articles, tutorials, quizzes, users, bookmarks, community features, notifications, and search. Consult the backend deployment or API documentation for available endpoints and local development instructions.

## Contact Form

The contact form stores messages in Firebase Firestore and sends email through EmailJS. Both services require the corresponding environment variables from `.env.example`.

If EmailJS is not configured, the application reports that email delivery is unavailable. Firebase rules should be configured carefully before deploying the contact form publicly.

## Authentication

Authentication is handled by the external backend using JWTs. Users can register, log in, update their profile, change their password, and log out. Protected routes and authenticated API requests use the stored bearer token.

## Deployment

Build the application with `pnpm build`, then deploy the generated `dist/` directory to a static hosting provider such as Netlify, Vercel, or Cloudflare Pages.

Configure the production environment variables in the hosting provider, especially `VITE_API_URL`, Firebase values, and EmailJS values.

## Author

**Adepoju Adeyinka**
Software Developer
Lagos, Nigeria

## License

This project was created as a software development portfolio and learning project.
