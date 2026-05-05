import { ArticleCard, ArticleCardSkeleton } from "@/components/ArticleCard";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLatestArticles,
  useListArticles,
  usePopularArticles,
  useSearchArticles,
} from "@/hooks/useArticles";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/types";
import type { Article } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Search as SearchIcon,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";

const PAGE_SIZE = 9;

function ArticleGrid({
  articles,
  isLoading,
}: { articles: Article[] | undefined; isLoading: boolean }) {
  if (isLoading) {
    const skeletonKeys = ["a", "b", "c", "d", "e", "f"];
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        data-ocid="articles.loading_state"
      >
        {skeletonKeys.map((k) => (
          <ArticleCardSkeleton key={k} />
        ))}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center"
        data-ocid="articles.empty_state"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <SearchIcon className="w-7 h-7 text-muted-foreground" />
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground mb-1">
          No articles found
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Try adjusting your filters or search query to find relevant articles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, i) => (
        <div key={article.id.toString()} data-ocid={`article.item.${i + 1}`}>
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
}

function FilteredArticles({
  category,
  page,
  onPageChange,
}: {
  category: Category | null;
  page: number;
  onPageChange: (p: number) => void;
}) {
  const filter = {
    ...(category ? { category } : {}),
    page,
    pageSize: PAGE_SIZE,
  };
  const { data, isLoading } = useListArticles(filter);
  const total = data ? data.total : 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <ArticleGrid articles={data?.articles} isLoading={isLoading} />
      {totalPages > 1 && (
        <div
          className="flex items-center justify-center gap-2 pt-4"
          data-ocid="articles.pagination"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            data-ocid="articles.pagination_prev"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            data-ocid="articles.pagination_next"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function SearchResults({ query }: { query: string }) {
  const { data, isLoading } = useSearchArticles(query);
  return <ArticleGrid articles={data} isLoading={isLoading} />;
}

function LatestTab() {
  const { data, isLoading } = useLatestArticles(12);
  return <ArticleGrid articles={data} isLoading={isLoading} />;
}

function PopularTab() {
  const { data, isLoading } = usePopularArticles(12);
  return <ArticleGrid articles={data} isLoading={isLoading} />;
}

export default function Home() {
  const searchParams = useSearch({ from: "/" });
  const navigate = useNavigate();
  const searchQuery = searchParams.search ?? "";
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    searchParams.category ? (searchParams.category as Category) : null,
  );
  const [page, setPage] = useState(searchParams.page ?? 1);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const isSearching = searchQuery.trim().length > 0;

  const handleCategoryClick = useCallback(
    (cat: Category | null) => {
      setSelectedCategory(cat);
      setPage(1);
      void navigate({
        to: "/",
        search: (prev) => ({
          ...prev,
          category: cat ?? undefined,
          page: undefined,
        }),
      });
    },
    [navigate],
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      void navigate({
        to: "/",
        search: (prev) => ({
          ...prev,
          search: searchInput.trim() || undefined,
        }),
      });
    },
    [searchInput, navigate],
  );

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    void navigate({
      to: "/",
      search: (prev) => ({ ...prev, search: undefined }),
    });
  }, [navigate]);

  return (
    <Layout>
      {/* Hero */}
      <section
        className="bg-card border-b border-border"
        data-ocid="home.hero_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-block w-6 h-1 bg-primary rounded-full"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-primary uppercase tracking-widest font-display">
                Technical Knowledge Base
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              CementHub
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Technical knowledge for cement plant professionals
            </p>
            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-lg">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles\u2026"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-9 font-body"
                  data-ocid="home.search_input"
                />
              </div>
              <Button type="submit" data-ocid="home.search_submit">
                Search
              </Button>
              {isSearching && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  data-ocid="home.search_clear"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Category filter bar */}
      <div className="bg-background border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center gap-2 py-3 overflow-x-auto"
            style={{ scrollbarWidth: "none" } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={() => handleCategoryClick(null)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium font-display transition-smooth border ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
              data-ocid="category.filter.all"
            >
              All Topics
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium font-display transition-smooth border ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
                data-ocid={`category.filter.${cat.toLowerCase()}`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {isSearching ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Results for{" "}
                  <span className="text-primary">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  data-ocid="search.clear_button"
                >
                  <X className="w-4 h-4 mr-1" /> Clear
                </Button>
              </div>
              <SearchResults query={searchQuery} />
            </div>
          ) : selectedCategory !== null ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Articles in
                </h2>
                <CategoryBadge
                  category={selectedCategory}
                  className="text-sm py-1 px-3"
                />
              </div>
              <FilteredArticles
                category={selectedCategory}
                page={page}
                onPageChange={setPage}
              />
            </div>
          ) : (
            <Tabs defaultValue="latest" className="space-y-6">
              <TabsList
                className="bg-muted p-1 rounded-lg"
                data-ocid="articles.tab_list"
              >
                <TabsTrigger
                  value="latest"
                  className="font-display font-medium"
                  data-ocid="articles.tab.latest"
                >
                  Latest Articles
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="font-display font-medium"
                  data-ocid="articles.tab.popular"
                >
                  Popular Articles
                </TabsTrigger>
              </TabsList>
              <TabsContent value="latest" className="mt-0">
                <LatestTab />
              </TabsContent>
              <TabsContent value="popular" className="mt-0">
                <PopularTab />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </Layout>
  );
}
