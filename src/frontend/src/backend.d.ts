import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface ListArticlesFilter {
    status?: ArticleStatus;
    sortBy: SortBy;
    page: bigint;
    pageSize: bigint;
    category?: Category;
}
export type ArticleId = bigint;
export interface CreateArticleInput {
    metaDescription: string;
    status: ArticleStatus;
    title: string;
    content: string;
    publishDate: Timestamp;
    slug: string;
    authorName: string;
    featuredImageUrl?: string;
    excerpt: string;
    category: Category;
}
export interface UpdateArticleInput {
    id: ArticleId;
    metaDescription: string;
    status: ArticleStatus;
    title: string;
    content: string;
    publishDate: Timestamp;
    slug: string;
    authorName: string;
    featuredImageUrl?: string;
    excerpt: string;
    category: Category;
}
export interface ArticleListResult {
    total: bigint;
    articles: Array<Article>;
    page: bigint;
    pageSize: bigint;
}
export interface Article {
    id: ArticleId;
    metaDescription: string;
    status: ArticleStatus;
    title: string;
    content: string;
    publishDate: Timestamp;
    slug: string;
    authorName: string;
    lastUpdated: Timestamp;
    viewCount: bigint;
    featuredImageUrl?: string;
    excerpt: string;
    category: Category;
}
export enum ArticleStatus {
    published = "published",
    draft = "draft"
}
export enum Category {
    AFR = "AFR",
    EnergyOptimization = "EnergyOptimization",
    Kiln = "Kiln",
    CementMill = "CementMill",
    RawMill = "RawMill"
}
export enum SortBy {
    date = "date",
    viewCount = "viewCount"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminLogin(username: string, passwordHash: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminLogout(token: string): Promise<void>;
    adminVerifyToken(token: string): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArticle(token: string | null, input: CreateArticleInput): Promise<ArticleId>;
    deleteArticle(token: string | null, id: ArticleId): Promise<void>;
    getArticle(id: ArticleId): Promise<Article | null>;
    getArticleBySlug(slug: string): Promise<Article | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLatestArticles(n: bigint): Promise<Array<Article>>;
    getPopularArticles(n: bigint): Promise<Array<Article>>;
    incrementViewCount(id: ArticleId): Promise<void>;
    isAdmin(token: string | null): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    listArticles(filter: ListArticlesFilter): Promise<ArticleListResult>;
    searchArticles(searchTerm: string): Promise<Array<Article>>;
    updateArticle(token: string | null, input: UpdateArticleInput): Promise<void>;
}
