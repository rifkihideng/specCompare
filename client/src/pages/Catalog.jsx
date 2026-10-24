import { useCallback, useState } from 'react';
import { useAsync } from '../hooks/useAsync.js';
import { fetchBrands, fetchCategories, fetchDevices } from '../api/index.js';
import { useCatalogFilters } from '../hooks/useCatalogFilters.js';
import FilterSidebar from '../components/catalog/FilterSidebar.jsx';
import Toolbar from '../components/catalog/Toolbar.jsx';
import DeviceGrid from '../components/catalog/DeviceGrid.jsx';

// Halaman Katalog: sidebar filter + toolbar + grid hasil.
// Semua filter disimpan di URL lewat useCatalogFilters.
export default function Catalog() {
  const { filters, update, reset } = useCatalogFilters();
  const { data: categoriesData } = useAsync(fetchCategories);
  const { data: brandsData } = useAsync(fetchBrands);
  const [showFilters, setShowFilters] = useState(false);

  const categories = categoriesData ?? [];
  const brands = brandsData ?? [];

  // loadDevices dibuat ulang setiap kali `filters` berubah,
  // sehingga useAsync otomatis memuat ulang data dengan filter baru.
  const loadDevices = useCallback(() => fetchDevices(filters), [filters]);
  const { data: devicesData, loading, error, retry } = useAsync(loadDevices);
  const devices = devicesData ?? [];

  const countText = error
    ? 'Gagal memuat data'
    : loading
      ? 'Memuat…'
      : `${devices.length} perangkat ditemukan`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Katalog perangkat</h1>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 lg:hidden"
        >
          {showFilters ? 'Tutup filter' : 'Filter'}
        </button>
      </div>

      <div className="mt-6 lg:grid lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-8">
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <FilterSidebar
            categories={categories}
            brands={brands}
            filters={filters}
            onUpdate={update}
            onReset={reset}
          />
        </aside>

        <div className="space-y-4">
          <Toolbar
            countText={countText}
            q={filters.q}
            sort={filters.sort}
            onSearch={(q) => update({ q })}
            onSort={(sort) => update({ sort: sort === 'default' ? '' : sort })}
          />
          <DeviceGrid
            devices={devices}
            loading={loading}
            error={error}
            onRetry={retry}
            onReset={reset}
          />
        </div>
      </div>
    </div>
  );
}
