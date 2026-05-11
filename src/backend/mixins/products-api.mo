import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import ProductLib "../lib/products";
import Types "../types/products";
import Common "../types/common";

mixin (productState : ProductLib.State, ownerState : { var owner : ?Principal }) {

  func requireOwner(caller : Principal) {
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

  // Public: list all available products
  public query func listProducts() : async [Types.Product] {
    ProductLib.listProducts(productState);
  };

  // Public: get a single product by id
  public query func getProduct(id : Common.ProductId) : async ?Types.Product {
    ProductLib.getProduct(productState, id);
  };

  // Owner only: add a new product
  public shared ({ caller }) func addProduct(input : Types.ProductInput) : async Types.Product {
    requireOwner(caller);
    ProductLib.addProduct(productState, input);
  };

  // Owner only: update an existing product
  public shared ({ caller }) func updateProduct(id : Common.ProductId, input : Types.ProductInput) : async ?Types.Product {
    requireOwner(caller);
    ProductLib.updateProduct(productState, id, input);
  };

  // Owner only: delete a product
  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async Bool {
    requireOwner(caller);
    ProductLib.deleteProduct(productState, id);
  };
};
