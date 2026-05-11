import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderRequest {
    customerName: string;
    deliveryAddress: string;
    customerPhone: string;
    deliveryTime: string;
    items: Array<OrderItem>;
}
export interface ProductInput {
    name: string;
    description: string;
    available: boolean;
    stock: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export type Category = string;
export interface OrderItem {
    productId: bigint;
    productName: string;
    quantity: bigint;
    unitPrice: bigint;
}
export type ProductId = bigint;
export interface Order {
    id: bigint;
    customerName: string;
    status: OrderStatus;
    deliveryAddress: string;
    customerPhone: string;
    createdAt: bigint;
    deliveryTime: string;
    items: Array<OrderItem>;
    totalPrice: bigint;
}
export type OrderId = bigint;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    available: boolean;
    stock: bigint;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export enum OrderStatus {
    preparing = "preparing",
    pending = "pending",
    outForDelivery = "outForDelivery",
    delivered = "delivered"
}
export interface backendInterface {
    addProduct(input: ProductInput): Promise<Product>;
    claimOwnership(): Promise<boolean>;
    deleteProduct(id: ProductId): Promise<boolean>;
    getOrder(id: OrderId): Promise<Order | null>;
    getOwner(): Promise<Principal | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    isOwner(): Promise<boolean>;
    listOrders(): Promise<Array<Order>>;
    listProducts(): Promise<Array<Product>>;
    placeOrder(req: OrderRequest): Promise<Order>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<Order | null>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product | null>;
}
