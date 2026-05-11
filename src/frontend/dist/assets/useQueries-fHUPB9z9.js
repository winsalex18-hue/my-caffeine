import { c as createLucideIcon, O as OrderStatus, g as useActor, t as useQuery, v as useQueryClient, h as createActor } from "./index-rhh0vFVk.js";
import { u as useMutation } from "./input-DQY78B54.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const ORDER_STATUS_LABELS = {
  [OrderStatus.pending]: "قيد الانتظار",
  [OrderStatus.preparing]: "جاري التحضير",
  [OrderStatus.outForDelivery]: "في الطريق للتوصيل",
  [OrderStatus.delivered]: "تم التوصيل"
};
const ORDER_STATUS_COLORS = {
  [OrderStatus.pending]: "bg-secondary/20 text-secondary-foreground",
  [OrderStatus.preparing]: "bg-accent/20 text-accent-foreground",
  [OrderStatus.outForDelivery]: "bg-primary/20 text-primary",
  [OrderStatus.delivered]: "bg-primary/10 text-primary"
};
const CATEGORIES = [
  "جميع الأصناف",
  "خضروات وفواكه",
  "ألبان وأجبان",
  "لحوم ودواجن",
  "مخبوزات",
  "مشروبات",
  "بقوليات وحبوب",
  "زيوت وتوابل",
  "حلويات وسناكس",
  "منظفات ومواد تنظيف"
];
function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useAddProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.addProduct(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
}
function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.updateProduct(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
}
function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.deleteProduct(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
}
function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOrders();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] })
  });
}
function useGetOwner() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["owner"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOwner();
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useClaimOwnership() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("لم يتم الاتصال بالخادم");
      return actor.claimOwnership();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["isOwner"] })
  });
}
export {
  CATEGORIES as C,
  ORDER_STATUS_LABELS as O,
  X,
  ORDER_STATUS_COLORS as a,
  useUpdateOrderStatus as b,
  useOrders as c,
  useClaimOwnership as d,
  useGetOwner as e,
  useAddProduct as f,
  useUpdateProduct as g,
  useDeleteProduct as h,
  useProducts as u
};
