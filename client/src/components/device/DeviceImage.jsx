import { useState } from 'react';
import { categoryIcon } from '../../utils/categoryIcons.js';

// Gambar perangkat. Bila gambar gagal dimuat (atau belum tersedia),
// tampilkan ikon kategori sebagai pengganti agar kartu tidak kosong.
export default function DeviceImage({
  device,
  heightClass = 'h-40',
  iconSizeClass = 'h-12 w-12',
  containerClassName = '',
}) {
  const [failed, setFailed] = useState(false);
  const Icon = categoryIcon(device.category);

  if (!device.image || failed) {
    return (
      <div
        className={`flex ${heightClass} w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 ${containerClassName}`}
      >
        <Icon className={`${iconSizeClass} text-slate-400`} />
      </div>
    );
  }

  return (
    <div className={`${heightClass} w-full overflow-hidden bg-white ${containerClassName}`}>
      <img
        src={device.image}
        alt={device.name}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
