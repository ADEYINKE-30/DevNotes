import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-full max-w-md flex-col justify-center px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-white">Sign In</h1>
      <p className="mt-2 text-center text-slate-400">
        Welcome back to DevNotes
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-900/30 border border-red-500/50 p-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <form onSubmit={handleLogin} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            placeholder="••••••••"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 font-semibold text-white transition hover:from-purple-700 hover:to-violet-700 disabled:from-purple-400 disabled:to-violet-400 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default Login;
