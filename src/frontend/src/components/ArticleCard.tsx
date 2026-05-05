import { CategoryBadge } from "@/components/CategoryBadge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/types";
import { Link } from "@tanstack/react-router";
import { Calendar, Eye, User } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = article.featuredImageUrl;

  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      data-ocid="article.card"
    >
      <Card className="group flex flex-col h-full overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-smooth bg-card cursor-pointer">
        {/* Cover image */}
        <div className="relative overflow-hidden h-44 bg-muted flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
              <svg
                className="w-12 h-12 text-muted-foreground opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <CategoryBadge category={article.category} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          <h3 className="font-display font-semibold text-base leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {article.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
              <User className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{article.authorName}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(article.publishDate)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {Number(article.viewCount).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function ArticleCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden border border-border bg-card">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="flex flex-col p-4 gap-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </Card>
  );
}
