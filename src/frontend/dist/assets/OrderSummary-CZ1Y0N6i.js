import { j as jsxRuntimeExports } from "./index-rhh0vFVk.js";
const DELIVERY_FEE = 5;
function OrderSummary({
  items,
  totalPrice,
  showDelivery = true
}) {
  const grandTotal = totalPrice + (showDelivery ? DELIVERY_FEE : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border border-border overflow-hidden",
      "data-ocid": "order.summary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "ملخص الطلب" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex justify-between items-center px-4 py-3 text-sm",
            "data-ocid": `order.summary.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground flex-1 truncate ml-2", children: [
                item.product.name,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground mr-1", children: [
                  "× ",
                  item.quantity
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium tabular-nums whitespace-nowrap", children: [
                (Number(item.product.price) / 100 * item.quantity).toLocaleString("ar-SA", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                }),
                " ",
                "ريال"
              ] })
            ]
          },
          String(item.product.id)
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-2 space-y-2 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "المجموع الفرعي" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
              totalPrice.toLocaleString("ar-SA"),
              " ريال"
            ] })
          ] }),
          showDelivery && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "رسوم التوصيل" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
              DELIVERY_FEE,
              " ريال"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base text-foreground pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الإجمالي" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums text-primary", children: [
              grandTotal.toLocaleString("ar-SA"),
              " ريال"
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  DELIVERY_FEE as D,
  OrderSummary as O
};
