import Hero from '../components/home/Hero.jsx';
import Categories from '../components/home/Categories.jsx';
import PopularDevices from '../components/home/PopularDevices.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { fetchCategories } from '../api/index.js';

const steps = [
  { n: '1', title: 'Cari', desc: 'Temukan perangkat dari katalog lengkap.' },
  { n: '2', title: 'Bandingkan', desc: 'Pilih 2–3 perangkat untuk dilihat berdampingan.' },
  { n: '3', title: 'Pilih', desc: 'Bandingkan harga penjual dan tentukan pilihan.' },
];

// Halaman Beranda: merangkai section Hero, Kategori, Perangkat populer,
// dan "Cara kerja".
export default function Home() {
  const { data } = useAsync(fetchCategories);
  // `data` berisi null saat loading/error, jadi kita normalisasi
  // menjadi array kosong agar komponen anak aman dipetakan (.map).
  const categories = data ?? [];

  return (
    <>
      <Hero categories={categories} />
      <Categories categories={categories} />
      <PopularDevices />

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-bold text-slate-900">Cara kerja SpecCompare</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl border border-slate-200 p-6 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
