import type { OrderStatus } from "@/backend";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({
  status,
  className = "",
}: OrderStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[status]} ${className}`}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
