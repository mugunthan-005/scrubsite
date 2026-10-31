import { useEffect, useState } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { path, navigate } = useRouter();
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
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

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 bg-[#041117]/95 backdrop-blur-md text-[#F0F5F5] border-b border-[#CBD7D7]/15 ${
        scrolled ? 'shadow-xl shadow-black/50' : 'shadow-none'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Logo (Left) */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 text-xl font-extrabold tracking-wider text-[#F0F5F5] group cursor-pointer"
        >
          <img
            src="/zyna-logo.jpg"
            alt="ZYNA Logo"
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-[#38A7B8]/40 shadow-xs transition-transform group-hover:scale-105"
          />
          <img
            src="/zyna-wordmark-transparent.png"
            alt="ZYNA"
            className="h-5 sm:h-6 w-auto object-contain transition-transform group-hover:scale-105 filter brightness-110"
          />
        </button>

        {/* Right Action Icons (Search, Account, Cart) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="p-2.5 text-[#CBD7D7] hover:bg-white/10 hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => navigate('/account')}
            className="p-2.5 text-[#CBD7D7] hover:bg-white/10 hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Account"
          >
            <User size={20} />
          </button>
          <button
            onClick={openCart}
            className="relative p-2.5 text-[#CBD7D7] hover:bg-white/10 hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#38A7B8] text-[10px] font-extrabold text-[#041117] animate-scale-in">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-[#CBD7D7]/15 bg-[#081E26] animate-fade-in text-[#F0F5F5]">
          <form onSubmit={submitSearch} className="container-px py-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7E969B]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scrubs, collections, colors…"
                className="w-full rounded-full border border-[#CBD7D7]/20 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-[#F0F5F5] placeholder:text-[#7E969B] focus:border-[#38A7B8] focus:outline-none focus:ring-2 focus:ring-[#38A7B8]/20"
              />
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
