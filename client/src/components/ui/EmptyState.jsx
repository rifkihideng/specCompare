import { SearchX } from 'lucide-react';

// Ditampilkan ketika suatu daftar/area tidak memiliki data.
// `icon` menerima komponen ikon Lucide (bukan string emoji).
export default function EmptyState({ icon: Icon = SearchX, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <Icon className="h-8 w-8 text-slate-400" />
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
