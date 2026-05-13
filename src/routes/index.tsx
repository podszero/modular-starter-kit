import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/common/EmptyState";
import { ExampleList } from "@/features/example";
import { APP_NAME } from "@/app/constants";

export const Route = createFileRoute("/")({
  component: Index,
});

const FOLDERS: Array<{ path: string; desc: string }> = [
  { path: "src/app/", desc: "App-level providers & constants" },
  { path: "src/routes/", desc: "File-based routes (TanStack Router)" },
  { path: "src/components/ui/", desc: "shadcn primitives" },
  { path: "src/components/layout/", desc: "Header, Footer, PageShell" },
  { path: "src/components/common/", desc: "Reusable UI bits (EmptyState, …)" },
  { path: "src/features/<name>/", desc: "Self-contained domain modules" },
  { path: "src/hooks/", desc: "Global hooks" },
  { path: "src/lib/", desc: "Third-party adapters & core helpers" },
  { path: "src/utils/", desc: "Pure utilities (format, validation)" },
  { path: "src/types/", desc: "Shared types" },
  { path: "src/config/", desc: "env + app configuration" },
];

function Index() {
  return (
    <PageShell>
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Starter
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{APP_NAME}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Hybrid modular structure: global layers for cross-cutting code, and a{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">features/</code>{" "}
          folder for self-contained domain modules. See{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">ARCHITECTURE.md</code>{" "}
          for the full conventions.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-sm font-semibold tracking-tight">Folder map</h2>
        <ul className="divide-y divide-border rounded-md border border-border">
          {FOLDERS.map((f) => (
            <li
              key={f.path}
              className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <code className="text-xs text-foreground">{f.path}</code>
              <span className="text-xs text-muted-foreground">{f.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-sm font-semibold tracking-tight">
          Example feature output
        </h2>
        <p className="text-xs text-muted-foreground">
          Rendered from <code className="rounded bg-muted px-1">src/features/example</code>{" "}
          via its public barrel <code className="rounded bg-muted px-1">index.ts</code>.
        </p>
        <ExampleList />
      </section>

      <section className="mt-10">
        <EmptyState
          title="Ready to build"
          description="Add a new folder under src/features/ and expose it through index.ts."
        />
      </section>
    </PageShell>
  );
}
