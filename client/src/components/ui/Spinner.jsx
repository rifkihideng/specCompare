import { LoaderCircle } from 'lucide-react';

// Indikator loading berbentuk lingkaran berputar (ikon Lucide).
export default function Spinner({ className = '' }) {
  return <LoaderCircle className={`h-5 w-5 animate-spin text-indigo-600 ${className}`} />;
}
