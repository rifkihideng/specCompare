import app from './app.js';
import { config } from './config.js';

// Titik masuk (entry point) backend. File ini hanya bertugas
// menjalankan server pada port yang ditentukan di config.
app.listen(config.port, () => {
  console.log(`SpecCompare API berjalan di http://localhost:${config.port}`);
});
