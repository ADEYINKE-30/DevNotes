import { useState } from "react";
import { newsletterService } from "../../../services/newsletterService";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!email.trim()) {
    setIsSuccess(false);
    setMessage("Please enter your email.");
    return;
  }

  const result = await newsletterService.subscribe(email, "");
  setIsSuccess(result.success);
  setMessage(result.message);

  if (result.success) setEmail("");
};
  return (
    <section className="mx-auto max-w-3xl rounded-xl bg-slate-100 px-6 py-12 text-center">
      <h2 className="text-3xl font-bold">Stay Updated</h2>

      <p className="mt-3 text-gray-600">
        Subscribe to receive the latest tutorials and articles.
      </p>

      {message && (
  <p className={`mt-4 rounded-lg p-3 ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
    {message}
  </p>
)}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3"
        />

        <button
          type="submit" disabled={!email.trim()}
          className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
  email.trim()
    ? "bg-blue-600 hover:bg-blue-700"
    : "cursor-not-allowed bg-gray-400"
}`}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;