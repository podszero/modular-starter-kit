import { useQuery } from "@tanstack/react-query";
import { fetchExampleItems } from "../api/exampleApi";

export function useExampleItems() {
  return useQuery({
    queryKey: ["example", "items"],
    queryFn: fetchExampleItems,
  });
}
