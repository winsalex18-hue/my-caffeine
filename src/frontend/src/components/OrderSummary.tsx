import { formatPrice } from "@/lib/formatPrice";
import type { CartItem } from "@/types";

const DELIVERY_FEE = 5;

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
  showDelivery?: boolean;
}

export function OrderSummary({
  items,
  totalPrice,
  showDelivery = true,
}: OrderSummaryProps) {
  const grandTotal = totalPrice + (showDelivery ? DELIVERY_FEE : 0);

  return (
    <div
      className="bg-card rounded-xl border border-border overflow-hidden"
      data-ocid="order.summary"
    >
      <div className="px-4 py-3 bg-muted/40 border-b border-border">
        <h2 className="font-display font-semibold text-foreground text-sm">
          ملخص الطلب
        </h2>
      </div>

      {/* Items list */}
      <ul className="divide-y divide-border">
        {items.map((item, idx) => (
          <li
            key={String(item.product.id)}
            className="flex justify-between items-center px-4 py-3 text-sm"
            data-ocid={`order.summary.item.${idx + 1}`}
          >
            <span className="text-foreground flex-1 truncate ml-2">
              {item.product.name}
              <span className="text-muted-foreground mr-1">
                × {item.quantity}
              </span>
            </span>
            <span className="font-medium tabular-nums whitespace-nowrap">
              {(
                (Number(item.product.price) / 100) *
                item.quantity
              ).toLocaleString("ar-SA", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              ريال
            </span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="px-4 pb-4 pt-2 space-y-2 border-t border-border">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>المجموع الفرعي</span>
          <span className="tabular-nums">
            {totalPrice.toLocaleString("ar-SA")} ريال
          </span>
        </div>
        {showDelivery && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>رسوم التوصيل</span>
            <span className="tabular-nums">{DELIVERY_FEE} ريال</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-base text-foreground pt-2 border-t border-border">
          <span>الإجمالي</span>
          <span className="tabular-nums text-primary">
            {grandTotal.toLocaleString("ar-SA")} ريال
          </span>
        </div>
      </div>
    </div>
  );
}

export { DELIVERY_FEE };
