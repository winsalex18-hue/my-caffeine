import { Layout } from "@/components/Layout";
import { CartProvider } from "@/context/CartContext";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { Skeleton } from "@/components/ui/skeleton";
// Lazy page imports
import { Suspense, lazy } from "react";

const ProductsPage = lazy(() =>
  import("@/pages/ProductsPage").then((m) => ({ default: m.ProductsPage })),
);
const CartPage = lazy(() =>
  import("@/pages/CartPage").then((m) => ({ default: m.CartPage })),
);
const CheckoutPage = lazy(() =>
  import("@/pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })),
);
const OrderConfirmationPage = lazy(() =>
  import("@/pages/OrderConfirmationPage").then((m) => ({
    default: m.OrderConfirmationPage,
  })),
);
const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const DashboardProductsPage = lazy(() =>
  import("@/pages/DashboardProductsPage").then((m) => ({
    default: m.DashboardProductsPage,
  })),
);

function PageLoader() {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skeletons.map((n) => (
          <Skeleton key={n} className="h-60 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function withLayout(Component: React.ComponentType) {
  return (
    <CartProvider>
      <Suspense
        fallback={
          <Layout>
            <PageLoader />
          </Layout>
        }
      >
        <Component />
      </Suspense>
    </CartProvider>
  );
}

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => withLayout(ProductsPage),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => withLayout(CartPage),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => withLayout(CheckoutPage),
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation",
  component: () => withLayout(OrderConfirmationPage),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => withLayout(DashboardPage),
});

const dashboardProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/products",
  component: () => withLayout(DashboardProductsPage),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
  dashboardRoute,
  dashboardProductsRoute,
]);
