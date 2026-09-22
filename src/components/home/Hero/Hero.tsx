import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] md:items-center md:gap-16 lg:py-16">
        <div className="max-w-3xl border-l-2 border-accent pl-5 sm:pl-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            DevNotes
          </p>

          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-content sm:text-5xl lg:text-6xl">
            Learn. Build. Share.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-content-secondary sm:text-lg">
            Practical development concepts, tutorials, and challenges for developers who want to understand the work and build better software.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/blog" className="rounded-control bg-accent px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-none">
              Explore Articles
            </Link>
            <Link to="/videos" className="rounded-control border border-line bg-surface px-5 py-3 text-center text-sm font-semibold text-content transition-colors hover:border-accent hover:text-accent focus-visible:outline-none">
              Start Learning
            </Link>
          </div>
        </div>

        <div className="border border-line bg-surface p-4 shadow-sm sm:p-5" aria-label="DevNotes learning preview">
          <div className="flex items-center justify-between border-b border-line pb-3 text-xs text-content-muted">
            <span>devnotes / learning-path</span>
            <span className="text-success">● live</span>
          </div>
          <div className="py-5 font-mono text-sm leading-7 text-content-secondary">
            <p><span className="text-accent">01</span> <span className="text-content">Understand</span> the concept</p>
            <p><span className="text-accent">02</span> <span className="text-content">Build</span> a small example</p>
            <p><span className="text-accent">03</span> <span className="text-content">Practice</span> what you learned</p>
            <p><span className="text-accent">04</span> <span className="text-content">Share</span> your progress</p>
          </div>
          <div className="border-t border-line pt-3 text-xs text-content-muted">
            <span className="text-accent">&gt;</span> practical knowledge, one idea at a time
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;