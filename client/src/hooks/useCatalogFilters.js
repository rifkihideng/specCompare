import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Hook untuk membaca/menulis filter katalog dari URL.
// Menyimpan filter di URL membuatnya bisa dibagikan (shareable)
// dan konsisten dengan navigasi dari halaman lain (mis. Beranda).
export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      q: searchParams.get('q') ?? '',
      kategori: searchParams.get('kategori') ?? '',
      merek: searchParams.getAll('merek'),
      min: searchParams.get('min') ?? '',
      max: searchParams.get('max') ?? '',
      sort: searchParams.get('sort') ?? 'default',
    }),
    [searchParams],
  );

  // Menggabungkan perubahan (patch) ke parameter URL yang sudah ada.
  // Nilai kosong / array kosong berarti parameter tersebut dihapus.
  const update = (patch) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
      next.delete(key);
      if (Array.isArray(value)) {
        value.forEach((v) => next.append(key, v));
      } else if (value) {
        next.set(key, value);
      }
    });

    setSearchParams(next);
  };

  const reset = () => setSearchParams(new URLSearchParams());

  return { filters, update, reset };
}
