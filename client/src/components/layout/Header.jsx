import { Link, NavLink } from 'react-router-dom';
import Badge from '../ui/Badge.jsx';

const navItems = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/katalog', label: 'Katalog' },
  { to: '/bandingkan', label: 'Bandingkan' },
  { to: '/favorit', label: 'Favorit' },
];

// Kelas link navigasi; fungsi menerima { isActive } dari NavLink
// dan dipakai ulang di nav desktop maupun mobile.
const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            S
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Spec<span className="text-indigo-600">Compare</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Badge tone="amber">Demo</Badge>
          <Link
            to="/admin"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Navigasi mobile: baris yang bisa digeser ke samping. */}
      <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
