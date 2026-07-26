import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Shop', path: '/shop' },
  { label: 'Collections', path: '/collections' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Admin Inventory', path: '/admin' },
];

export default function Navbar() {
  const { path, navigate } = useRouter();
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [path]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  const isActive = (p: string) => path === p || (p !== '/' && path.startsWith(p));

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-gradient-to-r from-white via-teal-50 to-emerald-50 border-b border-teal-200/80 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Mobile menu button */}
        <button
          className="lg:hidden -ml-2 p-2 text-slate-800 hover:bg-teal-100/50 rounded-lg transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-wider text-[#0B192C] group"
        >
          <img
            src="/zynex-logo.png"
            alt="ZYNEX Logo"
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-teal-300/80 shadow-xs transition-transform group-hover:scale-105"
          />
          <span className="font-display tracking-widest text-[#0B192C]">ZYNEX</span>
        </button>


        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="p-2.5 text-slate-800 hover:bg-teal-100/60 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => navigate('/account')}
            className="p-2.5 text-slate-800 hover:bg-teal-100/60 rounded-full transition-colors"
            aria-label="Account"
          >
            <User size={20} />
          </button>
          <button
            onClick={openCart}
            className="relative p-2.5 text-slate-800 hover:bg-teal-100/60 rounded-full transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-teal-600 text-[10px] font-bold text-white animate-scale-in">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-teal-200/50 bg-gradient-to-r from-white via-teal-50 to-emerald-50 animate-fade-in text-slate-800">
          <form onSubmit={submitSearch} className="container-px py-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scrubs, collections, colors…"
                className="w-full rounded-full border border-teal-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-teal-200/50 bg-gradient-to-r from-white via-teal-50 to-emerald-50 animate-fade-in text-slate-800">
          <div className="container-px py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-3 text-left rounded-xl font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-teal-100 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-teal-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/account')}
              className="px-4 py-3 text-left rounded-xl font-medium text-slate-700 hover:bg-teal-50"
            >
              Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
