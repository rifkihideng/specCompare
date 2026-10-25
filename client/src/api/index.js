import { categories, devices, specs } from './deviceData.js';

// Simulasi jeda jaringan agar loading state terlihat saat pengembangan.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Catatan penting:
// Untuk saat ini fungsi-fungsi di bawah membaca data lokal (referensi).
// Pada Tahap 2–3, isi fungsi diganti dengan fetch('/api/...')
// TANPA mengubah komponen pemakainya — hanya lapisan ini yang berubah.

export async function fetchCategories() {
  await delay(400);
  return categories;
}

export async function fetchBrands() {
  await delay(300);
  // Kumpulan merek unik, diurutkan alfabetis.
  return [...new Set(devices.map((d) => d.brand))].sort();
}

export async function fetchPopularDevices() {
  await delay(700);
  // Untuk menguji ErrorState, ganti baris di bawah dengan:
  // throw new Error('Gagal memuat data dari server.');
  return devices.slice(0, 6);
}

// Mengambil daftar perangkat sesuai filter.
// Untuk sementara memfilter data lokal; pada Tahap 2–3
// akan diganti dengan request ke backend, mis.
// GET /api/devices?category=&brand=&minPrice=&maxPrice=&q=&sort=
export async function fetchDevices({
  q = '',
  kategori = '',
  merek = [],
  min = '',
  max = '',
  sort = 'default',
} = {}) {
  await delay(500);

  let items = [...devices];

  // Pencarian teks: cocokkan nama, merek, atau kategori.
  if (q) {
    const needle = q.toLowerCase();
    items = items.filter((d) =>
      [d.name, d.brand, d.category].some((field) =>
        field.toLowerCase().includes(needle),
      ),
    );
  }

  if (kategori) {
    items = items.filter((d) => d.category.toLowerCase() === kategori);
  }

  if (merek.length > 0) {
    items = items.filter((d) => merek.includes(d.brand));
  }

  if (min) {
    const minNum = Number(min);
    items = items.filter((d) => d.priceMin >= minNum);
  }

  if (max) {
    const maxNum = Number(max);
    items = items.filter((d) => d.priceMin <= maxNum);
  }

  switch (sort) {
    case 'price_asc':
      items.sort((a, b) => a.priceMin - b.priceMin);
      break;
    case 'price_desc':
      items.sort((a, b) => b.priceMin - a.priceMin);
      break;
    case 'name_asc':
      items.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return items;
}

// Mengambil beberapa perangkat lengkap (beserta spesifikasi) berdasarkan
// daftar id, untuk halaman Bandingkan. Urutan hasil mengikuti urutan id.
export async function fetchCompareDevices(ids) {
  await delay(500);

  return ids
    .map((id) => devices.find((d) => d.id === id))
    .filter(Boolean)
    .map((d) => ({
      ...d,
      specs: specs[d.slug] ?? [],
    }));
}

// Error khusus dengan kode status HTTP, agar halaman dapat membedakan
// "tidak ditemukan" (404) dari kegagalan umum.
export class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

// Mengambil satu perangkat lengkap (termasuk spesifikasi) berdasarkan slug.
// Melempar ApiError(404) bila slug tidak dikenal.
export async function fetchDeviceBySlug(slug) {
  await delay(500);

  const device = devices.find((d) => d.slug === slug);
  if (!device) {
    throw new ApiError('Perangkat tidak ditemukan', 404);
  }

  return {
    ...device,
    specs: specs[slug] ?? [],
  };
}
