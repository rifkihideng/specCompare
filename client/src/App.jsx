import { Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

// Definisi seluruh rute aplikasi.
// Saat ini hanya halaman Beranda yang dibangun penuh; rute lain
// menampilkan placeholder "Segera hadir" agar navigasi tetap teruji.
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="katalog" element={<Catalog />} />
        <Route path="perangkat/:slug" element={<ComingSoon title="Detail Perangkat" />} />
        <Route path="bandingkan" element={<ComingSoon title="Bandingkan" />} />
        <Route path="favorit" element={<ComingSoon title="Favorit" />} />
        <Route path="admin" element={<ComingSoon title="Dashboard Admin" />} />
        <Route path="*" element={<ComingSoon title="Halaman tidak ditemukan" />} />
      </Route>
    </Routes>
  );
}
