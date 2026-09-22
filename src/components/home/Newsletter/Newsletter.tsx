import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="border-y border-line bg-canvas py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">The DevNotes letter</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-content">
          Stay Updated
        </h2>
        <p className="mt-3 text-sm text-content-secondary">
          Get the latest articles, tutorials, and tips delivered to your inbox.
        </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row sm:gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
            className="flex-1 rounded-control border border-line bg-surface px-4 py-3 text-content placeholder:text-content-muted transition-colors focus:border-focus focus:outline-none focus:ring-2 focus:ring-focus/20"
          />
          <button
            type="submit"
            className="rounded-control bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-none"
          >
            {submitted ? "✓ Subscribed!" : "Subscribe"}
          </button>
        </form>

        {submitted && (
          <p role="status" className="mt-3 text-sm text-success">
            Thanks for subscribing! Check your email for confirmation.
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
