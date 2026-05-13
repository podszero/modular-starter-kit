import type { ExampleItem } from "../types";

/**
 * Stub data source. Replace with a real fetch / server function
 * when the feature needs a backend.
 */
export async function fetchExampleItems(): Promise<ExampleItem[]> {
  return [
    { id: "1", label: "First item" },
    { id: "2", label: "Second item" },
    { id: "3", label: "Third item" },
  ];
}
