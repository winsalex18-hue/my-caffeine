import { c as createLucideIcon, u as useCartContext, e as useNavigate, g as useActor, r as reactExports, j as jsxRuntimeExports, L as Layout, f as Link, b as Button, h as createActor } from "./index-rhh0vFVk.js";
import { O as OrderSummary } from "./OrderSummary-CZ1Y0N6i.js";
import { u as useMutation, I as Input } from "./input-DQY78B54.js";
import { L as Label, T as Textarea, u as ue } from "./index-BTpX0P5C.js";
import { S as ShoppingBag } from "./shopping-bag-PZkkPtY3.js";
import { m as motion } from "./proxy-ZStiZ0Zg.js";
import "./index-BopmQW4X.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode);
function validate(values) {
  const errors = {};
  if (!values.customerName.trim()) errors.customerName = "اسم العميل مطلوب";
  if (!values.customerPhone.trim()) errors.customerPhone = "رقم الجوال مطلوب";
  if (!values.deliveryAddress.trim())
    errors.deliveryAddress = "عنوان التوصيل مطلوب";
  return errors;
}
function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartContext();
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const [form, setForm] = reactExports.useState({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
    deliveryTime: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("غير متصل");
      const req = {
        customerName: form.customerName.trim(),
        customerPhone: form.customerPhone.trim(),
        deliveryAddress: form.deliveryAddress.trim(),
        deliveryTime: form.deliveryTime.trim() || "غير محدد",
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: BigInt(i.quantity),
          unitPrice: i.product.price
        }))
      };
      return actor.placeOrder(req);
    },
    onSuccess: (order) => {
      clearCart();
      navigate({
        to: "/order-confirmation",
        search: { orderId: String(order.id) }
      });
    },
    onError: () => {
      ue.error("حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.");
    }
  });
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: void 0 }));
    }
  }
  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const result = validate({ ...form });
    setErrors(result);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const allTouched = {
      customerName: true,
      customerPhone: true,
      deliveryAddress: true,
      deliveryTime: true
    };
    setTouched(allTouched);
    const result = validate(form);
    setErrors(result);
    if (Object.keys(result).length > 0) return;
    mutation.mutate();
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-16 h-16 text-muted-foreground/30 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl mb-3", children: "سلتك فارغة" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "أضف منتجات إلى السلة أولاً قبل إتمام الشراء." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", "data-ocid": "checkout.go_to_store_button", children: "تصفح المتجر" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-6 h-6 text-primary" }),
      "إتمام الشراء"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, noValidate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "lg:col-span-3 space-y-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground border-b border-border pb-2", children: "بيانات التوصيل" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "customerName", className: "text-sm font-medium", children: [
                "الاسم الكامل ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "customerName",
                  type: "text",
                  placeholder: "مثال: محمد أحمد",
                  value: form.customerName,
                  onChange: (e) => handleChange("customerName", e.target.value),
                  onBlur: () => handleBlur("customerName"),
                  className: errors.customerName && touched.customerName ? "border-destructive" : "",
                  "data-ocid": "checkout.customer_name_input"
                }
              ),
              errors.customerName && touched.customerName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-xs",
                  "data-ocid": "checkout.customer_name_input.field_error",
                  children: errors.customerName
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "customerPhone",
                  className: "text-sm font-medium",
                  children: [
                    "رقم الجوال ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "customerPhone",
                  type: "tel",
                  placeholder: "05xxxxxxxx",
                  value: form.customerPhone,
                  onChange: (e) => handleChange("customerPhone", e.target.value),
                  onBlur: () => handleBlur("customerPhone"),
                  className: errors.customerPhone && touched.customerPhone ? "border-destructive" : "",
                  "data-ocid": "checkout.phone_input"
                }
              ),
              errors.customerPhone && touched.customerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-xs",
                  "data-ocid": "checkout.phone_input.field_error",
                  children: errors.customerPhone
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "deliveryAddress",
                  className: "text-sm font-medium",
                  children: [
                    "عنوان التوصيل ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "deliveryAddress",
                  placeholder: "مثال: شارع الملك فهد، حي الملك، مبنى 5 شقة 12",
                  rows: 3,
                  value: form.deliveryAddress,
                  onChange: (e) => handleChange("deliveryAddress", e.target.value),
                  onBlur: () => handleBlur("deliveryAddress"),
                  className: errors.deliveryAddress && touched.deliveryAddress ? "border-destructive" : "",
                  "data-ocid": "checkout.address_textarea"
                }
              ),
              errors.deliveryAddress && touched.deliveryAddress && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-xs",
                  "data-ocid": "checkout.address_textarea.field_error",
                  children: errors.deliveryAddress
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "deliveryTime", className: "text-sm font-medium", children: [
                "وقت التوصيل المفضل",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(اختياري)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "deliveryTime",
                  type: "datetime-local",
                  value: form.deliveryTime,
                  onChange: (e) => handleChange("deliveryTime", e.target.value),
                  "data-ocid": "checkout.delivery_time_input"
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "lg:col-span-2 space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              OrderSummary,
              {
                items,
                totalPrice,
                showDelivery: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full btn-primary text-base py-3",
                disabled: mutation.isPending || !actor,
                "data-ocid": "checkout.submit_button",
                children: mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full w-4 h-4" }),
                  "جاري إرسال الطلب…"
                ] }) : "تأكيد الطلب"
              }
            ),
            mutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-sm text-center",
                "data-ocid": "checkout.error_state",
                children: "حدث خطأ. يرجى المحاولة مرة أخرى."
              }
            )
          ]
        }
      )
    ] }) })
  ] }) });
}
export {
  CheckoutPage
};
