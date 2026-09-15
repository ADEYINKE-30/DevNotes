import { useState, type FormEvent } from "react";
import { contactService } from "../../services/contactService";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const result = await contactService.submitMessage({ name, email, message });

    if (!result.success) {
      setStatus("error");
      setFeedback(result.message);
      return;
    }

    // Clear the form only after a successful write so users do not lose their draft.
    setName("");
    setEmail("");
    setMessage("");
    setStatus("success");
    setFeedback(result.message);
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <p className="mt-6 text-lg text-gray-600">
        Have a question, suggestion, or want to contribute? Reach out to us!
      </p>

      {feedback && (
        <p
          className={`mt-6 rounded-lg px-4 py-3 text-sm ${
            status === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {feedback}
        </p>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;