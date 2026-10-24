# SpecCompare

Platform perbandingan spesifikasi & harga perangkat elektronik (MVP).

> **Status data:** seluruh data perangkat & harga pada proyek ini adalah **data demo** (fiktif) dan diberi label jelas. Harga bukan data aktual dan tidak memiliki sumber verifikasi produk riil.

## Struktur

- `client/` — Frontend React + Vite + Tailwind CSS
- `server/` — Backend Node.js + Express + SQLite
- `docs/` — Dokumentasi perencanaan (lihat [docs/PLAN.md](docs/PLAN.md))

## Menjalankan

Persyaratan: Node.js 18+ dan npm.

```bash
npm run setup   # install semua dependensi (root, server, client)
npm run dev     # backend di http://localhost:4000, frontend di http://localhost:5173
```

Lalu buka http://localhost:5173
