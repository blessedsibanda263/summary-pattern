import { useMemo } from "react";

export function useAPI() {
  return useMemo(
    () => ({
      fetchUser: (userId) => fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    }), []
  )
}