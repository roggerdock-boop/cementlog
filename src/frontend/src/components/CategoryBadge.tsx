import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/types";

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-display tracking-wide",
        CATEGORY_COLORS[category],
        className,
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
