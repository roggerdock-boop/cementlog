import { j as jsxRuntimeExports, c as cn } from "./index-BgVkh6qM.js";
import { a as CATEGORY_LABELS, v as CATEGORY_COLORS } from "./useArticles-C4geP0DZ.js";
function CategoryBadge({ category, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-display tracking-wide",
        CATEGORY_COLORS[category],
        className
      ),
      children: CATEGORY_LABELS[category]
    }
  );
}
export {
  CategoryBadge as C
};
