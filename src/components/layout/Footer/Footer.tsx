import { Link } from "react-router-dom";
import { navigationLinks } from "../../../constants/navigation";

const Footer = () => {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-xl font-semibold tracking-tight text-content"
            >
              Dev<span className="text-accent">Notes</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-content-secondary">
              An AI-powered learning platform for developers. Learn, build, and
              share with the community.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-content-muted">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-content-secondary transition-colors hover:text-accent focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-content-muted">
              Connect
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-content-secondary">
              <li>Twitter / X</li>
              <li>GitHub</li>
              <li>Discord</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center text-xs text-content-muted">
          &copy; {new Date().getFullYear()} DevNotes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;