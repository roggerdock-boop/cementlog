// REST API types — replaces IC/Motoko actor types

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorName: string;
  category: Category;
  metaDescription: string;
  featuredImageUrl?: string;
  status: ArticleStatus;
  publishDate: string; // ISO datetime string
  lastUpdated: string; // ISO datetime string
  viewCount: number;
}

export interface ArticleListResult {
  articles: Article[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ListArticlesFilter {
  status?: ArticleStatus;
  sortBy: SortBy;
  page: number;
  pageSize: number;
  category?: Category;
}

export type ArticleId = string;

export interface CreateArticleInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  category: Category;
  metaDescription: string;
  featuredImageUrl?: string;
  status: ArticleStatus;
  publishDate: string; // ISO datetime string
}

export interface UpdateArticleInput {
  id: ArticleId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  category: Category;
  metaDescription: string;
  featuredImageUrl?: string;
  status: ArticleStatus;
  publishDate: string; // ISO datetime string
}

export enum ArticleStatus {
  published = "published",
  draft = "draft",
}

export enum Category {
  AFR = "AFR",
  EnergyOptimization = "EnergyOptimization",
  Kiln = "Kiln",
  CementMill = "CementMill",
  RawMill = "RawMill",
}

export enum SortBy {
  date = "date",
  viewCount = "viewCount",
}
