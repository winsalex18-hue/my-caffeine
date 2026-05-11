import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Product, ProductInput } from "@/types";
import { CATEGORIES } from "@/types";
import { useState } from "react";

interface ProductFormProps {
  initial?: Product;
  onSubmit: (input: ProductInput) => void;
  onCancel?: () => void;
  isPending?: boolean;
}

const CATEGORY_OPTIONS = CATEGORIES.filter((c) => c !== "جميع الأصناف");

function toFormValues(product?: Product) {
  return {
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product ? String(product.price) : "",
    category: product?.category ?? CATEGORY_OPTIONS[0],
    imageUrl: product?.imageUrl ?? "",
    available: product?.available ?? true,
    stock: product ? String(product.stock) : "0",
  };
}

export function ProductForm({
  initial,
  onSubmit,
  onCancel,
  isPending = false,
}: ProductFormProps) {
  const [form, setForm] = useState(toFormValues(initial));
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "اسم المنتج مطلوب";
    if (
      !form.price ||
      Number.isNaN(Number(form.price)) ||
      Number(form.price) <= 0
    )
      next.price = "أدخل سعرًا صحيحًا";
    if (!form.category) next.category = "الفئة مطلوبة";
    if (
      !form.stock ||
      Number.isNaN(Number(form.stock)) ||
      Number(form.stock) < 0
    )
      next.stock = "أدخل كمية صحيحة";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      price: BigInt(Math.round(Number(form.price))),
      category: form.category,
      imageUrl: form.imageUrl.trim(),
      available: form.available,
      stock: BigInt(Math.round(Number(form.stock))),
    });
  }

  const isEditing = !!initial;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      dir="rtl"
      data-ocid="product.form"
      noValidate
    >
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="prod-name">اسم المنتج</Label>
        <Input
          id="prod-name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="مثال: طماطم طازجة"
          disabled={isPending}
          data-ocid="product.name_input"
        />
        {errors.name && (
          <p
            className="text-destructive text-xs"
            data-ocid="product.name.field_error"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="prod-desc">الوصف</Label>
        <Textarea
          id="prod-desc"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="وصف مختصر للمنتج..."
          rows={2}
          disabled={isPending}
          data-ocid="product.description_textarea"
        />
      </div>

      {/* Price + Stock row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="prod-price">السعر (ريال)</Label>
          <Input
            id="prod-price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="0"
            disabled={isPending}
            data-ocid="product.price_input"
          />
          {errors.price && (
            <p
              className="text-destructive text-xs"
              data-ocid="product.price.field_error"
            >
              {errors.price}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="prod-stock">المخزون</Label>
          <Input
            id="prod-stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => set("stock", e.target.value)}
            placeholder="0"
            disabled={isPending}
            data-ocid="product.stock_input"
          />
          {errors.stock && (
            <p
              className="text-destructive text-xs"
              data-ocid="product.stock.field_error"
            >
              {errors.stock}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label htmlFor="prod-category">الفئة</Label>
        <Select
          value={form.category}
          onValueChange={(v) => set("category", v)}
          disabled={isPending}
        >
          <SelectTrigger id="prod-category" data-ocid="product.category_select">
            <SelectValue placeholder="اختر الفئة" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p
            className="text-destructive text-xs"
            data-ocid="product.category.field_error"
          >
            {errors.category}
          </p>
        )}
      </div>

      {/* Image URL */}
      <div className="space-y-1.5">
        <Label htmlFor="prod-image">رابط الصورة</Label>
        <Input
          id="prod-image"
          type="url"
          value={form.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
          placeholder="https://..."
          disabled={isPending}
          data-ocid="product.image_url_input"
        />
      </div>

      {/* Available toggle */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="prod-available"
          checked={form.available}
          onCheckedChange={(v) => set("available", !!v)}
          disabled={isPending}
          data-ocid="product.available_checkbox"
        />
        <Label htmlFor="prod-available" className="cursor-pointer">
          متاح للبيع
        </Label>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1"
          data-ocid="product.submit_button"
        >
          {isPending
            ? "جاري الحفظ..."
            : isEditing
              ? "حفظ التعديلات"
              : "إضافة المنتج"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
            data-ocid="product.cancel_button"
          >
            إلغاء
          </Button>
        )}
      </div>
    </form>
  );
}
