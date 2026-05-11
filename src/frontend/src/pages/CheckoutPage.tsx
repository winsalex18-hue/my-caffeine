import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import { OrderSummary } from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartContext } from "@/context/CartContext";
import type { OrderRequest } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ClipboardList, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface FormValues {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryTime: string;
}

interface FormErrors {
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.customerName.trim()) errors.customerName = "اسم العميل مطلوب";
  if (!values.customerPhone.trim()) errors.customerPhone = "رقم الجوال مطلوب";
  if (!values.deliveryAddress.trim())
    errors.deliveryAddress = "عنوان التوصيل مطلوب";
  return errors;
}

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartContext();
  const navigate = useNavigate();
  const { actor } = useActor(createActor);

  const [form, setForm] = useState<FormValues>({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
    deliveryTime: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("غير متصل");
      const req: OrderRequest = {
        customerName: form.customerName.trim(),
        customerPhone: form.customerPhone.trim(),
        deliveryAddress: form.deliveryAddress.trim(),
        deliveryTime: form.deliveryTime.trim() || "غير محدد",
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: BigInt(i.quantity),
          unitPrice: i.product.price,
        })),
      };
      return actor.placeOrder(req);
    },
    onSuccess: (order) => {
      clearCart();
      navigate({
        to: "/order-confirmation",
        search: { orderId: String(order.id) },
      });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.");
    },
  });

  function handleChange(field: keyof FormValues, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const result = validate({ ...form });
    setErrors(result);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = {
      customerName: true,
      customerPhone: true,
      deliveryAddress: true,
      deliveryTime: true,
    };
    setTouched(allTouched);
    const result = validate(form);
    setErrors(result);
    if (Object.keys(result).length > 0) return;
    mutation.mutate();
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center max-w-md">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="font-display font-semibold text-xl mb-3">
            سلتك فارغة
          </h2>
          <p className="text-muted-foreground mb-6">
            أضف منتجات إلى السلة أولاً قبل إتمام الشراء.
          </p>
          <Link to="/">
            <Button type="button" data-ocid="checkout.go_to_store_button">
              تصفح المتجر
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page heading */}
        <h1 className="font-display font-bold text-2xl text-foreground mb-6 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-primary" />
          إتمام الشراء
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3 space-y-6"
            >
              {/* Delivery info section */}
              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                <h2 className="font-display font-semibold text-foreground border-b border-border pb-2">
                  بيانات التوصيل
                </h2>

                {/* Customer name */}
                <div className="space-y-1.5">
                  <Label htmlFor="customerName" className="text-sm font-medium">
                    الاسم الكامل <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="مثال: محمد أحمد"
                    value={form.customerName}
                    onChange={(e) =>
                      handleChange("customerName", e.target.value)
                    }
                    onBlur={() => handleBlur("customerName")}
                    className={
                      errors.customerName && touched.customerName
                        ? "border-destructive"
                        : ""
                    }
                    data-ocid="checkout.customer_name_input"
                  />
                  {errors.customerName && touched.customerName && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="checkout.customer_name_input.field_error"
                    >
                      {errors.customerName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="customerPhone"
                    className="text-sm font-medium"
                  >
                    رقم الجوال <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder="05xxxxxxxx"
                    value={form.customerPhone}
                    onChange={(e) =>
                      handleChange("customerPhone", e.target.value)
                    }
                    onBlur={() => handleBlur("customerPhone")}
                    className={
                      errors.customerPhone && touched.customerPhone
                        ? "border-destructive"
                        : ""
                    }
                    data-ocid="checkout.phone_input"
                  />
                  {errors.customerPhone && touched.customerPhone && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="checkout.phone_input.field_error"
                    >
                      {errors.customerPhone}
                    </p>
                  )}
                </div>

                {/* Delivery address */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="deliveryAddress"
                    className="text-sm font-medium"
                  >
                    عنوان التوصيل <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="deliveryAddress"
                    placeholder="مثال: شارع الملك فهد، حي الملك، مبنى 5 شقة 12"
                    rows={3}
                    value={form.deliveryAddress}
                    onChange={(e) =>
                      handleChange("deliveryAddress", e.target.value)
                    }
                    onBlur={() => handleBlur("deliveryAddress")}
                    className={
                      errors.deliveryAddress && touched.deliveryAddress
                        ? "border-destructive"
                        : ""
                    }
                    data-ocid="checkout.address_textarea"
                  />
                  {errors.deliveryAddress && touched.deliveryAddress && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="checkout.address_textarea.field_error"
                    >
                      {errors.deliveryAddress}
                    </p>
                  )}
                </div>

                {/* Delivery time */}
                <div className="space-y-1.5">
                  <Label htmlFor="deliveryTime" className="text-sm font-medium">
                    وقت التوصيل المفضل{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      (اختياري)
                    </span>
                  </Label>
                  <Input
                    id="deliveryTime"
                    type="datetime-local"
                    value={form.deliveryTime}
                    onChange={(e) =>
                      handleChange("deliveryTime", e.target.value)
                    }
                    data-ocid="checkout.delivery_time_input"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Summary + submit */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-4"
            >
              <OrderSummary
                items={items}
                totalPrice={totalPrice}
                showDelivery
              />

              <Button
                type="submit"
                className="w-full btn-primary text-base py-3"
                disabled={mutation.isPending || !actor}
                data-ocid="checkout.submit_button"
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full w-4 h-4" />
                    جاري إرسال الطلب…
                  </span>
                ) : (
                  "تأكيد الطلب"
                )}
              </Button>

              {mutation.isError && (
                <p
                  className="text-destructive text-sm text-center"
                  data-ocid="checkout.error_state"
                >
                  حدث خطأ. يرجى المحاولة مرة أخرى.
                </p>
              )}
            </motion.div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
