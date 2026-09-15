import { Link } from "react-router-dom";
import { navigationLinks } from "../../../constants/navigation";

const Footer = () => {
  return (
    <footer className="border-t border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-white"
            >
              Dev<span className="text-purple-400">Notes</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              An AI-powered learning platform for developers. Learn, build, and
              share with the community.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 transition hover:text-purple-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Connect
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>Twitter / X</li>
              <li>GitHub</li>
              <li>Discord</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} DevNotes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;