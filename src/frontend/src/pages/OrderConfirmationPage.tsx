import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Package,
  PhoneCall,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

export function OrderConfirmationPage() {
  const search = useSearch({ strict: false }) as { orderId?: string };
  const orderId = search?.orderId;

  const steps = [
    {
      icon: <Package className="w-5 h-5" />,
      label: "تم استلام طلبك",
      desc: "جاري مراجعة طلبك وتحضيره",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "تحضير الطلب",
      desc: "يقوم فريقنا بتجهيز طلبك بعناية",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      label: "توصيل للمنزل",
      desc: "سيصلك طلبك في أسرع وقت",
    },
  ];

  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-16 max-w-xl"
        data-ocid="order_success.page"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-card rounded-2xl border border-border shadow-subtle p-8 text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </motion.div>

          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            شكراً لطلبك! 🎉
          </h1>
          <p className="text-muted-foreground mb-4">
            تم استلام طلبك بنجاح. سنقوم بتحضيره وتوصيله إليك في أقرب وقت.
          </p>

          {orderId && (
            <div
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6"
              data-ocid="order_success.order_id"
            >
              <Package className="w-4 h-4" />
              رقم الطلب: #{orderId}
            </div>
          )}

          <Separator className="my-6" />

          {/* Next steps */}
          <h2 className="font-semibold text-foreground mb-4 text-sm">
            ماذا يحدث بعد ذلك؟
          </h2>
          <div className="space-y-3 text-start mb-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 p-3 bg-muted/40 rounded-lg"
              >
                <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </span>
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact note */}
          <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground mb-6">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>سنتواصل معك عبر الهاتف لتأكيد وقت التوصيل</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/" className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                data-ocid="order_success.continue_shopping_button"
              >
                <ShoppingBag className="w-4 h-4 ml-1.5" />
                متابعة التسوق
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
