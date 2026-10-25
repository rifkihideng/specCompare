import Badge from '../ui/Badge.jsx';
import { formatIDR, timeAgo } from '../../utils/format.js';

// Daftar penawaran harga dari beberapa penjual, diurutkan dari termurah.
export default function PriceOffers({ offers }) {
  const sorted = [...offers].sort((a, b) => a.price - b.price);
  const cheapest = sorted.length ? sorted[0].price : null;

  return (
    <div>
      <ul className="space-y-3">
        {sorted.map((o) => (
          <li
            key={o.id}
            className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">{o.seller}</p>
                {o.price === cheapest && <Badge tone="emerald">Termurah</Badge>}
                {o.inStock ? (
                  <Badge tone="emerald">Stok ada</Badge>
                ) : (
                  <Badge tone="slate">Stok habis</Badge>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Sumber: {o.source} · Diperbarui {timeAgo(o.updatedAt)}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-lg font-bold text-emerald-600">{formatIDR(o.price)}</p>
              {o.url && (
                <a href={o.url} className="text-xs font-medium text-indigo-600 hover:underline">
                  Kunjungi toko
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs text-slate-400">
        Seluruh harga adalah data demo, bukan penawaran aktual.
      </p>
    </div>
  );
}
