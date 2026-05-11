import { l as useAuth, j as jsxRuntimeExports, L as Layout, b as Button, f as Link, m as LayoutDashboard } from "./index-rhh0vFVk.js";
import { L as LogIn, l as ProductsManager } from "./ProductsManager-D7TVN5nC.js";
import "./input-DQY78B54.js";
import "./index-BTpX0P5C.js";
import "./index-BopmQW4X.js";
import "./useQueries-fHUPB9z9.js";
import "./formatPrice-BFAKJb9E.js";
import "./plus-DAh27geX.js";
import "./package-BAUO0tnl.js";
function DashboardProductsPage() {
  const { isAuthenticated, login, isOwner } = useAuth();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-4xl", dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-16 h-16 text-muted-foreground mb-6 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "تسجيل الدخول مطلوب" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "يجب تسجيل الدخول لإدارة المنتجات" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: login, size: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 ml-2" }),
        "تسجيل الدخول"
      ] })
    ] }) }) });
  }
  if (!isOwner) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-4xl", dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-destructive mb-4", children: "غير مصرح لكم بالوصول" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", "data-ocid": "products_page.back_button", children: "العودة للوحة التحكم" }) })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "إدارة المنتجات" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          "data-ocid": "products_page.back_button",
          children: "لوحة التحكم"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsManager, {})
  ] }) });
}
export {
  DashboardProductsPage
};
