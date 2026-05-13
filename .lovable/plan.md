## Tujuan

Menyiapkan starter frontend dengan struktur folder **hybrid modular** — layer global untuk hal yang dipakai bersama, dan folder `features/` untuk modul mandiri. Tanpa backend, tanpa fitur khusus — hanya kerangka yang rapi & siap dipakai.

## Struktur folder

```text
src/
├── app/                      # Konfigurasi level aplikasi
│   ├── providers.tsx         # Pembungkus provider (QueryClient, Theme, dll)
│   └── constants.ts          # Konstanta global (nama app, dll)
│
├── routes/                   # File-based routing TanStack (sudah ada)
│   ├── __root.tsx
│   └── index.tsx             # Halaman home starter
│
├── components/               # Komponen UI yang dipakai lintas fitur
│   ├── ui/                   # shadcn (sudah ada)
│   ├── layout/               # Header, Footer, Container, PageShell
│   └── common/               # Logo, EmptyState, LoadingSpinner
│
├── features/                 # Modul mandiri per domain
│   └── example/              # Contoh modul referensi
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── types.ts
│       ├── utils.ts
│       └── index.ts          # Public API modul (barrel)
│
├── hooks/                    # Hooks global (use-mobile, dll)
├── lib/                      # Util pihak ketiga & helper inti (utils.ts, dll)
├── utils/                    # Util murni (format, validasi)
├── types/                    # Type global bersama
├── config/                   # Konfigurasi env & app config
└── styles.css                # Design tokens (sudah ada)
```

## Aturan modular (didokumentasikan di README)

- **Global vs feature**: kalau hanya dipakai 1 modul → taruh di `features/<nama>/`. Kalau dipakai ≥2 modul → naikkan ke layer global (`components/`, `hooks/`, `utils/`).
- **Feature isolation**: antar feature **tidak boleh** saling import internal. Hanya boleh lewat `features/<nama>/index.ts` (barrel).
- **Routing**: `routes/` hanya merangkai feature, tidak berisi logika bisnis.

## Yang akan dibuat

1. Folder kosong + file `.gitkeep` untuk: `app/`, `components/layout/`, `components/common/`, `features/`, `utils/`, `types/`, `config/`.
2. `src/app/providers.tsx` — wrapper provider yang dipakai `__root.tsx` (memindah `QueryClientProvider` ke sini agar lebih bersih).
3. `src/app/constants.ts` — `APP_NAME`, dll.
4. `src/config/env.ts` — pembaca env yang aman & typed.
5. `src/components/layout/PageShell.tsx` — layout dasar (header/main/footer).
6. `src/features/example/` — modul contoh lengkap (component + hook + types + barrel) sebagai template referensi.
7. `src/routes/index.tsx` — halaman starter yang menampilkan struktur folder & cara pakai (mengganti placeholder).
8. `ARCHITECTURE.md` di root — penjelasan singkat aturan modular & cara menambah feature baru.

## Catatan teknis

- Tetap pakai TanStack Start + Tailwind v4 + shadcn yang sudah terpasang.
- Tidak ada dependensi baru.
- Semua warna pakai design token dari `src/styles.css` (tidak ada warna hardcoded).
- Tidak mengaktifkan Lovable Cloud (sesuai permintaan).
