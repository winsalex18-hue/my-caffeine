import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Types "../types/orders";
import ProductTypes "../types/products";
import Common "../types/common";

module {
  public type State = {
    orders : Map.Map<Common.OrderId, Types.Order>;
    counter : { var nextId : Nat };
    products : Map.Map<Common.ProductId, ProductTypes.Product>;
  };

  public func placeOrder(state : State, req : Types.OrderRequest) : Types.Order {
    let totalPrice = req.items.foldLeft(0, func(acc, item) {
      acc + item.unitPrice * item.quantity
    });
    let id = state.counter.nextId;
    state.counter.nextId += 1;
    let order : Types.Order = {
      id;
      customerName = req.customerName;
      customerPhone = req.customerPhone;
      deliveryAddress = req.deliveryAddress;
      deliveryTime = req.deliveryTime;
      items = req.items;
      totalPrice;
      status = #pending;
      createdAt = Time.now();
    };
    state.orders.add(id, order);
    order;
  };

  public func listOrders(state : State) : [Types.Order] {
    state.orders.values().toArray();
  };

  public func getOrder(state : State, id : Common.OrderId) : ?Types.Order {
    state.orders.get(id);
  };

  public func updateOrderStatus(state : State, id : Common.OrderId, status : Types.OrderStatus) : ?Types.Order {
    switch (state.orders.get(id)) {
      case null { null };
      case (?existing) {
        let updated : Types.Order = { existing with status };
        state.orders.add(id, updated);
        ?updated;
      };
    };
  };
};
