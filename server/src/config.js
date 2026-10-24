// Memuat variabel lingkungan dari file .env (jika ada) ke process.env.
import 'dotenv/config';

// Semua nilai konfigurasi aplikasi dikumpulkan di satu tempat
// agar mudah diubah tanpa menyentuh logika bisnis.
export const config = {
  // Number(process.env.PORT) bisa bernilai NaN bila .env kosong,
  // maka kita pakai || 4000 sebagai nilai default.
  port: Number(process.env.PORT) || 4000,
};
