import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import type { CartItem as CartItemType } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  index: number;
}

export function CartItem({ item, index }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartContext();
  const { product, quantity } = item;
  const subtotal = (Number(product.price) / 100) * quantity;

  return (
    <div
      className="flex gap-4 p-4 bg-card rounded-xl border border-border items-start"
      data-ocid={`cart.item.${index}`}
    >
      {/* Product image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            🛒
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm leading-snug truncate">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs mt-0.5">
          {product.category}
        </p>
        <p className="text-primary font-bold text-sm mt-1">
          {formatPrice(product.price)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateQuantity(product.id, quantity - 1)}
            aria-label="تقليل الكمية"
            data-ocid={`cart.decrease_button.${index}`}
          >
            <Minus className="w-3.5 h-3.5" />
          </Button>
          <span
            className="w-8 text-center text-sm font-semibold tabular-nums"
            data-ocid={`cart.quantity.${index}`}
          >
            {quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= Number(product.stock)}
            aria-label="زيادة الكمية"
            data-ocid={`cart.increase_button.${index}`}
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Subtotal + remove */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <p className="font-bold text-foreground text-sm whitespace-nowrap">
          {subtotal.toLocaleString("ar-SA", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{" "}
          ريال
        </p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full"
          onClick={() => removeItem(product.id)}
          aria-label="إزالة المنتج"
          data-ocid={`cart.delete_button.${index}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
