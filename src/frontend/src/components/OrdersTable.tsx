import { OrderStatus } from "@/backend";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateOrderStatus } from "@/hooks/useQueries";
import type { Order } from "@/types";
import { ORDER_STATUS_LABELS } from "@/types";
import { Clock, MapPin, Package, Phone, ShoppingBag } from "lucide-react";

interface OrdersTableProps {
  orders: Order[];
  isLoading?: boolean;
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  {
    value: OrderStatus.pending,
    label: ORDER_STATUS_LABELS[OrderStatus.pending],
  },
  {
    value: OrderStatus.preparing,
    label: ORDER_STATUS_LABELS[OrderStatus.preparing],
  },
  {
    value: OrderStatus.outForDelivery,
    label: ORDER_STATUS_LABELS[OrderStatus.outForDelivery],
  },
  {
    value: OrderStatus.delivered,
    label: ORDER_STATUS_LABELS[OrderStatus.delivered],
  },
];

function OrderCard({ order, index }: { order: Order; index: number }) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  function handleStatusChange(value: string) {
    updateStatus({ id: order.id, status: value as OrderStatus });
  }

  const formattedDate = new Date(
    Number(order.createdAt / BigInt(1_000_000)),
  ).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="card-elevated p-5 entrance-fade"
      data-ocid={`order.item.${index}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">
            #{String(order.id).padStart(4, "0")}
          </span>
          <OrderStatusBadge status={order.status} />
        </div>
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
      </div>

      {/* Customer info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground font-semibold min-w-0 truncate">
            {order.customerName}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span dir="ltr">{order.customerPhone}</span>
        </div>
        <div className="flex items-start gap-1.5 text-sm text-muted-foreground sm:col-span-2">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span className="line-clamp-1">{order.deliveryAddress}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>{order.deliveryTime}</span>
        </div>
      </div>

      {/* Items */}
      <div className="bg-muted/40 rounded-md p-3 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{order.items.length} منتج</span>
        </div>
        <div className="space-y-1">
          {order.items.map((item, i) => (
            <div
              key={String(item.productId)}
              className="flex justify-between items-center text-sm"
              data-ocid={`order.item.${index}.product.${i + 1}`}
            >
              <span className="text-foreground truncate min-w-0">
                {item.productName}
              </span>
              <div className="flex items-center gap-2 shrink-0 mr-2">
                <Badge variant="outline" className="text-xs">
                  ×{String(item.quantity)}
                </Badge>
                <span className="font-medium text-foreground">
                  {(
                    Number(item.unitPrice) * Number(item.quantity)
                  ).toLocaleString("ar-SA")}{" "}
                  ريال
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-base font-bold text-primary">
          {Number(order.totalPrice).toLocaleString("ar-SA")} ريال
        </div>
        <Select
          value={order.status}
          onValueChange={handleStatusChange}
          disabled={isPending}
        >
          <SelectTrigger
            className="w-44 text-sm"
            data-ocid={`order.status_select.${index}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function OrdersTable({ orders, isLoading }: OrdersTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-52 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center"
        data-ocid="orders.empty_state"
      >
        <Package className="w-14 h-14 text-muted-foreground mb-4 opacity-40" />
        <p className="text-lg font-semibold text-foreground mb-1">
          لا توجد طلبيات بعد
        </p>
        <p className="text-muted-foreground text-sm">
          ستظهر الطلبيات هنا حالما يقوم العملاء بالطلب
        </p>
      </div>
    );
  }

  const sorted = [...orders].sort((a, b) => Number(b.createdAt - a.createdAt));

  return (
    <div className="space-y-4" data-ocid="orders.list">
      {sorted.map((order, i) => (
        <OrderCard key={String(order.id)} order={order} index={i + 1} />
      ))}
    </div>
  );
}
