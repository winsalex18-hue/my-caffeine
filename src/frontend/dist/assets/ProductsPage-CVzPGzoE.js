import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, u as useCartContext, B as Badge, b as Button, S as ShoppingCart, d as Skeleton, r as reactExports, L as Layout } from "./index-rhh0vFVk.js";
import { C as CATEGORIES, X, u as useProducts } from "./useQueries-fHUPB9z9.js";
import { M as Minus } from "./minus-CiBb6pce.js";
import { P as Plus } from "./plus-DAh27geX.js";
import { I as Input } from "./input-DQY78B54.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["path", { d: "m17 13 5 5m-5 0 5-5", key: "im3w4b" }]
];
const PackageX = createLucideIcon("package-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function CategoryFilter({
  selected,
  onChange,
  counts
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide",
      role: "tablist",
      "aria-label": "تصفية حسب الفئة",
      "data-ocid": "products.category_filter",
      children: CATEGORIES.map((cat, i) => {
        const isActive = selected === cat;
        const count = counts == null ? void 0 : counts[cat];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": isActive,
            onClick: () => onChange(cat),
            "data-ocid": `products.category_tab.${i + 1}`,
            className: cn(
              "flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-smooth border whitespace-nowrap",
              isActive ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat }),
              count !== void 0 && !isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5", children: count })
            ]
          },
          cat
        );
      })
    }
  );
}
function formatPrice(fils) {
  const amount = Number(fils) / 100;
  return `${amount.toFixed(2)} ريال`;
}
function ProductCard({ product, index }) {
  const { isInCart, getQuantity, addItem, updateQuantity } = useCartContext();
  const inCart = isInCart(product.id);
  const qty = getQuantity(product.id);
  const outOfStock = !product.available || product.stock === 0n;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "card-elevated flex flex-col overflow-hidden group entrance-fade",
      style: { animationDelay: `${index % 12 * 50}ms` },
      "data-ocid": `products.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl || "/assets/images/placeholder.svg",
              alt: product.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              loading: "lazy",
              onError: (e) => {
                e.currentTarget.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          outOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/70 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground bg-card px-3 py-1 rounded-full border border-border", children: "نفذت الكمية" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-2 right-2 text-xs bg-card/90 text-foreground border border-border backdrop-blur-sm", children: product.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2", children: product.name }),
            product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed", children: product.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary text-base font-mono", children: formatPrice(product.price) }),
            product.stock > 0n && product.stock <= 5n && product.available && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-destructive", children: [
              "آخر ",
              Number(product.stock),
              " قطع"
            ] })
          ] }),
          !outOfStock && (inCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-primary/8 rounded-lg p-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 rounded-full hover:bg-primary/20 text-primary",
                onClick: () => updateQuantity(product.id, qty - 1),
                "aria-label": "تقليل الكمية",
                "data-ocid": `products.quantity_decrease.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-bold text-primary text-sm min-w-6 text-center",
                "aria-label": "الكمية",
                "data-ocid": `products.quantity.${index + 1}`,
                children: qty
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 rounded-full hover:bg-primary/20 text-primary",
                onClick: () => updateQuantity(product.id, qty + 1),
                "aria-label": "زيادة الكمية",
                "data-ocid": `products.quantity_increase.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "w-full gap-1.5 bg-primary text-primary-foreground hover:opacity-90 transition-smooth text-sm h-8",
              onClick: () => addItem(product),
              "data-ocid": `products.add_to_cart.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5" }),
                "أضف للسلة"
              ]
            }
          ))
        ] })
      ]
    }
  );
}
function ProductSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded-md" })
    ] })
  ] });
}
function ProductGrid({
  products,
  isLoading,
  emptyMessage = "لا توجد منتجات متاحة حالياً"
}) {
  if (isLoading) {
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: skeletons.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {}, n)) });
  }
  if (products.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4",
        "data-ocid": "products.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageX, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-display font-semibold text-lg", children: emptyMessage }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "جرّب تغيير فئة البحث أو كلمة البحث" })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, String(product.id))) });
}
function SearchBar({
  value,
  onChange,
  placeholder = "ابحث عن منتج..."
}) {
  const inputRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Search,
      {
        className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none",
        "aria-hidden": true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        ref: inputRef,
        type: "search",
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: "pr-9 pl-9 bg-background border-input focus-visible:ring-ring",
        dir: "rtl",
        "data-ocid": "products.search_input",
        "aria-label": "البحث عن المنتجات"
      }
    ),
    value && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          onChange("");
          (_a = inputRef.current) == null ? void 0 : _a.focus();
        },
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
        "aria-label": "مسح البحث",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
      }
    )
  ] });
}
function ProductsPage() {
  const { data: products = [], isLoading } = useProducts();
  const [search, setSearch] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState(
    CATEGORIES[0]
  );
  const categoryCounts = reactExports.useMemo(() => {
    const counts = {};
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat] = products.filter((p) => p.category === cat).length;
    }
    return counts;
  }, [products]);
  const filtered = reactExports.useMemo(() => {
    let result = products;
    if (selectedCategory !== CATEGORIES[0]) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, selectedCategory, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/8 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: "🛒 سوق الواحة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "تسوق أفضل المنتجات الطازجة والمنزلية بأسعار مميزة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { value: search, onChange: setSearch })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-16 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryFilter,
      {
        selected: selectedCategory,
        onChange: setSelectedCategory,
        counts: categoryCounts
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6", children: [
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
          " ",
          "منتج متاح"
        ] }) : null }),
        search && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "نتائج البحث عن:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            '"',
            search,
            '"'
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductGrid,
        {
          products: filtered,
          isLoading,
          emptyMessage: search ? `لا توجد نتائج لـ "${search}"` : `لا توجد منتجات في فئة "${selectedCategory}"`
        }
      )
    ] }) })
  ] });
}
export {
  ProductsPage
};
