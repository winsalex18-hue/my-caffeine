import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import type { Product } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

function formatPrice(fils: bigint): string {
  const amount = Number(fils) / 100;
  return `${amount.toFixed(2)} ريال`;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { isInCart, getQuantity, addItem, updateQuantity } = useCartContext();
  const inCart = isInCart(product.id);
  const qty = getQuantity(product.id);
  const outOfStock = !product.available || product.stock === 0n;

  return (
    <article
      className="card-elevated flex flex-col overflow-hidden group entrance-fade"
      style={{ animationDelay: `${(index % 12) * 50}ms` }}
      data-ocid={`products.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl || "/assets/images/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        {outOfStock && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground bg-card px-3 py-1 rounded-full border border-border">
              نفذت الكمية
            </span>
          </div>
        )}
        <Badge className="absolute top-2 right-2 text-xs bg-card/90 text-foreground border border-border backdrop-blur-sm">
          {product.category}
        </Badge>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <div className="flex-1">
          <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="font-bold text-primary text-base font-mono">
            {formatPrice(product.price)}
          </span>
          {product.stock > 0n && product.stock <= 5n && product.available && (
            <span className="text-xs text-destructive">
              آخر {Number(product.stock)} قطع
            </span>
          )}
        </div>

        {/* Cart action */}
        {!outOfStock &&
          (inCart ? (
            <div className="flex items-center justify-between bg-primary/8 rounded-lg p-1.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-primary/20 text-primary"
                onClick={() => updateQuantity(product.id, qty - 1)}
                aria-label="تقليل الكمية"
                data-ocid={`products.quantity_decrease.${index + 1}`}
              >
                <Minus className="w-3.5 h-3.5" />
              </Button>
              <span
                className="font-bold text-primary text-sm min-w-6 text-center"
                aria-label="الكمية"
                data-ocid={`products.quantity.${index + 1}`}
              >
                {qty}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-primary/20 text-primary"
                onClick={() => updateQuantity(product.id, qty + 1)}
                aria-label="زيادة الكمية"
                data-ocid={`products.quantity_increase.${index + 1}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              className="w-full gap-1.5 bg-primary text-primary-foreground hover:opacity-90 transition-smooth text-sm h-8"
              onClick={() => addItem(product)}
              data-ocid={`products.add_to_cart.${index + 1}`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              أضف للسلة
            </Button>
          ))}
      </div>
    </article>
  );
}
