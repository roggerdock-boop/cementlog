import { AdminArticleForm } from "@/components/AdminArticleForm";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminLogout,
  useDeleteArticle,
  useListArticles,
} from "@/hooks/useArticles";
import { ArticleStatus, CATEGORY_LABELS, SortBy } from "@/types";
import type { Article } from "@/types";
import { Link } from "@tanstack/react-router";
import { Edit3, Eye, LogOut, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const [statusFilter, setStatusFilter] = useState<ArticleStatus | undefined>(
    undefined,
  );
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const { data: listData, isLoading } = useListArticles({
    ...(statusFilter ? { status: statusFilter } : { showAll: true }),
    sortBy: SortBy.date,
    page: 1,
    pageSize: 50,
  });
  const { mutate: deleteArticle } = useDeleteArticle();
  const { mutate: logout } = useAdminLogout();

  function handleDelete(id: string) {
    deleteArticle(id, {
      onSuccess: () => toast.success("Article deleted"),
      onError: () => toast.error("Failed to delete article"),
    });
  }

  function handleLogout() {
    logout(undefined, {
      onSuccess: () => toast.success("Logged out"),
    });
  }

  const articles = listData?.articles ?? [];

  return (
    <ProtectedRoute>
      <Layout>
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
          data-ocid="admin.page"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage CementHub articles and content
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="font-display gap-2"
                data-ocid="admin.logout_button"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => setShowCreate(true)}
                className="font-display gap-2"
                data-ocid="admin.create_button"
              >
                <PlusCircle className="w-4 h-4" />
                New Article
              </Button>
            </div>
          </div>

          {/* Status filter tabs */}
          <div className="flex gap-2 mb-6" data-ocid="admin.status_filters">
            {(
              [undefined, ArticleStatus.published, ArticleStatus.draft] as const
            ).map((s) => (
              <Button
                key={s ?? "all"}
                type="button"
                variant={statusFilter === s ? "default" : "outline"}
                size="sm"
                className="font-display"
                onClick={() => setStatusFilter(s)}
                data-ocid={`admin.filter_${s ?? "all"}_tab`}
              >
                {s === undefined
                  ? "All"
                  : s === ArticleStatus.published
                    ? "Published"
                    : "Drafts"}
              </Button>
            ))}
          </div>

          {/* Articles table */}
          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            data-ocid="admin.articles_table"
          >
            {isLoading ? (
              <div
                className="p-6 space-y-3"
                data-ocid="admin.articles_loading_state"
              >
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div
                className="py-20 text-center"
                data-ocid="admin.articles_empty_state"
              >
                <p className="text-muted-foreground font-display">
                  No articles found.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 font-display"
                  onClick={() => setShowCreate(true)}
                  data-ocid="admin.empty_create_button"
                >
                  Create first article
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {articles.map((article, idx) => (
                  <div
                    key={article.id.toString()}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-smooth"
                    data-ocid={`admin.article.item.${idx + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <CategoryBadge category={article.category} />
                        <Badge
                          variant={
                            article.status === ArticleStatus.published
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {article.status}
                        </Badge>
                      </div>
                      <p className="font-display font-medium text-foreground truncate">
                        {article.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {article.authorName} ·{" "}
                        {new Date(article.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}{" "}
                        · {Number(article.viewCount)} views
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        to="/articles/$slug"
                        params={{ slug: article.slug }}
                        target="_blank"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label="View article"
                          data-ocid={`admin.view_button.${idx + 1}`}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Edit article"
                        onClick={() => setEditingArticle(article)}
                        data-ocid={`admin.edit_button.${idx + 1}`}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Delete article"
                            className="text-destructive hover:text-destructive"
                            data-ocid={`admin.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent data-ocid="admin.delete_dialog">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-display">
                              Delete Article?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{article.title}".
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              className="font-display"
                              data-ocid="admin.delete_cancel_button"
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="font-display bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDelete(article.id)}
                              data-ocid="admin.delete_confirm_button"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create / Edit form modal */}
        {(showCreate || editingArticle) && (
          <AdminArticleForm
            article={editingArticle ?? undefined}
            onClose={() => {
              setShowCreate(false);
              setEditingArticle(null);
            }}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
}
