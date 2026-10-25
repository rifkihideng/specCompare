# SpecCompare — Rencana Pengembangan (MVP)

Platform perbandingan spesifikasi & harga perangkat elektronik.

> **Catatan data:** nama produk adalah produk asli. Spesifikasi berupa informasi umum (dapat berbeda per varian/wilayah). Harga adalah **referensi/perkiraan** dengan label sumber & tanggal akses — tidak ada harga yang diklaim sebagai data aktual tanpa sumber terverifikasi.

---

## 1. Pemetaan Kebutuhan → Fitur → Keputusan Teknis

| Kebutuhan | Fitur | Catatan Teknis |
|---|---|---|
| Menemukan perangkat | Beranda: pencarian, kategori, perangkat populer | Pencarian teks pakai `LIKE`/FTS SQLite di MVP |
| Menjelajah perangkat | Katalog + filter (merek, harga, spesifikasi) | Filter & sort di query backend |
| Melihat detail | Halaman detail perangkat | Endpoint `GET /devices/:id` |
| Membandingkan | Bandingkan 2–3 perangkat + penanda perbedaan | Logika diff di frontend |
| Membandingkan harga | Daftar penawaran per penjual + sumber + waktu update | Tabel `price_offers` |
| Menyimpan favorit | Fitur favorit | `localStorage` di MVP |
| Mengelola data | Dashboard admin CRUD | Rute `/admin`, dilindungi autentikasi |
| Rekomendasi | Pencarian & rekomendasi | Kategori sama + rentang harga |

**Ditunda (bukan MVP):** akun pengguna publik, pembayaran, komentar/review, notifikasi, scraping otomatis, deployment.

---

## 2. Keputusan Teknis

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Driver SQLite | `better-sqlite3` | Sinkron, cepat, API sederhana, tanpa ORM |
| Struktur query | SQL mentah + file migrasi `.sql` | Transparan untuk belajar |
| Autentikasi admin | Session berbasis cookie + `bcrypt` | Aman & sederhana untuk dashboard admin |
| Validasi input | `zod` | Validasi deklaratif di boundary API |
| Monorepo | `client/` + `server/` dalam satu repo | Pisah tanggung jawab, satu perintah `npm run dev` |
| Data demo | Seed script + flag `is_demo` | Memenuhi ketentuan data demo & tanpa klaim data aktual |
| Error handling | Middleware error terpusat + `ApiError` | Format respons error konsisten |

---

## 3. Arsitektur

```
Browser (React + Vite + Tailwind)
        │  HTTP/JSON
        ▼
Express API (server/)
   ├─ routes/        → definisi endpoint
   ├─ controllers/   → logika request/response
   ├─ services/      → logika bisnis
   ├─ db/            → koneksi + migrasi + seed
   ├─ middleware/    → auth, error, validasi
   └─ utils/
        │
        ▼
   SQLite (data/speccompare.db)
```

---

## 4. Struktur Folder

```
speccompare/
├─ package.json            # root: script dev (client+server)
├─ README.md
├─ docs/                   # dokumentasi
├─ client/                 # React + Vite + Tailwind
│  ├─ index.html
│  ├─ vite.config.js
│  ├─ src/
│  │  ├─ main.jsx
│  │  ├─ App.jsx           # Router
│  │  ├─ api/              # layanan fetch
│  │  ├─ components/       # UI reusable
│  │  ├─ pages/            # Home, Catalog, DeviceDetail, ...
│  │  ├─ hooks/
│  │  ├─ context/
│  │  └─ utils/
└─ server/
   ├─ package.json
   ├─ src/
   │  ├─ index.js          # entry point
   │  ├─ app.js            # konfigurasi express
   │  ├─ config.js         # env/konfigurasi
   │  ├─ routes/
   │  ├─ controllers/
   │  ├─ services/
   │  ├─ middleware/
   │  ├─ db/
   │  └─ utils/
   └─ data/                # file DB
```

---

## 5. Rancangan Database

```sql
CREATE TABLE brands (
  id        INTEGER PRIMARY KEY,
  name      TEXT NOT NULL UNIQUE,
  slug      TEXT NOT NULL UNIQUE,
  is_demo   INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE categories (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE devices (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  brand_id    INTEGER NOT NULL REFERENCES brands(id),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  description TEXT,
  image_url   TEXT,
  launch_year INTEGER,
  is_demo     INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT
);

CREATE TABLE specs (
  id            INTEGER PRIMARY KEY,
  device_id     INTEGER NOT NULL REFERENCES devices(id),
  spec_key      TEXT NOT NULL,
  spec_value    TEXT NOT NULL,
  unit          TEXT,
  display_order INTEGER DEFAULT 0,
  UNIQUE(device_id, spec_key)
);

CREATE TABLE sellers (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL UNIQUE,
  is_demo INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE price_offers (
  id         INTEGER PRIMARY KEY,
  device_id  INTEGER NOT NULL REFERENCES devices(id),
  seller_id  INTEGER NOT NULL REFERENCES sellers(id),
  price      REAL NOT NULL CHECK (price >= 0),
  currency   TEXT NOT NULL DEFAULT 'IDR',
  url        TEXT,
  in_stock   INTEGER DEFAULT 1,
  source     TEXT,
  is_demo    INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE admin_users (
  id            INTEGER PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);
```

Alasan memakai `specs` sebagai key-value: spesifikasi laptop vs smartphone sangat berbeda (RAM/GPU vs kamera/baterai).

---

## 6. Rancangan Endpoint API (MVP)

```
Publik:
GET  /api/brands
GET  /api/categories
GET  /api/devices             ?category=&brand=&minPrice=&maxPrice=&q=&sort=
GET  /api/devices/:id
GET  /api/devices/compare?ids=1,2,3
GET  /api/search/recommend

Admin (perlu login):
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/admin/devices
PUT  /api/admin/devices/:id
DELETE /api/admin/devices/:id
POST /api/admin/devices/:id/specs
PUT  /api/admin/specs/:id
DELETE /api/admin/specs/:id
POST /api/admin/devices/:id/offers
PUT  /api/admin/offers/:id
DELETE /api/admin/offers/:id
```

---

## 7. Roadmap Pengembangan

| Tahap | Isi | Hasil yang bisa diverifikasi |
|---|---|---|
| 0 | Scaffolding: root, client (Vite+Tailwind), server (Express), `npm run dev` | Kedua server jalan bersamaan |
| 1 | Database: skema + migrasi + seed data demo | DB terbentuk & terisi |
| 2 | API publik: brands, categories, devices | Bisa diuji via REST client |
| 3 | Frontend: Beranda + Katalog + filter | Bisa browse & filter |
| 4 | Frontend: Detail perangkat + daftar harga | Halaman detail tampil |
| 5 | Fitur Bandingkan (2–3 perangkat) + penanda perbedaan | Tabel perbandingan jalan |
| 6 | Favorit (localStorage) | Simpan/lihat favorit |
| 7 | Autentikasi admin + kontrol akses | Login admin & proteksi rute |
| 8 | Dashboard admin CRUD | CRUD perangkat/spesifikasi/harga |
| 9 | Pencarian + rekomendasi + polish responsif | Pencarian & rekomendasi jalan |
