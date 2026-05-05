import { j as jsxRuntimeExports, c as cn, S as Skeleton, L as Link, r as reactExports, u as useSearch, a as useNavigate } from "./index-BgVkh6qM.js";
import { C as CategoryBadge } from "./CategoryBadge-CgY9QkkO.js";
import { U as User, C as Calendar } from "./user-D7qT-972.js";
import { c as createLucideIcon, E as Eye, u as useComposedRefs, L as Layout, S as Search, I as Input, B as Button, X, C as CATEGORIES, a as CATEGORY_LABELS, b as useSearchArticles, d as useListArticles, e as useLatestArticles, f as usePopularArticles } from "./useArticles-C4geP0DZ.js";
import { u as useId, P as Primitive, c as composeEventHandlers, a as createContextScope, b as createCollection, d as useDirection, e as useControllableState, f as useCallbackRef, g as Presence } from "./index-DGSilWL8.js";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function ArticleCard({ article }) {
  const imageUrl = article.featuredImageUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/articles/$slug",
      params: { slug: article.slug },
      "data-ocid": "article.card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group flex flex-col h-full overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-smooth bg-card cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden h-44 bg-muted flex-shrink-0", children: [
          imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: article.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-12 h-12 text-muted-foreground opacity-30",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: article.category }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2", children: article.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1", children: article.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: article.authorName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                formatDate(article.publishDate)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                Number(article.viewCount).toLocaleString()
              ] })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function ArticleCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex flex-col h-full overflow-hidden border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col p-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
      ] })
    ] })
  ] });
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const PAGE_SIZE = 9;
function ArticleGrid({
  articles,
  isLoading
}) {
  if (isLoading) {
    const skeletonKeys = ["a", "b", "c", "d", "e", "f"];
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        "data-ocid": "articles.loading_state",
        children: skeletonKeys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCardSkeleton, {}, k))
      }
    );
  }
  if (!articles || articles.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 text-center",
        "data-ocid": "articles.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-1", children: "No articles found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Try adjusting your filters or search query to find relevant articles." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: articles.map((article, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `article.item.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCard, { article }) }, article.id.toString())) });
}
function FilteredArticles({
  category,
  page,
  onPageChange
}) {
  const filter = {
    ...category ? { category } : {},
    page,
    pageSize: PAGE_SIZE
  };
  const { data, isLoading } = useListArticles(filter);
  const total = data ? data.total : 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleGrid, { articles: data == null ? void 0 : data.articles, isLoading }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-center gap-2 pt-4",
        "data-ocid": "articles.pagination",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => onPageChange(page - 1),
              disabled: page <= 1,
              "data-ocid": "articles.pagination_prev",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                " Previous"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground px-2", children: [
            "Page ",
            page,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => onPageChange(page + 1),
              disabled: page >= totalPages,
              "data-ocid": "articles.pagination_next",
              children: [
                "Next ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function SearchResults({ query }) {
  const { data, isLoading } = useSearchArticles(query);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleGrid, { articles: data, isLoading });
}
function LatestTab() {
  const { data, isLoading } = useLatestArticles(12);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleGrid, { articles: data, isLoading });
}
function PopularTab() {
  const { data, isLoading } = usePopularArticles(12);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleGrid, { articles: data, isLoading });
}
function Home() {
  const searchParams = useSearch({ from: "/" });
  const navigate = useNavigate();
  const searchQuery = searchParams.search ?? "";
  const [selectedCategory, setSelectedCategory] = reactExports.useState(
    searchParams.category ? searchParams.category : null
  );
  const [page, setPage] = reactExports.useState(searchParams.page ?? 1);
  const [searchInput, setSearchInput] = reactExports.useState(searchQuery);
  const isSearching = searchQuery.trim().length > 0;
  const handleCategoryClick = reactExports.useCallback(
    (cat) => {
      setSelectedCategory(cat);
      setPage(1);
      void navigate({
        to: "/",
        search: (prev) => ({
          ...prev,
          category: cat ?? void 0,
          page: void 0
        })
      });
    },
    [navigate]
  );
  const handleSearchSubmit = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      void navigate({
        to: "/",
        search: (prev) => ({
          ...prev,
          search: searchInput.trim() || void 0
        })
      });
    },
    [searchInput, navigate]
  );
  const handleClearSearch = reactExports.useCallback(() => {
    setSearchInput("");
    void navigate({
      to: "/",
      search: (prev) => ({ ...prev, search: void 0 })
    });
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-b border-border",
        "data-ocid": "home.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-block w-6 h-1 bg-primary rounded-full",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-primary uppercase tracking-widest font-display", children: "Technical Knowledge Base" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4", children: "CementHub" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-8", children: "Technical knowledge for cement plant professionals" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearchSubmit, className: "flex gap-2 max-w-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "search",
                  placeholder: "Search articles\\u2026",
                  value: searchInput,
                  onChange: (e) => setSearchInput(e.target.value),
                  className: "pl-9 font-body",
                  "data-ocid": "home.search_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", "data-ocid": "home.search_submit", children: "Search" }),
            isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: handleClearSearch,
                "aria-label": "Clear search",
                "data-ocid": "home.search_clear",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background border-b border-border sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 py-3 overflow-x-auto",
        style: { scrollbarWidth: "none" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleCategoryClick(null),
              className: `flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium font-display transition-smooth border ${selectedCategory === null ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
              "data-ocid": "category.filter.all",
              children: "All Topics"
            }
          ),
          CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleCategoryClick(cat),
              className: `flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium font-display transition-smooth border ${selectedCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
              "data-ocid": `category.filter.${cat.toLowerCase()}`,
              children: CATEGORY_LABELS[cat]
            },
            cat
          ))
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold text-foreground", children: [
          "Results for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
            "“",
            searchQuery,
            "”"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: handleClearSearch,
            "data-ocid": "search.clear_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1" }),
              " Clear"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SearchResults, { query: searchQuery })
    ] }) : selectedCategory !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Articles in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategoryBadge,
          {
            category: selectedCategory,
            className: "text-sm py-1 px-3"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilteredArticles,
        {
          category: selectedCategory,
          page,
          onPageChange: setPage
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "latest", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsList,
        {
          className: "bg-muted p-1 rounded-lg",
          "data-ocid": "articles.tab_list",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "latest",
                className: "font-display font-medium",
                "data-ocid": "articles.tab.latest",
                children: "Latest Articles"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "popular",
                className: "font-display font-medium",
                "data-ocid": "articles.tab.popular",
                children: "Popular Articles"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "latest", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LatestTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "popular", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PopularTab, {}) })
    ] }) }) })
  ] });
}
export {
  Home as default
};
