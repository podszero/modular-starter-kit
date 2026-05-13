# Modular Starter

Starter frontend dengan struktur folder **hybrid modular** untuk [TanStack Start](https://tanstack.com/start) v1 + React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui.

> Kombinasi terbaik dari dua dunia: **layer global** untuk kode lintas-fitur, dan **`features/`** untuk modul domain yang mandiri & terisolasi.

---

## Daftar Isi

- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Mulai Cepat](#mulai-cepat)
- [Struktur Folder](#struktur-folder)
- [Filosofi Arsitektur](#filosofi-arsitektur)
- [Aturan Modular](#aturan-modular)
- [Cara Menambah Fitur Baru](#cara-menambah-fitur-baru)
- [Cara Menambah Halaman / Route Baru](#cara-menambah-halaman--route-baru)
- [Design System](#design-system)
- [Path Aliases](#path-aliases)
- [Environment Variables](#environment-variables)
- [Convention Cheatsheet](#convention-cheatsheet)
- [FAQ](#faq)

---

## Fitur

- ✅ **TanStack Start** — SSR/SSG + file-based routing dengan type-safety
- ✅ **TanStack Query** — siap pakai via `AppProviders`
- ✅ **Tailwind CSS v4** — dengan design tokens berbasis `oklch`
- ✅ **shadcn/ui** — komponen UI siap pakai di `src/components/ui/`
- ✅ **Struktur hybrid modular** — global layers + `features/`
- ✅ **Contoh fitur lengkap** — `src/features/example/` sebagai template referensi
- ✅ **Tanpa backend** — fokus frontend, mudah ditambah Lovable Cloud kapan saja

---

## Tech Stack

| Layer       | Tool                                         |
| ----------- | -------------------------------------------- |
| Framework   | TanStack Start v1 (React 19)                 |
| Build       | Vite 7                                       |
| Routing     | TanStack Router (file-based di `src/routes`) |
| Data        | TanStack Query                               |
| Styling     | Tailwind CSS v4 (`src/styles.css`)           |
| Komponen UI | shadcn/ui                                    |
| Bahasa      | TypeScript (strict)                          |
| Linter      | ESLint + Prettier                            |
| Runtime dev | Bun                                          |

---

## Mulai Cepat

```bash
# install dependencies
bun install

# jalankan dev server
bun run dev

# build produksi
bun run build
```

Buka [http://localhost:5173](http://localhost:5173).

---

## Struktur Folder

```text
src/
├── app/                    # Konfigurasi level aplikasi
│   ├── providers.tsx       # Wrapper provider (QueryClient, Theme, dll)
│   └── constants.ts        # Konstanta global (APP_NAME, dsb)
│
├── routes/                 # File-based routing TanStack Router
│   ├── __root.tsx          # Document shell (html/head/body)
│   └── index.tsx           # Halaman "/"
│
├── components/             # Komponen UI lintas-fitur
│   ├── ui/                 # shadcn primitives (button, dialog, dst)
│   ├── layout/             # PageShell, Header, Footer, Container
│   └── common/             # Logo, EmptyState, LoadingSpinner, dst
│
├── features/               # MODUL DOMAIN — self-contained
│   └── example/            # Contoh modul referensi
│       ├── components/     # Komponen UI khusus fitur ini
│       ├── hooks/          # Hooks khusus fitur ini
│       ├── api/            # Data layer (fetch, mutation, dsb)
│       ├── types.ts        # Type khusus fitur ini
│       ├── utils.ts        # Util murni khusus fitur ini
│       └── index.ts        # PUBLIC API (barrel) — satu-satunya pintu masuk
│
├── hooks/                  # Hooks global (use-mobile, dsb)
├── lib/                    # Adapter pihak ketiga & helper inti (cn, dsb)
├── utils/                  # Util murni global (format, validasi)
├── types/                  # Type global bersama
├── config/                 # env + konfigurasi aplikasi
└── styles.css              # Design tokens (oklch) + Tailwind v4 setup
```

> Penjelasan ringkas juga ada di `ARCHITECTURE.md`.

---

## Filosofi Arsitektur

### Kenapa hybrid?

- **Layer-based murni** (`components/`, `hooks/`, `services/`) cepat membusuk: file menumpuk, sulit melacak siapa pakai apa, dan sulit menghapus fitur.
- **Feature-based murni** memaksa setiap hal kecil masuk ke salah satu fitur — padahal banyak hal (`Button`, `cn()`, `useMobile`) memang lintas-fitur.
- **Hybrid** memberi tempat yang jelas untuk keduanya: kode bersama hidup di layer global, kode milik domain hidup di `features/<nama>/`.

### Prinsip pengarah

1. **Kolokasi** — kode yang berubah bersamaan harus tinggal berdekatan.
2. **Isolasi** — antar-fitur tidak boleh saling mengintip isi dalam.
3. **Routing tipis** — file di `routes/` hanya merangkai fitur, bukan berisi logika.
4. **Promosikan, jangan duplikasi** — kalau dipakai ≥2 fitur, naikkan ke layer global.

---

## Aturan Modular

### 1. Global vs Feature

| Dipakai oleh                | Letakkan di                                 |
| --------------------------- | ------------------------------------------- |
| 1 fitur                     | `src/features/<nama>/...`                   |
| ≥2 fitur (komponen UI)      | `src/components/common/` atau `components/layout/` |
| ≥2 fitur (hook)             | `src/hooks/`                                |
| ≥2 fitur (util murni)       | `src/utils/`                                |
| Adapter library / SDK pihak ke-3 | `src/lib/`                             |

### 2. Feature isolation (PENTING)

Antar-fitur **tidak boleh** saling import file internal.

```ts
// ❌ DILARANG — bypass barrel, langsung ke file dalam fitur lain
import { ExampleList } from "@/features/example/components/ExampleList";

// ✅ BENAR — lewat public API (index.ts)
import { ExampleList } from "@/features/example";
```

`index.ts` adalah **kontrak publik** fitur. Apa pun yang tidak diekspor dari sana = privat.

### 3. Routes tipis

```tsx
// ✅ BENAR — route hanya merangkai
import { ExampleList } from "@/features/example";

function Index() {
  return <PageShell><ExampleList /></PageShell>;
}
```

```tsx
// ❌ DILARANG — logika bisnis di file route
function Index() {
  const { data } = useQuery({ queryKey: ["..."], queryFn: async () => { ... } });
  // ...transformasi data, side-effect, dsb
}
```

### 4. Design tokens, bukan warna mentah

```tsx
// ❌ DILARANG
<div className="bg-white text-black border-gray-200">

// ✅ BENAR — pakai semantic token
<div className="bg-background text-foreground border-border">
```

Token didefinisikan di `src/styles.css` (format `oklch`).

---

## Cara Menambah Fitur Baru

Misal ingin menambah fitur `posts`:

```text
src/features/posts/
├── components/
│   ├── PostList.tsx
│   └── PostCard.tsx
├── hooks/
│   └── usePosts.ts
├── api/
│   └── postsApi.ts
├── types.ts
└── index.ts
```

`src/features/posts/index.ts` (public API):

```ts
export { PostList } from "./components/PostList";
export { usePosts } from "./hooks/usePosts";
export type { Post } from "./types";
```

Pakai di route:

```tsx
import { PostList } from "@/features/posts";
```

> Aturan emas: **kalau bukan di `index.ts`, berarti privat**.

---

## Cara Menambah Halaman / Route Baru

TanStack Router pakai **flat file naming** (titik sebagai pemisah path), **bukan** nested folder.

| File                                | URL                  |
| ----------------------------------- | -------------------- |
| `src/routes/about.tsx`              | `/about`             |
| `src/routes/posts.tsx`              | `/posts` (layout)    |
| `src/routes/posts.index.tsx`        | `/posts`             |
| `src/routes/posts.$postId.tsx`      | `/posts/:postId`     |
| `src/routes/settings.profile.tsx`   | `/settings/profile`  |

Template route:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Modular Starter" },
      { name: "description", content: "Tentang aplikasi ini." },
    ],
  }),
});

function AboutPage() {
  return <div>About</div>;
}
```

Navigasi:

```tsx
import { Link } from "@tanstack/react-router";

<Link to="/about">About</Link>
<Link to="/posts/$postId" params={{ postId: "123" }}>Post</Link>
```

> File `src/routeTree.gen.ts` di-generate otomatis — **jangan diedit manual**.

---

## Design System

Semua warna didefinisikan sebagai **semantic token** di `src/styles.css` menggunakan format `oklch`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  --muted: oklch(0.968 0.007 247.896);
  --border: oklch(0.929 0.013 255.508);
  /* ... */
}

.dark {
  --background: oklch(0.129 0.042 264.695);
  /* ... */
}
```

Token otomatis terhubung ke utility class Tailwind via blok `@theme inline`:

```tsx
<div className="bg-background text-foreground border border-border">
  <button className="bg-primary text-primary-foreground">Klik</button>
</div>
```

### Menambah token baru

1. Tambahkan variabel di `:root` (light) **dan** `.dark` (dark).
2. Daftarkan di `@theme inline` sebagai `--color-<nama>: var(--<nama>)`.
3. Pakai sebagai class Tailwind: `bg-<nama>`, `text-<nama>`, dst.

---

## Path Aliases

| Alias  | Folder      |
| ------ | ----------- |
| `@/*`  | `src/*`     |

Contoh:

```ts
import { PageShell } from "@/components/layout/PageShell";
import { ExampleList } from "@/features/example";
import { env } from "@/config/env";
```

---

## Environment Variables

Variabel yang diawali `VITE_` akan ter-expose ke client. Akses lewat helper di `src/config/env.ts` agar typed & aman:

```ts
import { env } from "@/config/env";

console.log(env.appUrl, env.isDev);
```

`.env.local`:

```bash
VITE_APP_URL=http://localhost:5173
```

> Untuk secret server-side (API key, dsb), simpan **tanpa** prefix `VITE_` dan baca hanya di server function — **jangan pernah** dibaca dari kode yang ter-bundle ke client.

---

## Convention Cheatsheet

### Penamaan file

| Jenis        | Konvensi             | Contoh                    |
| ------------ | -------------------- | ------------------------- |
| Komponen     | `PascalCase.tsx`     | `PostCard.tsx`            |
| Hook         | `useXxx.ts`          | `usePosts.ts`             |
| Util         | `camelCase.ts`       | `formatDate.ts`           |
| Type         | `types.ts`           | `types.ts`                |
| Route        | `flat.dot.case.tsx`  | `posts.$postId.tsx`       |
| Barrel       | `index.ts`           | `features/posts/index.ts` |

### Komponen

- 1 komponen = 1 file.
- Props pakai `interface`, bukan inline type, kalau ≥2 properti.
- Hindari default export di komponen — pakai named export biar konsisten.

### Hooks

- Selalu diawali `use`.
- Kalau pakai data fetching, gunakan TanStack Query.

### Server logic (kalau nanti dibutuhkan)

- Server function → file `*.functions.ts` di `src/lib/` atau dekat route pemanggil.
- HTTP endpoint → `src/routes/api/...`.
- Webhook publik → `src/routes/api/public/...`.

---

## FAQ

**Q: Kapan saya buat folder fitur baru vs taruh di global?**
A: Mulai di global kalau cuma 1 file kecil. Begitu folder mulai berisi >3 file yang saling terkait dengan domain yang sama → naikkan jadi feature.

**Q: Boleh nggak fitur A pakai komponen dari fitur B?**
A: Boleh, tapi hanya yang diekspor dari `features/B/index.ts`. Kalau yang dibutuhkan privat di B, pertimbangkan: (a) ekspor dari B, atau (b) angkat ke `components/common/`.

**Q: Di mana saya taruh konteks (Context API)?**
A: Kalau lintas-fitur → `src/app/providers.tsx`. Kalau khusus 1 fitur → di dalam fitur itu (`features/<nama>/context.tsx`), dan provider-nya ikut di-export lewat `index.ts`.

**Q: Boleh pakai default export di route?**
A: TanStack Start butuh named export `Route` dari setiap file route. Komponen halamannya boleh function declaration biasa di file yang sama.

**Q: Kenapa tidak ada `src/pages/`?**
A: Itu konvensi framework lain (Next.js Pages Router, Nuxt). TanStack Start pakai `src/routes/` dengan flat file naming.

---

## Lisensi

MIT — bebas dipakai dan dimodifikasi.
