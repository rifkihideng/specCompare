// Penyimpanan lokal untuk daftar perangkat yang akan dibandingkan.
// Disimpan di localStorage agar pilihan tidak hilang saat berpindah halaman.
const KEY = 'speccompare.compare';
const MAX = 3;

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function getCompareList() {
  return read();
}

export function isInCompare(id) {
  return read().includes(id);
}

// Tambah/hapus perangkat dari daftar banding.
// Mengembalikan: true jika ditambahkan, false jika dihapus, null jika penuh.
export function toggleCompare(id) {
  const list = read();

  if (list.includes(id)) {
    write(list.filter((x) => x !== id));
    return false;
  }

  if (list.length >= MAX) {
    return null;
  }

  write([...list, id]);
  return true;
}

export function clearCompare() {
  write([]);
}
