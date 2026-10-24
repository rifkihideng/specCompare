import Button from './Button.jsx';

// Ditampilkan ketika pengambilan data gagal; menyediakan aksi retry.
export default function ErrorState({
  title = 'Terjadi kesalahan',
  description = 'Data tidak dapat dimuat. Periksa koneksi atau coba lagi.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">⚠️</div>
      <h3 className="mt-4 text-base font-semibold text-red-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-red-700">{description}</p>
      {onRetry && (
        <Button variant="secondary" className="mt-6" onClick={onRetry}>
          Coba lagi
        </Button>
      )}
    </div>
  );
}
