import DeviceCard from '../device/DeviceCard.jsx';
import Skeleton from '../ui/Skeleton.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import ErrorState from '../ui/ErrorState.jsx';
import Button from '../ui/Button.jsx';

// Grid hasil katalog: menangani loading / error / empty / data.
export default function DeviceGrid({ devices, loading, error, onRetry, onReset }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="mt-4 h-4 w-24" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (devices.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="Tidak ada perangkat yang cocok"
        description="Coba ubah atau reset filter pencarian Anda."
        action={
          <Button variant="secondary" onClick={onReset}>
            Reset filter
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {devices.map((d) => (
        <DeviceCard key={d.id} device={d} />
      ))}
    </div>
  );
}
