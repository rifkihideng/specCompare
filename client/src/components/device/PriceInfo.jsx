import { CircleDollarSign } from 'lucide-react';
import { formatIDR } from '../../utils/format.js';

// Blok informasi harga referensi: rentang harga + sumber + tanggal akses.
// Bukan daftar penawaran penjual, karena harga produk asli bersifat
// fluktuatif dan tidak boleh diklaim sebagai angka final.
export default function PriceInfo({ device }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
          <CircleDollarSign className="h-5 w-5 text-emerald-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">Kisaran harga referensi</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">
            {formatIDR(device.priceMin)}
            <span className="text-base font-normal text-slate-400">
              {' '}– {formatIDR(device.priceMax)}
            </span>
          </p>
          <dl className="mt-4 space-y-1 text-xs text-slate-500">
            <div className="flex gap-2">
              <dt className="shrink-0 font-medium text-slate-400">Sumber:</dt>
              <dd>{device.priceSource}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-medium text-slate-400">Diakses:</dt>
              <dd>{device.priceAccessedAt}</dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
        Harga bersifat referensi/perkiraan dan dapat berubah sewaktu-waktu. Bukan penawaran
        final dari penjual tertentu.
      </p>
    </div>
  );
}
