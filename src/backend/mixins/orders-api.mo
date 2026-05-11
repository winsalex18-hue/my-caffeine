import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import OrderLib "../lib/orders";
import Types "../types/orders";
import Common "../types/common";

mixin (orderState : OrderLib.State, ownerState : { var owner : ?Principal }) {

  func requireOrderOwner(caller : Principal) {
    switch (ownerState.owner) {
      case (?owner) {
        if (not Principal.equal(owner, caller)) {
          Runtime.trap("Unauthorized: only the owner can perform this action");
        };
      };
      case null {
        Runtime.trap("Unauthorized: no owner set");
      };
    };
  };

  // Public: place a new order (guest, no login required)
  public shared func placeOrder(req : Types.OrderRequest) : async Types.Order {
    OrderLib.placeOrder(orderState, req);
  };

  // Owner only: list all orders
  public shared ({ caller }) func listOrders() : async [Types.Order] {
    requireOrderOwner(caller);
    OrderLib.listOrders(orderState);
  };

  // Owner only: get a specific order
  public shared ({ caller }) func getOrder(id : Common.OrderId) : async ?Types.Order {
    requireOrderOwner(caller);
    OrderLib.getOrder(orderState, id);
  };

  // Owner only: update order status
  public shared ({ caller }) func updateOrderStatus(id : Common.OrderId, status : Types.OrderStatus) : async ?Types.Order {
    requireOrderOwner(caller);
    OrderLib.updateOrderStatus(orderState, id, status);
  };
};
