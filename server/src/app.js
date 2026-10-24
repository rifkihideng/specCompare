import express from 'express';
import cors from 'cors';

// Di sini kita menyusun aplikasi Express tanpa langsung menjalankannya.
// Pemisahan app vs server memudahkan pengujian (nanti) dan membuat
// struktur lebih rapi.
const app = express();

// Middleware global:
// - cors()  : mengizinkan request dari origin lain (mis. frontend Vite).
// - express.json() : otomatis mengurai body request berformat JSON.
app.use(cors());
app.use(express.json());

// Rute health-check: dipakai frontend untuk memastikan backend hidup.
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SpecCompare API',
    time: new Date().toISOString(),
  });
});

// Middleware error global. Express memanggil middleware ini setiap kali
// ada error yang diteruskan lewat next(err). Akan kita lengkapi
// dengan format error yang lebih rapi di tahap selanjutnya.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
});

export default app;
