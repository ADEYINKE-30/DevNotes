# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.




mkdir src\constants src\context src\data src\hooks src\pages src\routes src\services src\styles src\types src\utils
  ### Chatgbt guide

How We'll Code

From this point on, I don't want to just give you code.

Instead, we'll work like this:

Plan the component.
Discuss why we need it.
Design its API (props).
Implement it together.
Test it.
Refactor if needed.
Commit it to Git.

This will help you build confidence and understand the reasoning behind each decision.

✅ Your Next Task
Create the remaining folders listed above.
Tell me when they're done.

Then we'll build our first reusable React + TypeScript component together: a flexible Button that we'll reuse throughout the entire blog application. It's a small component, but it will introduce many of the React and TypeScript patterns you'll use repeatedly in this project. 🚀

C:\Users\USER PC\Desktop\Blog_App>dir src\constants
 Volume in drive C has no label.
 Volume Serial Number is 2401-5F1A

 Directory of C:\Users\USER PC\Desktop\Blog_App\src

File Not Found

You're very close! The command you ran is checking whether the folder exists—it doesn't create it.

You ran:

dir src\constants

dir means list the contents of a directory. Since constants doesn't exist yet, Windows correctly responded with:

File Not Found
Let's create the folders

From your project root (C:\Users\USER PC\Desktop\Blog_App), run:

mkdir src\constants
mkdir src\context
mkdir src\data
mkdir src\hooks
mkdir src\pages
mkdir src\routes
mkdir src\services
mkdir src\styles
mkdir src\types
mkdir src\utils

Or, if you prefer, create them all in one command:

mkdir src\constants src\context src\data src\hooks src\pages src\routes src\services src\styles src\types src\utils
Verify they were created

Run:

dir src

You should see something similar to:

src
│
├── assets
├── components
├── constants
├── context
├── data
├── hooks
├── pages
├── routes
├── services
├── styles
├── types
├── utils
├── App.tsx
├── index.css
└── main.tsx
A small suggestion before we go further

Since this project is going to become part of your portfolio, I'd like us to make it feel like a real software project rather than a tutorial.

Here's how we'll work:

Sprint 1: Setup and architecture.
Sprint 2: Design system (colors, typography, reusable components).
Sprint 3: Layout (Header, Footer, Navigation).
Sprint 4: Pages and routing.
Sprint 5: Blog functionality.
Sprint 6: Polish, accessibility, and deployment.

We'll make Git commits after each completed feature, so by the end you'll also have a clean commit history that demonstrates your development process.

Once you've created the remaining folders and confirmed they appear under src, we'll start building our first reusable component: a professional Button using React, TypeScript, and CSS Modules.



Sprint 1 Completed (Foundation)

Here's what we've accomplished:

✅ React + TypeScript + Vite project
✅ pnpm setup
✅ Organized folder structure
✅ Ready for development

From this point onward, everything we build will fit into this architecture.


styles/
├── globals.css
├── reset.css
├── variables.css
└── typography.css
reset.css – Removes browser default inconsistencies.
variables.css – Defines colors, spacing, border radii, shadows, and transitions using CSS variables.
typography.css – Defines font sizes, line heights, and heading styles.
globals.css – Imports the other style files and sets global styles.

## Contact email setup

The contact form now stores messages in Firestore and sends a real email through EmailJS.

Add these values to your local `.env` file before using the form:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Messages are still logged to Firestore even if email delivery fails, so no contact request is lost.