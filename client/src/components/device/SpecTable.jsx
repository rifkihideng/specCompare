// Urutan kelompok spesifikasi untuk tampilan yang konsisten.
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

// Tabel spesifikasi, dikelompokkan per group (mis. Performa, Layar).
export default function SpecTable({ specs }) {
  const grouped = {};
  specs.forEach((s) => {
    const g = s.group || 'Lainnya';
    (grouped[g] ||= []).push(s);
  });

  const groups = [
    ...GROUP_ORDER.filter((g) => grouped[g]),
    ...Object.keys(grouped).filter((g) => !GROUP_ORDER.includes(g)),
  ];

  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g}>
          <h3 className="mb-2 text-sm font-semibold text-slate-900">{g}</h3>
          <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
            {grouped[g].map((s) => (
              <div key={s.key} className="flex items-start justify-between gap-4 px-4 py-3">
                <dt className="text-sm text-slate-500">{s.label}</dt>
                <dd className="text-right text-sm font-medium text-slate-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
