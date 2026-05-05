import { CATEGORIES, CATEGORY_LABELS } from "@/types";
import { Link } from "@tanstack/react-router";
import { Factory } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Factory className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-display font-bold text-foreground">
                CementHub
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Authoritative knowledge for cement plant operators and engineers.
              Precision-driven insights across all production zones.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-4 uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/"
                    search={() => ({ category: cat })}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    data-ocid={`footer.category_link.${cat.toLowerCase()}`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  search={{}}
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  data-ocid="footer.home_link"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  data-ocid="footer.admin_link"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            \u00a9 {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            Industrial knowledge for cement professionals
          </p>
        </div>
      </div>
    </footer>
  );
}
