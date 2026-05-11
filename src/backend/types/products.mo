module {
  public type Category = Text;

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    imageUrl : Text;
    available : Bool;
    stock : Nat;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    imageUrl : Text;
    available : Bool;
    stock : Nat;
  };
};
