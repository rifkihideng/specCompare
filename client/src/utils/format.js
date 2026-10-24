// Memformat angka menjadi Rupiah, mis. 12999000 -> "Rp 12.999.000".
export function formatIDR(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}
