// ============================================================
// DATA DEMO — seluruh isi file ini adalah data fiktif (demo).
// Bukan data produk / harga aktual, tanpa klaim sumber nyata.
// ============================================================

export const demoCategories = [
  { id: 1, name: 'Laptop', slug: 'laptop', icon: '💻' },
  { id: 2, name: 'Smartphone', slug: 'smartphone', icon: '📱' },
  { id: 3, name: 'Tablet', slug: 'tablet', icon: '📲' },
  { id: 4, name: 'Monitor', slug: 'monitor', icon: '🖥️' },
  { id: 5, name: 'Headphone', slug: 'headphone', icon: '🎧' },
];

export const demoDevices = [
  {
    id: 1,
    slug: 'nebula-book-pro-14',
    name: 'NebulaBook Pro 14',
    brand: 'Nebula',
    category: 'Laptop',
    priceMin: 12_999_000,
    priceMax: 15_499_000,
    keySpecs: ['Intel Core Ultra 7', '16 GB RAM', '512 GB SSD'],
    isDemo: true,
  },
  {
    id: 2,
    slug: 'pulse-x15',
    name: 'Pulse X15',
    brand: 'Pulse',
    category: 'Laptop',
    priceMin: 9_499_000,
    priceMax: 11_200_000,
    keySpecs: ['AMD Ryzen 5', '8 GB RAM', '256 GB SSD'],
    isDemo: true,
  },
  {
    id: 3,
    slug: 'orion-phone-5',
    name: 'Orion Phone 5',
    brand: 'Orion',
    category: 'Smartphone',
    priceMin: 4_299_000,
    priceMax: 4_899_000,
    keySpecs: ['6.5" AMOLED', '8 GB RAM', '5000 mAh'],
    isDemo: true,
  },
  {
    id: 4,
    slug: 'orion-phone-5-pro',
    name: 'Orion Phone 5 Pro',
    brand: 'Orion',
    category: 'Smartphone',
    priceMin: 7_599_000,
    priceMax: 8_199_000,
    keySpecs: ['6.7" AMOLED', '12 GB RAM', 'Kamera 50 MP'],
    isDemo: true,
  },
  {
    id: 5,
    slug: 'slate-tab-10',
    name: 'SlateTab 10',
    brand: 'Slate',
    category: 'Tablet',
    priceMin: 3_199_000,
    priceMax: 3_799_000,
    keySpecs: ['10.9" IPS', '6 GB RAM', '128 GB'],
    isDemo: true,
  },
  {
    id: 6,
    slug: 'nebula-view-27',
    name: 'NebulaView 27',
    brand: 'Nebula',
    category: 'Monitor',
    priceMin: 2_899_000,
    priceMax: 3_299_000,
    keySpecs: ['27" QHD', 'IPS', '75 Hz'],
    isDemo: true,
  },
  {
    id: 7,
    slug: 'vortexbook-air-13',
    name: 'VortexBook Air 13',
    brand: 'Vortex',
    category: 'Laptop',
    priceMin: 8_999_000,
    priceMax: 9_799_000,
    keySpecs: ['Intel Core i5', '8 GB RAM', '256 GB SSD'],
    isDemo: true,
  },
  {
    id: 8,
    slug: 'pulse-x15-pro',
    name: 'Pulse X15 Pro',
    brand: 'Pulse',
    category: 'Laptop',
    priceMin: 13_999_000,
    priceMax: 15_200_000,
    keySpecs: ['AMD Ryzen 7', '16 GB RAM', '1 TB SSD'],
    isDemo: true,
  },
  {
    id: 9,
    slug: 'aurasound-anc',
    name: 'AuraSound ANC',
    brand: 'Aura',
    category: 'Headphone',
    priceMin: 1_199_000,
    priceMax: 1_499_000,
    keySpecs: ['Active Noise Cancelling', '30 jam baterai', 'Bluetooth 5.3'],
    isDemo: true,
  },
  {
    id: 10,
    slug: 'orion-phone-5-lite',
    name: 'Orion Phone 5 Lite',
    brand: 'Orion',
    category: 'Smartphone',
    priceMin: 2_599_000,
    priceMax: 2_999_000,
    keySpecs: ['6.1" LCD', '4 GB RAM', '4000 mAh'],
    isDemo: true,
  },
  {
    id: 11,
    slug: 'slate-tab-10-pro',
    name: 'SlateTab 10 Pro',
    brand: 'Slate',
    category: 'Tablet',
    priceMin: 5_499_000,
    priceMax: 5_999_000,
    keySpecs: ['11" OLED', '8 GB RAM', '256 GB'],
    isDemo: true,
  },
];

