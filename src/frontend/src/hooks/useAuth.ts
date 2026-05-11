import { createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { isAuthenticated, login, clear, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);

  const { data: isOwner = false } = useQuery({
    queryKey: ["isOwner", isAuthenticated],
    queryFn: async () => {
      if (!actor || !isAuthenticated) return false;
      return actor.isOwner();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  const principal = identity?.getPrincipal().toString() ?? null;

  return {
    isLoggedIn: isAuthenticated,
    isAuthenticated,
    login,
    logout: clear,
    principal,
    isOwner,
  };
}
