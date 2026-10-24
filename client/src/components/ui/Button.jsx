// Tombol reusable dengan beberapa varian.
// Properti `as` memungkinkan tombol dirender sebagai elemen lain,
// misalnya <Link> (as={Link}) tanpa mengubah gayanya.
const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
  secondary: 'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
};

export default function Button({ as: Tag = 'button', variant = 'primary', className = '', children, ...props }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
