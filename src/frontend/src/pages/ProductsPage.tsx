import { CategoryFilter } from "@/components/CategoryFilter";
import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchBar } from "@/components/SearchBar";
import { useProducts } from "@/hooks/useQueries";
import { CATEGORIES } from "@/types";
import { useMemo, useState } from "react";

export function ProductsPage() {
  const { data: products = [], isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES[0],
  );

  // Build per-category counts (excluding "جميع الأصناف")
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat] = products.filter((p) => p.category === cat).length;
    }
    return counts;
  }, [products]);

  const filtered = useMemo(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== CATEGORIES[0]) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    return result;
  }, [products, selectedCategory, search]);

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="bg-primary/8 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                🛒 سوق الواحة
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                تسوق أفضل المنتجات الطازجة والمنزلية بأسعار مميزة
              </p>
            </div>
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3">
          <CategoryFilter
            selected={selectedCategory}
            onChange={setSelectedCategory}
            counts={categoryCounts}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-6">
          {/* Results header */}
          {!isLoading && (
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">
                {filtered.length > 0 ? (
                  <>
                    <span className="font-semibold text-foreground">
                      {filtered.length}
                    </span>{" "}
                    منتج متاح
                  </>
                ) : null}
              </p>
              {search && (
                <p className="text-sm text-muted-foreground">
                  نتائج البحث عن:{" "}
                  <span className="font-semibold text-foreground">
                    "{search}"
                  </span>
                </p>
              )}
            </div>
          )}

          <ProductGrid
            products={filtered}
            isLoading={isLoading}
            emptyMessage={
              search
                ? `لا توجد نتائج لـ "${search}"`
                : `لا توجد منتجات في فئة "${selectedCategory}"`
            }
          />
        </div>
      </div>
    </Layout>
  );
}
