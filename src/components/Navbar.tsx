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
      className={`sticky top-0 z-40 transition-all duration-300 bg-[#040D1A]/95 backdrop-blur-md text-white border-b border-white/10 ${
        scrolled ? 'shadow-xl shadow-black/40' : 'shadow-none'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Mobile menu button */}
        <button
          className="lg:hidden -ml-2 p-2 text-slate-300 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-wider text-white group"
        >
          <img
            src="/zynex-logo.png"
            alt="ZYNEX Logo"
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-teal-400/50 shadow-xs transition-transform group-hover:scale-105"
          />
          <span className="font-display tracking-widest text-white">ZYNEX</span>
        </button>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="p-2.5 text-slate-300 hover:bg-white/10 hover:text-white rounded-full transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => navigate('/account')}
            className="p-2.5 text-slate-300 hover:bg-white/10 hover:text-white rounded-full transition-colors"
            aria-label="Account"
          >
            <User size={20} />
          </button>
          <button
            onClick={openCart}
            className="relative p-2.5 text-slate-300 hover:bg-white/10 hover:text-white rounded-full transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-teal-400 text-[10px] font-extrabold text-slate-950 animate-scale-in">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-white/10 bg-[#061224] animate-fade-in text-white">
          <form onSubmit={submitSearch} className="container-px py-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scrubs, collections, colors…"
                className="w-full rounded-full border border-white/15 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
              />
            </div>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#061224] animate-fade-in text-white">
          <div className="container-px py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-3 text-left rounded-xl font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-teal-500/20 text-teal-300 font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/account')}
              className="px-4 py-3 text-left rounded-xl font-medium text-slate-300 hover:bg-white/5"
            >
              Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
