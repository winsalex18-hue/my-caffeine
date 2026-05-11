import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types";
import { PackageX } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  emptyMessage?: string;
}

function ProductSkeleton() {
  return (
    <div className="card-elevated overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="pt-1 flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
}

export function ProductGrid({
  products,
  isLoading,
  emptyMessage = "لا توجد منتجات متاحة حالياً",
}: ProductGridProps) {
  if (isLoading) {
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {skeletons.map((n) => (
          <ProductSkeleton key={n} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 gap-4"
        data-ocid="products.empty_state"
      >
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <PackageX className="w-10 h-10 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-foreground font-display font-semibold text-lg">
            {emptyMessage}
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            جرّب تغيير فئة البحث أو كلمة البحث
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, i) => (
        <ProductCard key={String(product.id)} product={product} index={i} />
      ))}
    </div>
  );
}
