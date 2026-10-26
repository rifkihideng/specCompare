import { Link } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';
import DeviceImage from './DeviceImage.jsx';
import { formatIDR } from '../../utils/format.js';

// Kartu ringkas satu perangkat untuk grid katalog / perangkat populer.
export default function DeviceCard({ device }) {
  return (
    <Link
      to={`/perangkat/${device.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
    >
      <DeviceImage device={device} />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {device.brand}
          </span>
          {device.isReference && <Badge tone="amber">Referensi</Badge>}
        </div>

        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600">
          {device.name}
        </h3>

        <ul className="space-y-1 text-xs text-slate-500">
          {device.keySpecs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>

        <p className="mt-auto pt-2 text-sm font-semibold text-emerald-600">
          {formatIDR(device.priceMin)}{' '}
          <span className="text-xs font-normal text-slate-400">mulai</span>
        </p>
      </div>
    </Link>
  );
}
