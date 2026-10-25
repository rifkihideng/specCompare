import { Laptop, Smartphone, Tablet, Monitor, Headphones, Package } from 'lucide-react';

// Pemetaan kategori → ikon Lucide. Dipakai di kartu perangkat,
// halaman detail, tabel banding, dan grid kategori agar ikon
// konsisten di seluruh aplikasi.
const MAP = {
  laptop: Laptop,
  smartphone: Smartphone,
  tablet: Tablet,
  monitor: Monitor,
  headphone: Headphones,
};

// Menerima slug ('laptop') atau nama ('Laptop') dan mengembalikan
// komponen ikon. Fallback ke Package bila kategori tidak dikenal.
export function categoryIcon(slugOrName) {
  const key = String(slugOrName).toLowerCase();
  return MAP[key] ?? Package;
}
