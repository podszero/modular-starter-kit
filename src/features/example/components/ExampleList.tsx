import { useExampleItems } from "../hooks/useExampleItems";
import { formatExampleLabel } from "../utils";

export function ExampleList() {
  const { data, isLoading } = useExampleItems();

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <ul className="divide-y divide-border rounded-md border border-border">
      {data?.map((item) => (
        <li key={item.id} className="px-4 py-2 text-sm">
          {formatExampleLabel(item)}
        </li>
      ))}
    </ul>
  );
}
