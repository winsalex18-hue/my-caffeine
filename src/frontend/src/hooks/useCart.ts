import type { Product } from "@/backend";
import type { CartItem } from "@/types";
import { useCallback, useEffect, useState } from "react";

const CART_STORAGE_KEY = "supermarket_cart_v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    // Restore bigint fields serialized as strings
    return parsed.map((item) => ({
      ...item,
      product: {
        ...item.product,
        id: BigInt(item.product.id),
        price: BigInt(item.product.price),
        stock: BigInt(item.product.stock),
      },
    }));
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // silently fail if storage is unavailable
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: bigint) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: bigint, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = items.reduce(
    (sum, i) => sum + (Number(i.product.price) / 100) * i.quantity,
    0,
  );

  const isInCart = useCallback(
    (productId: bigint) => items.some((i) => i.product.id === productId),
    [items],
  );

  const getQuantity = useCallback(
    (productId: bigint) =>
      items.find((i) => i.product.id === productId)?.quantity ?? 0,
    [items],
  );

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isInCart,
    getQuantity,
  };
}
