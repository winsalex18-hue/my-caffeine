import { CartItem } from "@/components/CartItem";
import { Layout } from "@/components/Layout";
import { DELIVERY_FEE, OrderSummary } from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { motion } from "motion/react";

export function CartPage() {
  const { items, totalPrice, clearCart } = useCartContext();
  const navigate = useNavigate();
  const grandTotal = totalPrice + DELIVERY_FEE;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Page heading */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            عربة التسوق
          </h1>
          {items.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10 gap-1.5"
              onClick={clearCart}
              data-ocid="cart.clear_button"
            >
              <Trash2 className="w-4 h-4" />
              إفراغ السلة
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-display font-semibold text-xl text-foreground mb-2">
              سلتك فارغة!
            </h2>
            <p className="text-muted-foreground mb-6">
              لم تقم بإضافة أي منتجات بعد. تصفح عروضنا وابدأ التسوق!
            </p>
            <Link to="/">
              <Button
                type="button"
                className="btn-primary"
                data-ocid="cart.go_to_store_button"
              >
                تصفح المتجر
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Items list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
              data-ocid="cart.list"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={String(item.product.id)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <CartItem item={item} index={idx + 1} />
                </motion.div>
              ))}
            </motion.div>

            {/* Order summary */}
            <OrderSummary items={items} totalPrice={totalPrice} showDelivery />

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  data-ocid="cart.continue_shopping_button"
                >
                  متابعة التسوق
                </Button>
              </Link>
              <Button
                type="button"
                className="flex-1 btn-primary text-base py-3"
                onClick={() => navigate({ to: "/checkout" })}
                data-ocid="cart.checkout_button"
              >
                إتمام الشراء • {grandTotal.toLocaleString("ar-SA")} ريال
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
