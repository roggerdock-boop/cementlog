import { CategoryBadge } from "@/components/CategoryBadge";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useArticleBySlug,
  useIncrementViewCount,
  useListArticles,
} from "@/hooks/useArticles";
import type { Article } from "@/types";
import { ArticleStatus, SortBy } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Calendar, Eye, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

function ArticleDetailSkeleton() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="article.loading_state"
    >
      <Skeleton className="h-5 w-32 mb-8" />
      <div className="flex gap-12">
        <div className="flex-1 min-w-0 space-y-5">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-4/5" />
          <div className="flex gap-6">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-72 w-full rounded-xl" />
          <div className="space-y-3 pt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <aside className="hidden lg:block w-72 shrink-0 space-y-3">
          <Skeleton className="h-5 w-36 mb-4" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-lg" />
          ))}
        </aside>
      </div>
    </div>
  );
}

function RelatedArticleCard({ article }: { article: Article }) {
  const formatted = new Date(article.publishDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      className="group block rounded-lg border border-border bg-card p-4 transition-smooth hover:border-primary/40 hover:shadow-sm"
      data-ocid="related.item"
    >
      {article.featuredImageUrl && (
        <img
          src={article.featuredImageUrl}
          alt={article.title}
          className="w-full h-28 object-cover rounded-md mb-3"
        />
      )}
      <CategoryBadge category={article.category} className="mb-2" />
      <h3 className="font-display font-semibold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {formatted}
      </p>
    </Link>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams({ from: "/articles/$slug" });
  const { data: article, isLoading } = useArticleBySlug(slug);
  const incrementViewCount = useIncrementViewCount();

  const { data: relatedResult } = useListArticles(
    article
      ? {
          category: article.category,
          status: ArticleStatus.published,
          sortBy: SortBy.date,
          pageSize: 5,
        }
      : undefined,
  );

  const hasIncrementedRef = useRef(false);
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time trigger — incrementViewCount.mutate is stable
  useEffect(() => {
    if (article?.id !== undefined && !hasIncrementedRef.current) {
      hasIncrementedRef.current = true;
      incrementViewCount.mutate(article.id);
    }
  }, [article?.id]);

  const relatedArticles = (relatedResult?.articles ?? [])
    .filter((a) => a.slug !== slug)
    .slice(0, 4);

  const publishDate = article
    ? new Date(article.publishDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  if (isLoading) {
    return (
      <Layout>
        <ArticleDetailSkeleton />
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div
          className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center"
          data-ocid="article.error_state"
        >
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            search={{}}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            data-ocid="article.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Dynamic SEO */}
      {typeof document !== "undefined"
        ? (() => {
            document.title = `${article.title} — CementHub`;
            const meta = document.querySelector('meta[name="description"]');
            if (meta)
              meta.setAttribute(
                "content",
                article.metaDescription || article.excerpt,
              );
            return null;
          })()
        : null}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8"
          data-ocid="article.breadcrumb"
        >
          <Link
            to="/"
            search={{}}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            data-ocid="article.back_link"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            All Articles
          </Link>
        </nav>

        <div className="flex gap-12">
          {/* Main content */}
          <motion.article
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            data-ocid="article.panel"
          >
            {/* Category badge */}
            <div className="mb-4">
              <CategoryBadge category={article.category} />
            </div>

            <h1
              className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight mb-5"
              data-ocid="article.title"
            >
              {article.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
              <span
                className="flex items-center gap-1.5"
                data-ocid="article.author"
              >
                <User className="w-4 h-4" />
                By {article.authorName}
              </span>
              <span
                className="flex items-center gap-1.5"
                data-ocid="article.date"
              >
                <Calendar className="w-4 h-4" />
                {publishDate}
              </span>
              <span
                className="flex items-center gap-1.5"
                data-ocid="article.view_count"
              >
                <Eye className="w-4 h-4" />
                {Number(article.viewCount).toLocaleString()} views
              </span>
            </div>

            {/* Featured image */}
            {article.featuredImageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden border border-border">
                <img
                  src={article.featuredImageUrl}
                  alt={article.title}
                  className="w-full h-72 sm:h-96 object-cover"
                />
              </div>
            )}

            {/* Excerpt pull-quote */}
            {article.excerpt && (
              <p className="text-lg text-muted-foreground italic border-l-4 border-primary/60 pl-4 mb-8">
                {article.excerpt}
              </p>
            )}

            {/* Article body */}
            <div
              className="prose prose-neutral max-w-none
                prose-headings:font-display prose-headings:text-foreground
                prose-p:text-foreground/90 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground
                prose-img:rounded-xl prose-img:border prose-img:border-border
                prose-hr:border-border prose-li:text-foreground/90"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: CMS-authored content
              dangerouslySetInnerHTML={{ __html: article.content }}
              data-ocid="article.content"
            />
          </motion.article>

          {/* Sidebar — desktop only */}
          {relatedArticles.length > 0 && (
            <aside
              className="hidden lg:block w-72 shrink-0"
              data-ocid="related.section"
            >
              <div className="sticky top-8">
                <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Related Articles
                </h2>
                <div className="space-y-3">
                  {relatedArticles.map((rel, idx) => (
                    <motion.div
                      key={rel.slug}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.35 }}
                    >
                      <RelatedArticleCard article={rel} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Related Articles — mobile, stacked below */}
        {relatedArticles.length > 0 && (
          <section
            className="lg:hidden mt-12 pt-10 border-t border-border"
            data-ocid="related.section-mobile"
          >
            <h2 className="font-display text-lg font-bold text-foreground mb-5">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <RelatedArticleCard key={rel.slug} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
