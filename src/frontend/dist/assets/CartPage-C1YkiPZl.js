import { u as useCartContext, j as jsxRuntimeExports, b as Button, e as useNavigate, L as Layout, S as ShoppingCart, f as Link } from "./index-rhh0vFVk.js";
import { f as formatPrice, T as Trash2 } from "./formatPrice-BFAKJb9E.js";
import { M as Minus } from "./minus-CiBb6pce.js";
import { P as Plus } from "./plus-DAh27geX.js";
import { O as OrderSummary, D as DELIVERY_FEE } from "./OrderSummary-CZ1Y0N6i.js";
import { m as motion } from "./proxy-ZStiZ0Zg.js";
import { S as ShoppingBag } from "./shopping-bag-PZkkPtY3.js";
function CartItem({ item, index }) {
  const { updateQuantity, removeItem } = useCartContext();
  const { product, quantity } = item;
  const subtotal = Number(product.price) / 100 * quantity;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-4 p-4 bg-card rounded-xl border border-border items-start",
      "data-ocid": `cart.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted", children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.imageUrl,
            alt: product.name,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-2xl", children: "🛒" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-snug truncate", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold text-sm mt-1", children: formatPrice(product.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "icon",
                className: "h-8 w-8 rounded-full",
                onClick: () => updateQuantity(product.id, quantity - 1),
                "aria-label": "تقليل الكمية",
                "data-ocid": `cart.decrease_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-8 text-center text-sm font-semibold tabular-nums",
                "data-ocid": `cart.quantity.${index}`,
                children: quantity
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "icon",
                className: "h-8 w-8 rounded-full",
                onClick: () => updateQuantity(product.id, quantity + 1),
                disabled: quantity >= Number(product.stock),
                "aria-label": "زيادة الكمية",
                "data-ocid": `cart.increase_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-sm whitespace-nowrap", children: [
            subtotal.toLocaleString("ar-SA", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            }),
            " ",
            "ريال"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full",
              onClick: () => removeItem(product.id),
              "aria-label": "إزالة المنتج",
              "data-ocid": `cart.delete_button.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] })
      ]
    }
  );
}
function CartPage() {
  const { items, totalPrice, clearCart } = useCartContext();
  const navigate = useNavigate();
  const grandTotal = totalPrice + DELIVERY_FEE;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-6 h-6 text-primary" }),
        "عربة التسوق"
      ] }),
      items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "text-destructive hover:bg-destructive/10 gap-1.5",
          onClick: clearCart,
          "data-ocid": "cart.clear_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
            "إفراغ السلة"
          ]
        }
      )
    ] }),
    items.length === 0 ? (
      /* Empty state */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "text-center py-20",
          "data-ocid": "cart.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-20 h-20 text-muted-foreground/30 mx-auto mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "سلتك فارغة!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "لم تقم بإضافة أي منتجات بعد. تصفح عروضنا وابدأ التسوق!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "btn-primary",
                "data-ocid": "cart.go_to_store_button",
                children: "تصفح المتجر"
              }
            ) })
          ]
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "space-y-3",
          "data-ocid": "cart.list",
          children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: idx * 0.06 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartItem, { item, index: idx + 1 })
            },
            String(item.product.id)
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrderSummary, { items, totalPrice, showDelivery: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "w-full",
            "data-ocid": "cart.continue_shopping_button",
            children: "متابعة التسوق"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "flex-1 btn-primary text-base py-3",
            onClick: () => navigate({ to: "/checkout" }),
            "data-ocid": "cart.checkout_button",
            children: [
              "إتمام الشراء • ",
              grandTotal.toLocaleString("ar-SA"),
              " ريال"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  CartPage
};
