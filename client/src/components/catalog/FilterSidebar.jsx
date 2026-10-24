import { useEffect, useState } from 'react';
import Button from '../ui/Button.jsx';

const inputClass =
  'rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/30';

// Panel filter: kategori (pilih satu), merek (multi), dan rentang harga.
export default function FilterSidebar({ categories, brands, filters, onUpdate, onReset }) {
  const [price, setPrice] = useState({ min: filters.min, max: filters.max });

  // Sinkronkan input harga bila nilai filter berubah dari luar
  // (mis. saat tombol Reset ditekan).
  useEffect(() => {
    setPrice({ min: filters.min, max: filters.max });
  }, [filters.min, filters.max]);

  const toggleBrand = (brand) => {
    const next = filters.merek.includes(brand)
      ? filters.merek.filter((b) => b !== brand)
      : [...filters.merek, brand];
    onUpdate({ merek: next });
  };

  const applyPrice = (e) => {
    e.preventDefault();
    onUpdate({ min: price.min, max: price.max });
  };

  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Filter</h2>
        <button onClick={onReset} className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
          Reset
        </button>
      </div>

      {/* Kategori (pilih satu) */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Kategori</h3>
        <div className="mt-2 space-y-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="kategori"
              className="accent-indigo-600"
              checked={!filters.kategori}
              onChange={() => onUpdate({ kategori: '' })}
            />
            Semua
          </label>
          {categories.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="kategori"
                className="accent-indigo-600"
                checked={filters.kategori === c.slug}
                onChange={() => onUpdate({ kategori: c.slug })}
              />
              <span>{c.icon}</span> {c.name}
            </label>
          ))}
        </div>
      </div>

      {/* Merek (bisa lebih dari satu) */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Merek</h3>
        <div className="mt-2 space-y-1">
          {brands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="accent-indigo-600"
                checked={filters.merek.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Rentang harga */}
      <form onSubmit={applyPrice}>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Harga (Rp)</h3>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={price.min}
            onChange={(e) => setPrice((p) => ({ ...p, min: e.target.value }))}
            className={`w-full ${inputClass}`}
          />
          <span className="text-slate-400">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={price.max}
            onChange={(e) => setPrice((p) => ({ ...p, max: e.target.value }))}
            className={`w-full ${inputClass}`}
          />
        </div>
        <Button type="submit" variant="secondary" className="mt-2 w-full">
          Terapkan harga
        </Button>
      </form>
    </div>
  );
}
