import { useAdmin } from "@/hooks/useAdmin";
import type {
  Article,
  ArticleId,
  ArticleListResult,
  CreateArticleInput,
  ListArticlesFilter,
  UpdateArticleInput,
} from "@/types";
import { ArticleStatus, SortBy } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API = "/api";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, options);
  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = (await res.json()) as { error?: string; message?: string };
      message = body.error ?? body.message ?? message;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

function authHeaders(token: string | null): HeadersInit {
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

// ── List articles ──────────────────────────────────────────────────────────────

export function useListArticles(
  filter?: Partial<ListArticlesFilter> & { showAll?: boolean },
) {
  const mergedFilter = {
    sortBy: filter?.sortBy ?? SortBy.date,
    page: filter?.page ?? 1,
    pageSize: filter?.pageSize ?? 12,
    ...(filter?.showAll
      ? {}
      : { status: filter?.status ?? ArticleStatus.published }),
    ...(filter?.category ? { category: filter.category } : {}),
  };

  return useQuery<ArticleListResult>({
    queryKey: ["articles", "list", mergedFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(mergedFilter.page));
      params.set("pageSize", String(mergedFilter.pageSize));
      params.set("sortBy", mergedFilter.sortBy);
      if (mergedFilter.status) params.set("status", mergedFilter.status);
      if (mergedFilter.category) params.set("category", mergedFilter.category);
      return apiFetch<ArticleListResult>(`/articles?${params.toString()}`);
    },
  });
}

// ── Get single article by id ───────────────────────────────────────────────────

export function useArticle(id: ArticleId | undefined) {
  return useQuery<Article | null>({
    queryKey: ["articles", "id", id],
    queryFn: async () => {
      if (!id) return null;
      return apiFetch<Article>(`/articles/${id}`);
    },
    enabled: id !== undefined,
  });
}

// ── Get article by slug ────────────────────────────────────────────────────────

export function useArticleBySlug(slug: string | undefined) {
  return useQuery<Article | null>({
    queryKey: ["articles", "slug", slug],
    queryFn: async () => {
      if (!slug) return null;
      return apiFetch<Article>(`/articles/slug/${slug}`);
    },
    enabled: !!slug,
  });
}

// ── Search articles ────────────────────────────────────────────────────────────

export function useSearchArticles(query: string) {
  return useQuery<Article[]>({
    queryKey: ["articles", "search", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const params = new URLSearchParams({ q: query });
      return apiFetch<Article[]>(`/articles/search?${params.toString()}`);
    },
    enabled: query.trim().length > 0,
  });
}

// ── Latest articles ────────────────────────────────────────────────────────────

export function useLatestArticles(n = 6) {
  return useQuery<Article[]>({
    queryKey: ["articles", "latest", n],
    queryFn: () => apiFetch<Article[]>(`/articles/latest?limit=${n}`),
  });
}

// ── Popular articles ───────────────────────────────────────────────────────────

export function usePopularArticles(n = 5) {
  return useQuery<Article[]>({
    queryKey: ["articles", "popular", n],
    queryFn: () => apiFetch<Article[]>(`/articles/popular?limit=${n}`),
  });
}

// ── Increment view count ───────────────────────────────────────────────────────

export function useIncrementViewCount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: ArticleId) =>
      apiFetch<void>(`/articles/${id}/view`, { method: "POST" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

// ── Create article ─────────────────────────────────────────────────────────────

export function useCreateArticle() {
  const { token } = useAdmin();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateArticleInput) =>
      apiFetch<Article>("/articles", {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

// ── Update article ─────────────────────────────────────────────────────────────

export function useUpdateArticle() {
  const { token } = useAdmin();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateArticleInput) =>
      apiFetch<void>(`/articles/${input.id}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

// ── Delete article ─────────────────────────────────────────────────────────────

export function useDeleteArticle() {
  const { token } = useAdmin();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: ArticleId) =>
      apiFetch<void>(`/articles/${id}`, {
        method: "DELETE",
        headers: authHeaders(token),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

// ── Admin login ────────────────────────────────────────────────────────────────

export function useAdminLogin() {
  const { setToken } = useAdmin();
  return useMutation({
    mutationFn: async ({
      username,
      passwordHash,
    }: {
      username: string;
      passwordHash: string;
    }) => {
      const res = await apiFetch<{ token: string; message: string }>(
        "/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, passwordHash }),
        },
      );
      setToken(res.token);
      return res.token;
    },
  });
}

// ── Admin logout ───────────────────────────────────────────────────────────────

export function useAdminLogout() {
  const { token, clearToken } = useAdmin();
  return useMutation({
    mutationFn: async () => {
      if (token) {
        await apiFetch<void>("/admin/logout", {
          method: "POST",
          headers: authHeaders(token),
        });
      }
      clearToken();
    },
  });
}

// ── Admin verify token ─────────────────────────────────────────────────────────

export function useVerifyAdminToken() {
  const { token } = useAdmin();
  return useQuery<boolean>({
    queryKey: ["admin", "verify", token],
    queryFn: async () => {
      if (!token) return false;
      const res = await apiFetch<{ valid: boolean }>("/admin/verify", {
        headers: authHeaders(token),
      });
      return res.valid;
    },
    enabled: !!token,
    staleTime: 5 * 60_000,
  });
}
