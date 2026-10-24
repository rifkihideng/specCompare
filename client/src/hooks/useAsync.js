import { useCallback, useEffect, useState } from 'react';

// Hook umum untuk memanggil fungsi asinkron dan melacak
// status data / loading / error, plus kemampuan retry.
// `asyncFn` harus berupa referensi fungsi yang stabil
// (mis. fungsi dari modul api, bukan dibuat inline di render).
export function useAsync(asyncFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(() => {
    // Flag `active` mencegah pembaruan state setelah komponen
    // dibongkar (unmounted) atau saat request lama digantikan baru.
    let active = true;

    setLoading(true);
    setError(null);

    asyncFn()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [asyncFn]);

  // Jalankan saat mount dan setiap kali `run` berubah (mis. filter
  // berubah). Karena `run` mengembalikan fungsi cleanup (membatalkan
  // flag aktif), React akan memanggil cleanup itu saat efek diganti.
  useEffect(run, [run]);

  return { data, loading, error, retry: run };
}
