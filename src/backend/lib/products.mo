import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Types "../types/products";
import Common "../types/common";

module {
  public type State = {
    products : Map.Map<Common.ProductId, Types.Product>;
    counter : { var nextId : Nat };
  };

  public func listProducts(state : State) : [Types.Product] {
    state.products.values().toArray();
  };

  public func getProduct(state : State, id : Common.ProductId) : ?Types.Product {
    state.products.get(id);
  };

  public func addProduct(state : State, input : Types.ProductInput) : Types.Product {
    let id = state.counter.nextId;
    state.counter.nextId += 1;
    let product : Types.Product = {
      id;
      name = input.name;
      description = input.description;
      price = input.price;
      category = input.category;
      imageUrl = input.imageUrl;
      available = input.available;
      stock = input.stock;
    };
    state.products.add(id, product);
    product;
  };

  public func updateProduct(state : State, id : Common.ProductId, input : Types.ProductInput) : ?Types.Product {
    switch (state.products.get(id)) {
      case null { null };
      case (?_existing) {
        let updated : Types.Product = {
          id;
          name = input.name;
          description = input.description;
          price = input.price;
          category = input.category;
          imageUrl = input.imageUrl;
          available = input.available;
          stock = input.stock;
        };
        state.products.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteProduct(state : State, id : Common.ProductId) : Bool {
    switch (state.products.get(id)) {
      case null { false };
      case (?_) {
        state.products.remove(id);
        true;
      };
    };
  };

  public func seedSampleProducts(state : State) {
    if (not state.products.isEmpty()) { return };
    let samples : [Types.ProductInput] = [
      // فواكه وخضروات
      { name = "تفاح أحمر"; description = "تفاح طازج من أجود الأنواع"; price = 3000; category = "فواكه وخضروات"; imageUrl = "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"; available = true; stock = 50 },
      { name = "موز"; description = "موز طازج ناضج"; price = 2000; category = "فواكه وخضروات"; imageUrl = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"; available = true; stock = 60 },
      { name = "طماطم"; description = "طماطم طازجة محلية"; price = 1500; category = "فواكه وخضروات"; imageUrl = "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"; available = true; stock = 40 },
      // منتجات الألبان
      { name = "حليب كامل الدسم"; description = "حليب طازج كامل الدسم 1 لتر"; price = 2500; category = "منتجات الألبان"; imageUrl = "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"; available = true; stock = 30 },
      { name = "جبنة بيضاء"; description = "جبنة بيضاء طازجة 500 غرام"; price = 5000; category = "منتجات الألبان"; imageUrl = "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400"; available = true; stock = 25 },
      // مشروبات
      { name = "عصير برتقال"; description = "عصير برتقال طبيعي 1 لتر"; price = 3500; category = "مشروبات"; imageUrl = "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400"; available = true; stock = 20 },
      { name = "مياه معدنية"; description = "مياه معدنية نقية 500 مل"; price = 500; category = "مشروبات"; imageUrl = "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400"; available = true; stock = 100 },
      // وجبات خفيفة
      { name = "شيبس بالملح"; description = "رقائق البطاطس المقرمشة بالملح"; price = 2000; category = "وجبات خفيفة"; imageUrl = "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400"; available = true; stock = 45 },
      { name = "بسكويت الشوكولاتة"; description = "بسكويت محشو بالشوكولاتة"; price = 2500; category = "وجبات خفيفة"; imageUrl = "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400"; available = true; stock = 35 },
      { name = "مكسرات مشكلة"; description = "مزيج من المكسرات المحمصة 200 غرام"; price = 7000; category = "وجبات خفيفة"; imageUrl = "https://images.unsplash.com/photo-1536816579748-4ecb3f03d72a?w=400"; available = true; stock = 20 },
    ];
    for (input in samples.values()) {
      ignore addProduct(state, input);
    };
  };
};