// ============================================================
// SPESIFIKASI LENGKAP (demo). `key` adalah identitas mesin yang
// KONSISTEN lintas perangkat — dipakai halaman Bandingkan untuk
// menyamakan baris. `label` untuk tampilan, `group` untuk
// pengelompokan pada halaman Detail.
// ============================================================
export const demoSpecs = {
  'nebula-book-pro-14': [
    { key: 'prosesor', label: 'Prosesor', value: 'Intel Core Ultra 7 155H', group: 'Performa' },
    { key: 'ram', label: 'RAM', value: '16 GB', group: 'Performa' },
    { key: 'penyimpanan', label: 'Penyimpanan', value: '512 GB SSD', group: 'Performa' },
    { key: 'gpu', label: 'GPU', value: 'Intel Arc Graphics', group: 'Performa' },
    { key: 'layar', label: 'Layar', value: '14" IPS', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '2880 x 1800', group: 'Layar' },
    { key: 'baterai', label: 'Baterai', value: '72 Wh', group: 'Baterai' },
    { key: 'berat', label: 'Berat', value: '1.3 kg', group: 'Fisik' },
    { key: 'os', label: 'Sistem Operasi', value: 'Windows 11 (demo)', group: 'Umum' },
  ],
  'pulse-x15': [
    { key: 'prosesor', label: 'Prosesor', value: 'AMD Ryzen 5 7530U', group: 'Performa' },
    { key: 'ram', label: 'RAM', value: '8 GB', group: 'Performa' },
    { key: 'penyimpanan', label: 'Penyimpanan', value: '256 GB SSD', group: 'Performa' },
    { key: 'gpu', label: 'GPU', value: 'AMD Radeon Graphics', group: 'Performa' },
    { key: 'layar', label: 'Layar', value: '15.6" IPS', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '1920 x 1080', group: 'Layar' },
    { key: 'baterai', label: 'Baterai', value: '47 Wh', group: 'Baterai' },
    { key: 'berat', label: 'Berat', value: '1.7 kg', group: 'Fisik' },
    { key: 'os', label: 'Sistem Operasi', value: 'Windows 11 (demo)', group: 'Umum' },
  ],
  'orion-phone-5': [
    { key: 'chipset', label: 'Chipset', value: 'Snapdragon 6 Gen 1 (demo)', group: 'Performa' },
    { key: 'ram', label: 'RAM', value: '8 GB', group: 'Performa' },
    { key: 'penyimpanan', label: 'Penyimpanan', value: '128 GB', group: 'Performa' },
    { key: 'layar', label: 'Layar', value: '6.5" AMOLED', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '2400 x 1080', group: 'Layar' },
    { key: 'refresh_rate', label: 'Refresh Rate', value: '120 Hz', group: 'Layar' },
    { key: 'kamera_utama', label: 'Kamera Utama', value: '50 MP + 2 MP', group: 'Kamera' },
    { key: 'kamera_depan', label: 'Kamera Depan', value: '16 MP', group: 'Kamera' },
    { key: 'baterai', label: 'Baterai', value: '5000 mAh', group: 'Baterai' },
    { key: 'os', label: 'Sistem Operasi', value: 'Android 14 (demo)', group: 'Umum' },
  ],
  'orion-phone-5-pro': [
    { key: 'chipset', label: 'Chipset', value: 'Snapdragon 8 Gen 2 (demo)', group: 'Performa' },
    { key: 'ram', label: 'RAM', value: '12 GB', group: 'Performa' },
    { key: 'penyimpanan', label: 'Penyimpanan', value: '256 GB', group: 'Performa' },
    { key: 'layar', label: 'Layar', value: '6.7" AMOLED', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '3120 x 1440', group: 'Layar' },
    { key: 'refresh_rate', label: 'Refresh Rate', value: '120 Hz', group: 'Layar' },
    { key: 'kamera_utama', label: 'Kamera Utama', value: '50 MP + 12 MP + 8 MP', group: 'Kamera' },
    { key: 'kamera_depan', label: 'Kamera Depan', value: '32 MP', group: 'Kamera' },
    { key: 'baterai', label: 'Baterai', value: '5200 mAh', group: 'Baterai' },
    { key: 'os', label: 'Sistem Operasi', value: 'Android 14 (demo)', group: 'Umum' },
  ],
  'slate-tab-10': [
    { key: 'chipset', label: 'Chipset', value: 'MediaTek Helio G99 (demo)', group: 'Performa' },
    { key: 'ram', label: 'RAM', value: '6 GB', group: 'Performa' },
    { key: 'penyimpanan', label: 'Penyimpanan', value: '128 GB', group: 'Performa' },
    { key: 'layar', label: 'Layar', value: '10.9" IPS', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '2000 x 1200', group: 'Layar' },
    { key: 'baterai', label: 'Baterai', value: '8000 mAh', group: 'Baterai' },
    { key: 'berat', label: 'Berat', value: '480 g', group: 'Fisik' },
    { key: 'os', label: 'Sistem Operasi', value: 'Android 13 (demo)', group: 'Umum' },
  ],
  'nebula-view-27': [
    { key: 'layar', label: 'Layar', value: '27" IPS', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '2560 x 1440 (QHD)', group: 'Layar' },
    { key: 'refresh_rate', label: 'Refresh Rate', value: '75 Hz', group: 'Layar' },
    { key: 'panel', label: 'Panel', value: 'IPS', group: 'Layar' },
    { key: 'respon', label: 'Waktu Respon', value: '5 ms', group: 'Layar' },
    { key: 'konektivitas', label: 'Konektivitas', value: 'HDMI, DisplayPort', group: 'Konektivitas' },
  ],
  'vortexbook-air-13': [
    { key: 'prosesor', label: 'Prosesor', value: 'Intel Core i5-1235U', group: 'Performa' },
    { key: 'ram', label: 'RAM', value: '8 GB', group: 'Performa' },
    { key: 'penyimpanan', label: 'Penyimpanan', value: '256 GB SSD', group: 'Performa' },
    { key: 'gpu', label: 'GPU', value: 'Intel Iris Xe', group: 'Performa' },
    { key: 'layar', label: 'Layar', value: '13.3" IPS', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '1920 x 1200', group: 'Layar' },
    { key: 'baterai', label: 'Baterai', value: '54 Wh', group: 'Baterai' },
    { key: 'berat', label: 'Berat', value: '1.15 kg', group: 'Fisik' },
    { key: 'os', label: 'Sistem Operasi', value: 'Windows 11 (demo)', group: 'Umum' },
  ],
  'pulse-x15-pro': [
    { key: 'prosesor', label: 'Prosesor', value: 'AMD Ryzen 7 7735HS', group: 'Performa' },
    { key: 'ram', label: 'RAM', value: '16 GB', group: 'Performa' },
    { key: 'penyimpanan', label: 'Penyimpanan', value: '1 TB SSD', group: 'Performa' },
    { key: 'gpu', label: 'GPU', value: 'NVIDIA RTX 4050', group: 'Performa' },
    { key: 'layar', label: 'Layar', value: '15.6" IPS', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '2560 x 1440', group: 'Layar' },
    { key: 'baterai', label: 'Baterai', value: '80 Wh', group: 'Baterai' },
    { key: 'berat', label: 'Berat', value: '1.9 kg', group: 'Fisik' },
    { key: 'os', label: 'Sistem Operasi', value: 'Windows 11 (demo)', group: 'Umum' },
  ],
  'aurasound-anc': [
    { key: 'konektivitas', label: 'Konektivitas', value: 'Bluetooth 5.3', group: 'Konektivitas' },
    { key: 'baterai', label: 'Baterai', value: '30 jam', group: 'Baterai' },
    { key: 'anc', label: 'Noise Cancelling', value: 'Aktif (ANC)', group: 'Audio' },
    { key: 'driver', label: 'Driver', value: '40 mm', group: 'Audio' },
    { key: 'berat', label: 'Berat', value: '250 g', group: 'Fisik' },
  ],
  'orion-phone-5-lite': [
    { key: 'chipset', label: 'Chipset', value: 'Snapdragon 4 Gen 1 (demo)', group: 'Performa' },
    { key: 'ram', label: 'RAM', value: '4 GB', group: 'Performa' },
    { key: 'penyimpanan', label: 'Penyimpanan', value: '64 GB', group: 'Performa' },
    { key: 'layar', label: 'Layar', value: '6.1" LCD', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '1600 x 720', group: 'Layar' },
    { key: 'refresh_rate', label: 'Refresh Rate', value: '90 Hz', group: 'Layar' },
    { key: 'kamera_utama', label: 'Kamera Utama', value: '13 MP + 2 MP', group: 'Kamera' },
    { key: 'kamera_depan', label: 'Kamera Depan', value: '8 MP', group: 'Kamera' },
    { key: 'baterai', label: 'Baterai', value: '4000 mAh', group: 'Baterai' },
    { key: 'os', label: 'Sistem Operasi', value: 'Android 14 (demo)', group: 'Umum' },
  ],
  'slate-tab-10-pro': [
    { key: 'chipset', label: 'Chipset', value: 'Dimensity 9000 (demo)', group: 'Performa' },
    { key: 'ram', label: 'RAM', value: '8 GB', group: 'Performa' },
    { key: 'penyimpanan', label: 'Penyimpanan', value: '256 GB', group: 'Performa' },
    { key: 'layar', label: 'Layar', value: '11" OLED', group: 'Layar' },
    { key: 'resolusi', label: 'Resolusi', value: '2560 x 1600', group: 'Layar' },
    { key: 'refresh_rate', label: 'Refresh Rate', value: '120 Hz', group: 'Layar' },
    { key: 'baterai', label: 'Baterai', value: '9000 mAh', group: 'Baterai' },
    { key: 'berat', label: 'Berat', value: '510 g', group: 'Fisik' },
    { key: 'os', label: 'Sistem Operasi', value: 'Android 14 (demo)', group: 'Umum' },
  ],
};

// ============================================================
// PENAWARAN HARGA (demo). Dibuat dari rentang harga tiap perangkat.
// Semua harga fiktif, sumber diberi label "Sample data (demo)".
// ============================================================
const DEMO_SELLERS = ['TechMart Online', 'Gadget Market', 'Toko Elektronik Jaya'];

function demoOffersFor(device) {
  const { id, priceMin: min, priceMax: max } = device;
  const mid = Math.round((min + max) / 2);
  const prices = [min, mid, max];

  return prices.map((price, i) => ({
    id: `${id}-${i + 1}`,
    seller: DEMO_SELLERS[i],
    price,
    currency: 'IDR',
    url: null,
    // Penjual ketiga sengaja 'habis' agar badge stok ikut teruji di UI.
    inStock: i !== 2,
    source: 'Sample data (demo)',
    isDemo: true,
    updatedAt: new Date(Date.now() - i * 2 * 86400000).toISOString(),
  }));
}

export const demoOffers = Object.fromEntries(
  demoDevices.map((d) => [d.slug, demoOffersFor(d)]),
);
