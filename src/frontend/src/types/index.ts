import { OrderStatus } from "@/backend";
import type { Order, Product } from "@/backend";

export type { Product, Order, OrderStatus };
export type {
  ProductInput,
  OrderRequest,
  OrderItem,
  Category,
} from "@/backend";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type OrderStatusLabel = {
  [K in OrderStatus]: string;
};

export const ORDER_STATUS_LABELS: OrderStatusLabel = {
  [OrderStatus.pending]: "قيد الانتظار",
  [OrderStatus.preparing]: "جاري التحضير",
  [OrderStatus.outForDelivery]: "في الطريق للتوصيل",
  [OrderStatus.delivered]: "تم التوصيل",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "bg-secondary/20 text-secondary-foreground",
  [OrderStatus.preparing]: "bg-accent/20 text-accent-foreground",
  [OrderStatus.outForDelivery]: "bg-primary/20 text-primary",
  [OrderStatus.delivered]: "bg-primary/10 text-primary",
};

export const CATEGORIES: string[] = [
  "جميع الأصناف",
  "خضروات وفواكه",
  "ألبان وأجبان",
  "لحوم ودواجن",
  "مخبوزات",
  "مشروبات",
  "بقوليات وحبوب",
  "زيوت وتوابل",
  "حلويات وسناكس",
  "منظفات ومواد تنظيف",
];
