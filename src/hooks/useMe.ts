import { fetchUser } from "@/services/user.api"
import { useQuery } from "@tanstack/react-query"

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    throwOnError: false, // 401 = unauthenticated, not a crash
  })
}