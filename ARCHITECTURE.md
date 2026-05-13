# Architecture

Hybrid modular structure: **global layers** for cross-cutting code, **`features/`** for self-contained domain modules.

## Folder map

```
src/
├── app/            # App-level config (providers, constants)
├── routes/         # File-based routes (TanStack Router) — wires features together
├── components/
│   ├── ui/         # shadcn primitives
│   ├── layout/     # Header, Footer, PageShell
│   └── common/     # Logo, EmptyState, LoadingSpinner
├── features/       # Domain modules (see rules below)
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── types.ts
│       ├── utils.ts
│       └── index.ts        # Public API (barrel)
├── hooks/          # Global hooks
├── lib/            # Third-party adapters & core helpers (cn, etc.)
├── utils/          # Pure utilities (format, validation)
├── types/          # Shared types
├── config/         # env + app configuration
└── styles.css      # Design tokens
```

## Rules

1. **Global vs feature** — used by 1 module? Keep it inside `features/<name>/`. Used by ≥2 modules? Promote it to a global layer.
2. **Feature isolation** — features must NOT import each other's internals. Cross-feature use goes through `features/<name>/index.ts`.
3. **Routes are wiring only** — `routes/` files compose features; business logic lives inside the feature.
4. **Design tokens only** — never hardcode colors. Use semantic tokens from `src/styles.css`.

## Adding a new feature

```
src/features/posts/
├── components/PostList.tsx
├── hooks/usePosts.ts
├── api/postsApi.ts
├── types.ts
└── index.ts        # export { PostList } from "./components/PostList";
```

Then in a route:

```tsx
import { PostList } from "@/features/posts";
```
