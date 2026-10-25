import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, SearchX } from 'lucide-react';
import { useAsync } from '../hooks/useAsync.js';
import { fetchCompareDevices } from '../api/index.js';
import CompareTable from '../components/compare/CompareTable.jsx';
import Button from '../components/ui/Button.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import { clearCompare, getCompareList, toggleCompare } from '../utils/compare.js';

// Halaman Bandingkan: menampilkan tabel perbandingan perangkat yang
// dipilih (disimpan di localStorage, maks 3).
export default function Compare() {
  const [ids, setIds] = useState(getCompareList);

  // load dibuat ulang saat `ids` berubah, sehingga useAsync memuat ulang.
  const load = useCallback(() => fetchCompareDevices(ids), [ids]);
  const { data: devicesData, loading, error, retry } = useAsync(load);
  const devices = devicesData ?? [];

  const remove = (id) => {
    toggleCompare(id);
    setIds(getCompareList());
  };

  const clearAll = () => {
    clearCompare();
    setIds([]);
  };

  // Tidak ada pilihan sama sekali.
  if (ids.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-bold text-slate-900">Bandingkan perangkat</h1>
        <div className="mt-6">
          <EmptyState
            icon={Scale}
            title="Belum ada perangkat yang dipilih"
            description="Pilih 2–3 perangkat dari halaman detail atau katalog untuk membandingkan spesifikasi dan harganya."
            action={
              <Link
                to="/katalog"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Pilih perangkat
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bandingkan perangkat</h1>
          <p className="text-sm text-slate-500">{devices.length} dari 3 dipilih</p>
        </div>
        <div className="flex gap-2">
          <Button as={Link} to="/katalog" variant="secondary">
            + Tambah perangkat
          </Button>
          <Button variant="ghost" onClick={clearAll}>
            Kosongkan
          </Button>
        </div>
      </div>

      {ids.length < 2 && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Pilih minimal 2 perangkat agar perbandingan lebih berarti.
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-block h-3 w-3 rounded bg-amber-100 ring-1 ring-amber-300" />
        Sel berwarna kuning menandakan perbedaan antar perangkat.
      </div>

      <div className="mt-4">
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : error ? (
          <ErrorState onRetry={retry} />
        ) : devices.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Perangkat tidak ditemukan"
            description="Pilihan tersimpan mungkin sudah tidak ada. Silakan pilih ulang."
            action={<Button variant="secondary" onClick={clearAll}>Kosongkan pilihan</Button>}
          />
        ) : (
          <CompareTable devices={devices} onRemove={remove} />
        )}
      </div>
    </div>
  );
}
