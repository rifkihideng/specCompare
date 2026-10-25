import { useAsync } from '../../hooks/useAsync.js';
import { fetchPopularDevices } from '../../api/index.js';
import DeviceCard from '../device/DeviceCard.jsx';
import Skeleton from '../ui/Skeleton.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import ErrorState from '../ui/ErrorState.jsx';
import { Package } from 'lucide-react';

// Bagian "Perangkat populer": menangani keempat kondisi UI —
// loading (skeleton), error (ErrorState), kosong (EmptyState), dan data (grid).
export default function PopularDevices() {
  const { data: devices, loading, error, retry } = useAsync(fetchPopularDevices);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-slate-900">Perangkat populer</h2>
      <p className="mt-1 text-sm text-slate-500">Spesifikasi &amp; harga bersifat referensi.</p>

      <div className="mt-6">
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="mt-4 h-4 w-24" />
                <Skeleton className="mt-2 h-4 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && <ErrorState onRetry={retry} />}

        {!loading && !error && devices.length === 0 && (
          <EmptyState
            icon={Package}
            title="Belum ada perangkat"
            description="Perangkat populer akan muncul di sini."
          />
        )}

        {!loading && !error && devices.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((d) => (
              <DeviceCard key={d.id} device={d} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
