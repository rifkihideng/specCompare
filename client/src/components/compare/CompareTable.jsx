import { Link } from 'react-router-dom';
import { formatIDR } from '../../utils/format.js';
import { categoryIcon } from '../../utils/categoryIcons.js';

// Urutan kelompok spesifikasi agar tabel perbandingan konsisten.
const GROUP_ORDER = [
  'Umum',
  'Performa',
  'Layar',
  'Kamera',
  'Baterai',
  'Audio',
  'Konektivitas',
  'Fisik',
];

// Tabel perbandingan: baris = spesifikasi, kolom = perangkat.
// Sel yang nilainya berbeda antar perangkat ditandai latar kuning.
export default function CompareTable({ devices, onRemove }) {
  // Baris ringkasan (selalu tampil di atas).
  const rows = [
    { key: '__kategori', label: 'Kategori', values: devices.map((d) => d.category) },
    { key: '__harga', label: 'Harga mulai', values: devices.map((d) => formatIDR(d.priceMin)) },
  ];

  // Kumpulkan spesifikasi dari semua perangkat dalam urutan kelompok stabil.
  // Perangkat yang tidak punya sebuah spesifikasi diberi nilai "—".
  const grouped = {};
  devices.forEach((d, di) => {
    (d.specs ?? []).forEach((s) => {
      const g = s.group || 'Lainnya';
      grouped[g] ??= {};
      grouped[g][s.key] ??= {
        label: s.label,
        values: new Array(devices.length).fill('—'),
      };
      grouped[g][s.key].values[di] = s.value;
    });
  });

  const groups = [
    ...GROUP_ORDER.filter((g) => grouped[g]),
    ...Object.keys(grouped).filter((g) => !GROUP_ORDER.includes(g)),
  ];

  groups.forEach((g) => {
    Object.values(grouped[g]).forEach(({ label, values }) => {
      rows.push({ key: `${g}:${label}`, label, values });
    });
  });

  const same = (values) => values.every((v) => v === values[0]);

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="w-44 px-4 py-3 text-left align-top text-xs font-semibold uppercase tracking-wide text-slate-400">
              Spesifikasi
            </th>
            {devices.map((d) => (
              <th key={d.id} className="min-w-[11rem] px-4 py-3 align-top">
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-slate-400">
                    {(() => {
                      const Icon = categoryIcon(d.category);
                      return <Icon className="h-7 w-7" />;
                    })()}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-slate-400">{d.brand}</span>
                  <Link
                    to={`/perangkat/${d.slug}`}
                    className="text-sm font-semibold text-slate-900 hover:text-indigo-600"
                  >
                    {d.name}
                  </Link>
                  <button
                    onClick={() => onRemove(d.id)}
                    className="mt-1 rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => {
            const differs = !same(row.values);
            return (
              <tr key={row.key}>
                <th
                  scope="row"
                  className={`px-4 py-3 text-left align-top font-medium ${
                    differs ? 'bg-amber-50 text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {row.label}
                  {differs && (
                    <span
                      className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-400"
                      title="Berbeda antar perangkat"
                    />
                  )}
                </th>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 text-center align-top ${
                      differs ? 'bg-amber-50 font-semibold text-slate-900' : 'text-slate-600'
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
