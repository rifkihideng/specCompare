import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

// Bagian teratas beranda: headline, form pencarian, dan chip kategori.
export default function Hero({ categories }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    // Arahkan ke halaman Katalog sambil membawa kata kunci pencarian.
    navigate(q ? `/katalog?q=${encodeURIComponent(q)}` : '/katalog');
  };

  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-indigo-50/60 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Data perangkat &amp; harga bersifat referensi
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Bandingkan spesifikasi &amp; harga, temukan perangkat yang tepat
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Cari, bandingkan, dan pilih laptop atau smartphone sesuai kebutuhan serta anggaran Anda.
          </p>

          <form onSubmit={onSubmit} className="mt-8 flex gap-2">
            <label htmlFor="hero-search" className="sr-only">
              Cari perangkat
            </label>
            <input
              id="hero-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari laptop, smartphone…"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/30"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              <Search className="h-4 w-4" />
              Cari
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-500">Populer:</span>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/katalog?kategori=${c.slug}`)}
                className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
