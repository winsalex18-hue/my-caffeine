module {
  public type OrderStatus = {
    #pending;
    #preparing;
    #outForDelivery;
    #delivered;
  };

  public type OrderItem = {
    productId : Nat;
    productName : Text;
    quantity : Nat;
    unitPrice : Nat;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    deliveryTime : Text;
    items : [OrderItem];
    totalPrice : Nat;
    status : OrderStatus;
    createdAt : Int;
  };

  public type OrderRequest = {
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    deliveryTime : Text;
    items : [OrderItem];
  };
};
