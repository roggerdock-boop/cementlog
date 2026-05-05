import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CATEGORIES, CATEGORY_LABELS } from "@/types";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Factory, Menu, Search, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [searchValue, setSearchValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const currentPath = routerState.location.pathname;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate({ to: "/", search: () => ({ search: searchValue.trim() }) });
    setSearchOpen(false);
    setSearchValue("");
  }

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-sm"
      data-ocid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            search={{}}
            className="flex items-center gap-2.5 flex-shrink-0 group"
            data-ocid="header.logo_link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-smooth group-hover:bg-primary/90">
              <Factory className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground tracking-tight">
              CementHub
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="header.nav"
          >
            <Link
              to="/"
              search={{}}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium font-display transition-smooth",
                currentPath === "/"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
              data-ocid="header.home_link"
            >
              Home
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to="/"
                search={() => ({ category: cat })}
                className="px-3 py-2 rounded-md text-sm font-medium font-display text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                data-ocid={`header.category_link.${cat.toLowerCase()}`}
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="hidden md:flex items-center gap-2"
              >
                <Input
                  autoFocus
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search articles\u2026"
                  className="w-56 h-9 text-sm"
                  data-ocid="header.search_input"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="default"
                  data-ocid="header.search_submit"
                >
                  Search
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setSearchOpen(false)}
                  data-ocid="header.search_close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </form>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                data-ocid="header.search_toggle"
              >
                <Search className="w-4 h-4" />
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="header.mobile_menu_toggle"
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden py-3 border-t border-border"
            data-ocid="header.mobile_nav"
          >
            <form onSubmit={handleSearch} className="flex gap-2 mb-3">
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles\u2026"
                className="flex-1 h-9 text-sm"
                data-ocid="header.mobile_search_input"
              />
              <Button
                type="submit"
                size="sm"
                data-ocid="header.mobile_search_submit"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                search={{}}
                className="px-3 py-2 rounded-md text-sm font-medium font-display text-foreground hover:bg-muted transition-smooth"
                onClick={() => setMobileOpen(false)}
                data-ocid="header.mobile_home_link"
              >
                Home
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to="/"
                  search={() => ({ category: cat })}
                  className="px-3 py-2 rounded-md text-sm font-medium font-display text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`header.mobile_category_link.${cat.toLowerCase()}`}
                >
                  {CATEGORY_LABELS[cat]}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
