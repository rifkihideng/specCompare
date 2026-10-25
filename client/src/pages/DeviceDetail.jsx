import { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { useAsync } from '../hooks/useAsync.js';
import { fetchDeviceBySlug } from '../api/index.js';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Skeleton from '../components/ui/Skeleton.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import SpecTable from '../components/device/SpecTable.jsx';
import PriceInfo from '../components/device/PriceInfo.jsx';
import { formatIDR } from '../utils/format.js';
import { categoryIcon } from '../utils/categoryIcons.js';
import { isInCompare, toggleCompare } from '../utils/compare.js';

// Skeleton khusus halaman detail (bentuknya menyerupai layout aslinya).
function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-4 w-48" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}

// Halaman Detail Perangkat: header + spesifikasi + daftar harga.
export default function DeviceDetail() {
  const { slug } = useParams();
  const load = useCallback(() => fetchDeviceBySlug(slug), [slug]);
  const { data: device, loading, error, retry } = useAsync(load);
  const [notice, setNotice] = useState('');

  if (loading) return <DetailSkeleton />;

  if (error && error.status === 404) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={SearchX}
          title="Perangkat tidak ditemukan"
          description={`Tidak ada perangkat dengan alamat "${slug}".`}
          action={
            <Link
              to="/katalog"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Lihat katalog
            </Link>
          }
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <ErrorState onRetry={retry} />
      </div>
    );
  }

  if (!device) return null;

  const inCompare = isInCompare(device.id);
  const DeviceIcon = categoryIcon(device.category);

  const onToggleCompare = () => {
    const result = toggleCompare(device.id);
    if (result === null) {
      setNotice('Maksimal 3 perangkat untuk dibandingkan.');
    } else if (result) {
      setNotice('Ditambahkan ke perbandingan.');
    } else {
      setNotice('Dihapus dari perbandingan.');
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-slate-900">Beranda</Link>
        <span className="mx-1">/</span>
        <Link to="/katalog" className="hover:text-slate-900">Katalog</Link>
        <span className="mx-1">/</span>
        <span className="text-slate-900">{device.name}</span>
      </nav>

      {/* Header */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200">
          <DeviceIcon className="h-20 w-20 text-slate-400" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="amber">Referensi</Badge>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {device.brand}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">{device.category}</span>
          </div>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            {device.name}
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            {device.description ?? 'Data perangkat bersifat referensi.'}
          </p>

          <p className="mt-4 text-2xl font-bold text-emerald-600">
            {formatIDR(device.priceMin)}
            <span className="text-sm font-normal text-slate-400">
              {' '}– {formatIDR(device.priceMax)}
            </span>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button onClick={onToggleCompare} variant={inCompare ? 'secondary' : 'primary'}>
              {inCompare ? 'Hapus dari Bandingkan' : 'Tambahkan ke Bandingkan'}
            </Button>
            <Link
              to="/bandingkan"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Lihat perbandingan →
            </Link>
            {notice && <span className="text-sm text-slate-500">{notice}</span>}
          </div>
        </div>
      </div>

      {/* Spesifikasi */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Spesifikasi</h2>
        <div className="mt-4">
          <SpecTable specs={device.specs} />
        </div>
      </section>

      {/* Harga */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Informasi harga</h2>
        <p className="mt-1 text-sm text-slate-500">Harga referensi, bukan penawaran final.</p>
        <div className="mt-4">
          <PriceInfo device={device} />
        </div>
      </section>
    </div>
  );
}
