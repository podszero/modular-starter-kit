// Public API for the `example` feature.
// Other features and routes should ONLY import from this barrel,
// never reach into internal files directly.
export { ExampleList } from "./components/ExampleList";
export { useExampleItems } from "./hooks/useExampleItems";
export type { ExampleItem } from "./types";
