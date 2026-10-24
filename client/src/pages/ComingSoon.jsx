import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Badge from '../components/ui/Badge.jsx';

// Placeholder untuk halaman yang belum dibangun, sekaligus membuktikan
// bahwa parameter URL (mis. ?q=... dari pencarian) sudah tertangkap.
export default function ComingSoon({ title }) {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const q = params.get('q');

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <Badge tone="indigo">Segera hadir</Badge>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">{title}</h1>
      {q && <p className="mt-2 text-sm text-slate-500">Pencarian: “{q}”</p>}
      <p className="mt-2 text-sm text-slate-500">
        Halaman ini akan dibangun pada tahap berikutnya. (rute: {pathname})
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
