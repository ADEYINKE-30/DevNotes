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
    <section className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 border-y border-slate-700 py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white">
          Stay Updated
        </h2>
        <p className="mt-3 text-slate-400">
          Get the latest articles, tutorials, and tips delivered to your inbox.
        </p>

        <form onSubmit={handleSubscribe} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 font-semibold text-white transition hover:from-purple-500 hover:to-violet-500 hover:shadow-lg hover:shadow-purple-500/30"
          >
            {submitted ? "✓ Subscribed!" : "Subscribe"}
          </button>
        </form>

        {submitted && (
          <p className="mt-3 text-sm text-green-400">
            Thanks for subscribing! Check your email for confirmation.
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
