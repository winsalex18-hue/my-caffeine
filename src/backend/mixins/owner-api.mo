import Principal "mo:core/Principal";

mixin (ownerState : { var owner : ?Principal }) {

  // First caller claims ownership; subsequent calls fail if already set
  public shared ({ caller }) func claimOwnership() : async Bool {
    switch (ownerState.owner) {
      case (?_existing) { false };
      case null {
        ownerState.owner := ?caller;
        true;
      };
    };
  };

  // Returns whether the caller is the current owner
  public shared query ({ caller }) func isOwner() : async Bool {
    switch (ownerState.owner) {
      case (?owner) { Principal.equal(owner, caller) };
      case null { false };
    };
  };

  // Returns the current owner principal (if set)
  public query func getOwner() : async ?Principal {
    ownerState.owner;
  };
};
