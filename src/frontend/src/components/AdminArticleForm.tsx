import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateArticle, useUpdateArticle } from "@/hooks/useArticles";
import { ArticleStatus, CATEGORIES, CATEGORY_LABELS } from "@/types";
import type { Article, CreateArticleInput, UpdateArticleInput } from "@/types";
import { Category } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

interface AdminArticleFormProps {
  article?: Article;
  onClose: () => void;
}

export function AdminArticleForm({ article, onClose }: AdminArticleFormProps) {
  const isEdit = !!article;
  const { mutate: createArticle, isPending: creating } = useCreateArticle();
  const { mutate: updateArticle, isPending: updating } = useUpdateArticle();

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [authorName, setAuthorName] = useState(article?.authorName ?? "");
  const [category, setCategory] = useState<Category>(
    article?.category ?? Category.RawMill,
  );
  const [status, setStatus] = useState<ArticleStatus>(
    article?.status ?? ArticleStatus.draft,
  );
  const [metaDescription, setMetaDescription] = useState(
    article?.metaDescription ?? "",
  );
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    article?.featuredImageUrl ?? "",
  );

  const isPending = creating || updating;

  function toSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleTitleChange(v: string) {
    setTitle(v);
    if (!isEdit) setSlug(toSlug(v));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For edit: preserve existing publishDate. For create: use current ISO datetime.
    const publishDate: string =
      article?.publishDate ?? new Date().toISOString();

    if (isEdit) {
      const input: UpdateArticleInput = {
        id: article.id,
        title,
        slug,
        excerpt,
        content,
        authorName,
        category,
        status,
        metaDescription,
        publishDate,
        ...(featuredImageUrl ? { featuredImageUrl } : {}),
      };
      updateArticle(input, {
        onSuccess: () => {
          toast.success("Article updated");
          onClose();
        },
        onError: () => toast.error("Failed to update article"),
      });
    } else {
      const input: CreateArticleInput = {
        title,
        slug,
        excerpt,
        content,
        authorName,
        category,
        status,
        metaDescription,
        publishDate,
        ...(featuredImageUrl ? { featuredImageUrl } : {}),
      };
      createArticle(input, {
        onSuccess: () => {
          toast.success("Article created");
          onClose();
        },
        onError: () => toast.error("Failed to create article"),
      });
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="admin.article_form_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEdit ? "Edit Article" : "Create Article"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title" className="font-display text-sm">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                data-ocid="admin.article_form.title_input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug" className="font-display text-sm">
                Slug
              </Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                data-ocid="admin.article_form.slug_input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author" className="font-display text-sm">
                Author
              </Label>
              <Input
                id="author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                data-ocid="admin.article_form.author_input"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-display text-sm">Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as Category)}
              >
                <SelectTrigger data-ocid="admin.article_form.category_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-display text-sm">Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as ArticleStatus)}
              >
                <SelectTrigger data-ocid="admin.article_form.status_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ArticleStatus.draft}>Draft</SelectItem>
                  <SelectItem value={ArticleStatus.published}>
                    Published
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="excerpt" className="font-display text-sm">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                data-ocid="admin.article_form.excerpt_textarea"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="content" className="font-display text-sm">
                Content (HTML)
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="font-mono text-sm"
                data-ocid="admin.article_form.content_textarea"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="meta" className="font-display text-sm">
                Meta Description
              </Label>
              <Input
                id="meta"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                data-ocid="admin.article_form.meta_input"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image" className="font-display text-sm">
                Featured Image URL
              </Label>
              <Input
                id="image"
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                placeholder="https://…"
                data-ocid="admin.article_form.image_input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="font-display"
              data-ocid="admin.article_form.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="font-display"
              data-ocid="admin.article_form.submit_button"
            >
              {isPending
                ? isEdit
                  ? "Saving…"
                  : "Creating…"
                : isEdit
                  ? "Save Changes"
                  : "Create Article"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
