import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-purple-500" />
          <p className="text-sm font-medium text-purple-300">
            Welcome to DevNotes
          </p>
        </div>

        <h1 className="mt-8 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-6xl lg:text-7xl">
          Learn. Build. Share.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Your AI-powered learning platform for developers. Master React, TypeScript, JavaScript, and more through interactive tutorials, quizzes, and community.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
          <Link
            to="/blog"
            className="rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-3 font-semibold text-white transition hover:from-purple-500 hover:to-violet-500 hover:shadow-lg hover:shadow-purple-500/30"
          >
            Start Exploring
          </Link>

          <Link
            to="/community"
            className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-8 py-3 font-semibold text-purple-300 transition hover:border-purple-500/50 hover:bg-purple-500/20"
          >
            Join Community
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;