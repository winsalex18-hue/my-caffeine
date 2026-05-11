import Map "mo:core/Map";
import ProductTypes "types/products";
import OrderTypes "types/orders";
import ProductLib "lib/products";
import OrderLib "lib/orders";
import ProductsApi "mixins/products-api";
import OrdersApi "mixins/orders-api";
import OwnerApi "mixins/owner-api";

actor {
  // Shared owner state
  let ownerState = { var owner : ?Principal = null };

  // Product state
  let productCounter = { var nextId : Nat = 1 };
  let productsMap = Map.empty<Nat, ProductTypes.Product>();
  let productState : ProductLib.State = {
    products = productsMap;
    counter = productCounter;
  };

  // Order state
  let orderCounter = { var nextId : Nat = 1 };
  let ordersMap = Map.empty<Nat, OrderTypes.Order>();
  let orderState : OrderLib.State = {
    orders = ordersMap;
    counter = orderCounter;
    products = productsMap;
  };

  // Seed sample Arabic products on first run
  ProductLib.seedSampleProducts(productState);

  include OwnerApi(ownerState);
  include ProductsApi(productState, ownerState);
  include OrdersApi(orderState, ownerState);
};
