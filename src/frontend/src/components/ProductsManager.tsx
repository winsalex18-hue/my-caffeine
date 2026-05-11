import { ProductForm } from "@/components/ProductForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/hooks/useQueries";
import { formatPrice } from "@/lib/formatPrice";
import type { Product, ProductInput } from "@/types";
import { Package, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ProductRow({
  product,
  index,
  onEdit,
  onDelete,
}: {
  product: Product;
  index: number;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
      data-ocid={`products.item.${index}`}
    >
      {/* Image */}
      <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <Package className="w-6 h-6 m-3 text-muted-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm text-foreground truncate">
            {product.name}
          </span>
          <Badge variant="outline" className="text-xs shrink-0">
            {product.category}
          </Badge>
          {!product.available && (
            <Badge variant="destructive" className="text-xs shrink-0">
              غير متاح
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-primary font-semibold text-sm">
            {formatPrice(product.price)}
          </span>
          <span className="text-muted-foreground text-xs">
            المخزون: {String(product.stock)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onEdit(product)}
          aria-label="تعديل المنتج"
          data-ocid={`products.edit_button.${index}`}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onDelete(product)}
          aria-label="حذف المنتج"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          data-ocid={`products.delete_button.${index}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function ProductsManager() {
  const { data: products = [], isLoading } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  function handleAdd(input: ProductInput) {
    addProduct.mutate(input, {
      onSuccess: () => {
        toast.success("تم إضافة المنتج بنجاح");
        setShowAddDialog(false);
      },
      onError: () => toast.error("حدث خطأ أثناء الإضافة"),
    });
  }

  function handleEdit(input: ProductInput) {
    if (!editingProduct) return;
    updateProduct.mutate(
      { id: editingProduct.id, input },
      {
        onSuccess: () => {
          toast.success("تم تحديث المنتج بنجاح");
          setEditingProduct(null);
        },
        onError: () => toast.error("حدث خطأ أثناء التحديث"),
      },
    );
  }

  function handleDelete() {
    if (!deletingProduct) return;
    deleteProduct.mutate(deletingProduct.id, {
      onSuccess: () => {
        toast.success("تم حذف المنتج بنجاح");
        setDeletingProduct(null);
      },
      onError: () => toast.error("حدث خطأ أثناء الحذف"),
    });
  }

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "..." : `${products.length} منتج`}
        </p>
        <Button
          type="button"
          onClick={() => setShowAddDialog(true)}
          size="sm"
          data-ocid="products.add_button"
        >
          <Plus className="w-4 h-4 ml-1.5" />
          إضافة منتج
        </Button>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <Skeleton key={n} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center"
          data-ocid="products.empty_state"
        >
          <Package className="w-12 h-12 text-muted-foreground mb-3 opacity-40" />
          <p className="font-semibold text-foreground mb-1">
            لا توجد منتجات بعد
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            ابدأ بإضافة منتجاتك الآن
          </p>
          <Button
            type="button"
            size="sm"
            onClick={() => setShowAddDialog(true)}
            data-ocid="products.add_first_button"
          >
            <Plus className="w-4 h-4 ml-1.5" />
            إضافة أول منتج
          </Button>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="products.list">
          {products.map((product, i) => (
            <ProductRow
              key={String(product.id)}
              product={product}
              index={i + 1}
              onEdit={setEditingProduct}
              onDelete={setDeletingProduct}
            />
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent
          className="max-w-md w-full max-h-[90vh] overflow-y-auto"
          dir="rtl"
          data-ocid="products.add.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-right">إضافة منتج جديد</DialogTitle>
          </DialogHeader>
          <ProductForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddDialog(false)}
            isPending={addProduct.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingProduct}
        onOpenChange={(open) => !open && setEditingProduct(null)}
      >
        <DialogContent
          className="max-w-md w-full max-h-[90vh] overflow-y-auto"
          dir="rtl"
          data-ocid="products.edit.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-right">تعديل المنتج</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              initial={editingProduct}
              onSubmit={handleEdit}
              onCancel={() => setEditingProduct(null)}
              isPending={updateProduct.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deletingProduct}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
      >
        <AlertDialogContent dir="rtl" data-ocid="products.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              تأكيد الحذف
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              هل أنت متأكد أنك تريد حذف منتج{" "}
              <strong>{deletingProduct?.name}</strong>؟ لا يمكن التراجع عن هذا
              الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="products.delete.confirm_button"
            >
              حذف
            </AlertDialogAction>
            <AlertDialogCancel data-ocid="products.delete.cancel_button">
              إلغاء
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
