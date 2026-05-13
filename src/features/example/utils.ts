import type { ExampleItem } from "./types";

export function formatExampleLabel(item: ExampleItem): string {
  return `${item.id} · ${item.label}`;
}
