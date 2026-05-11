import { Badge } from "@/components/ui/badge";
import { useCartContext } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export function CartBadge() {
  const { totalItems } = useCartContext();

  return (
    <div className="relative inline-flex" data-ocid="cart_badge">
      <ShoppingCart className="w-5 h-5" />
      {totalItems > 0 && (
        <Badge
          className="absolute -top-2 -left-2 h-5 min-w-5 px-1 text-xs bg-primary text-primary-foreground rounded-full"
          data-ocid="cart_badge.count"
        >
          {totalItems}
        </Badge>
      )}
    </div>
  );
}
