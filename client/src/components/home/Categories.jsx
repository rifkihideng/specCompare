import { Link } from 'react-router-dom';

// Grid kategori perangkat yang mengarah ke halaman Katalog.
export default function Categories({ categories }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-slate-900">Kategori</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/katalog?kategori=${c.slug}`}
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-6 text-center transition hover:border-indigo-300 hover:shadow-sm"
          >
            <span className="text-3xl">{c.icon}</span>
            <span className="text-sm font-medium text-slate-700">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
