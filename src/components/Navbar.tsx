import { useEffect, useState } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Shop', path: '/shop' },
  { label: 'Collections', path: '/collections' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft'
          : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Mobile menu button */}
        <button
          className="lg:hidden -ml-2 p-2 text-ink-700 hover:bg-ink-100 rounded-lg"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-wider text-ink-900 group"
        >
          <img
            src="/zynex-logo.png"
            alt="ZYNEX Logo"
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-ink-200 shadow-xs transition-transform group-hover:scale-105"
          />
          <span className="font-display tracking-widest text-brand-900">ZYNEX</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.path) ? 'text-brand-700' : 'text-ink-700 hover:text-ink-900'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-brand-600" />
              )}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="p-2.5 text-ink-700 hover:bg-ink-100 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => navigate('/account')}
            className="hidden sm:grid p-2.5 text-ink-700 hover:bg-ink-100 rounded-full transition-colors place-items-center"
            aria-label="Account"
          >
            <User size={20} />
          </button>
          <button
            onClick={openCart}
            className="relative p-2.5 text-ink-700 hover:bg-ink-100 rounded-full transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white animate-scale-in">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-ink-100 bg-white animate-fade-in">
          <form onSubmit={submitSearch} className="container-px py-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scrubs, collections, colors…"
                className="input pl-11"
              />
            </div>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-ink-100 bg-white animate-fade-in">
          <div className="container-px py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-3 text-left rounded-xl font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-700 hover:bg-ink-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/account')}
              className="px-4 py-3 text-left rounded-xl font-medium text-ink-700 hover:bg-ink-50"
            >
              Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
