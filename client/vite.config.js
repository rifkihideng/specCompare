import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Konfigurasi Vite.
export default defineConfig({
  // react()      : dukungan JSX & fast refresh.
  // tailwindcss(): plugin Tailwind CSS v4 (tidak butuh file konfigurasi lagi).
  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,
    proxy: {
      // Semua request dari frontend yang diawali /api diteruskan
      // ke backend Express, sehingga di kode React cukup memanggil
      // fetch('/api/...') tanpa menyebut nama host/port backend.
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
