import { demoCategories, demoDevices } from './demoData.js';

// Simulasi jeda jaringan agar loading state terlihat saat pengembangan.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Catatan penting:
// Untuk saat ini fungsi-fungsi di bawah membaca data demo lokal.
// Pada Tahap 2–3, isi fungsi diganti dengan fetch('/api/...')
// TANPA mengubah komponen pemakainya — hanya lapisan ini yang berubah.

export async function fetchCategories() {
  await delay(400);
  return demoCategories;
}

export async function fetchBrands() {
  await delay(300);
  // Kumpulan merek unik, diurutkan alfabetis.
  return [...new Set(demoDevices.map((d) => d.brand))].sort();
}

export async function fetchPopularDevices() {
  await delay(700);
  // Untuk menguji ErrorState, ganti baris di bawah dengan:
  // throw new Error('Gagal memuat data dari server.');
  return demoDevices.slice(0, 6);
}

// Mengambil daftar perangkat sesuai filter.
// Untuk sementara memfilter data demo secara lokal; pada Tahap 2–3
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

  let items = [...demoDevices];

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
