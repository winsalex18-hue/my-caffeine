import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/types";

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
  counts?: Record<string, number>;
}

export function CategoryFilter({
  selected,
  onChange,
  counts,
}: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      role="tablist"
      aria-label="تصفية حسب الفئة"
      data-ocid="products.category_filter"
    >
      {CATEGORIES.map((cat, i) => {
        const isActive = selected === cat;
        const count = counts?.[cat];
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            data-ocid={`products.category_tab.${i + 1}`}
            className={cn(
              "flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-smooth border whitespace-nowrap",
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary",
            )}
          >
            <span>{cat}</span>
            {count !== undefined && !isActive && (
              <span className="text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
