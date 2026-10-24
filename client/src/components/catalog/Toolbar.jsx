import { useEffect, useState } from 'react';

// Baris atas katalog: jumlah hasil, pencarian, dan pilihan urutan.
export default function Toolbar({ countText, q, sort, onSearch, onSort }) {
  const [value, setValue] = useState(q);

  // Jika q berubah dari luar (mis. dari pencarian Beranda), samakan nilai input.
  useEffect(() => setValue(q), [q]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">{countText}</p>

      <div className="flex gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(value.trim());
          }}
          className="flex flex-1 gap-2 sm:flex-none"
        >
          <label htmlFor="catalog-search" className="sr-only">
            Cari perangkat
          </label>
          <input
            id="catalog-search"
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Cari perangkat…"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/30"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Cari
          </button>
        </form>

        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="default">Paling relevan</option>
          <option value="price_asc">Harga terendah</option>
          <option value="price_desc">Harga tertinggi</option>
          <option value="name_asc">Nama A–Z</option>
        </select>
      </div>
    </div>
  );
}
