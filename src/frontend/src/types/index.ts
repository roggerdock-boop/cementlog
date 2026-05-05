export { Category, ArticleStatus, SortBy } from "@/types/api";
export type {
  Article,
  ArticleListResult,
  ListArticlesFilter,
  CreateArticleInput,
  UpdateArticleInput,
  ArticleId,
} from "@/types/api";

import { Category } from "@/types/api";

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.RawMill]: "Raw Mill",
  [Category.CementMill]: "Cement Mill",
  [Category.Kiln]: "Kiln",
  [Category.AFR]: "AFR",
  [Category.EnergyOptimization]: "Energy Optimization",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.RawMill]:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  [Category.CementMill]:
    "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  [Category.Kiln]:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  [Category.AFR]:
    "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  [Category.EnergyOptimization]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
};

export const CATEGORIES = Object.values(Category);
