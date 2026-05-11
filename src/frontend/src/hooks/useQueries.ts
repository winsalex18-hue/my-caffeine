import type { OrderStatus } from "@/backend";
import { createActor } from "@/backend";
import type { Order, OrderRequest, Product, ProductInput } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Products ───────────────────────────────────────────────────────────────

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAddProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Product, Error, ProductInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.addProduct(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    Product | null,
    Error,
    { id: bigint; input: ProductInput }
  >({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.updateProduct(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.deleteProduct(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

// ─── Orders ─────────────────────────────────────────────────────────────────

export function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOrders();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Order, Error, OrderRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.placeOrder(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Order | null, Error, { id: bigint; status: OrderStatus }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

// ─── Owner Query ────────────────────────────────────────────────────────────

export function useGetOwner() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<import("@icp-sdk/core/principal").Principal | null>({
    queryKey: ["owner"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOwner();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ─── Ownership ───

export function useClaimOwnership() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, undefined>({
    mutationFn: async () => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.claimOwnership();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["isOwner"] }),
  });
}
