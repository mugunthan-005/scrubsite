import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X, Check, ChevronDown, Search } from 'lucide-react';
import { PRODUCTS, ALL_COLORS, ALL_SIZES } from '../data';
import type { Gender, Category } from '../types';
import { useRouter } from '../context/RouterContext';
import ProductCard from '../components/ProductCard';

const GENDERS: Gender[] = ['Men', 'Women', 'Unisex'];
const CATEGORIES: Category[] = ['Tops', 'Pants', 'Lab Coats', 'Sets'];

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'best-selling';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'best-selling', label: 'Best Sellers' },
];

interface Filters {
  genders: Gender[];
  categories: Category[];
  sizes: string[];
  colors: string[];
  newOnly: boolean;
  query: string;
}

export default function Shop() {
  const { query } = useRouter();
  const [filters, setFilters] = useState<Filters>({
    genders: [],
    categories: [],
    sizes: [],
    colors: [],
    newOnly: false,
    query: query.get('q') || '',
  });
  const [sort, setSort] = useState<SortKey>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync query param
  useEffect(() => {
    const q = query.get('q') || '';
    const gender = query.get('gender') as Gender | null;
    const category = query.get('category') as Category | null;
    const isNew = query.get('new') === '1';
    setFilters((f) => ({
      ...f,
      query: q,
      genders: gender ? [gender] : [],
      categories: category ? [category] : [],
      newOnly: isNew,
    }));
  }, [query]);

  const toggle = <K extends keyof Filters>(key: K, value: string) => {
    setFilters((f) => {
      const arr = f[key] as string[];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...f, [key]: next };
    });
  };

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (filters.genders.length && !filters.genders.includes(p.gender)) return false;
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.sizes.length && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
      if (filters.colors.length && !filters.colors.some((c) => p.colors.some((pc) => pc.name === c)))
        return false;
      if (filters.newOnly && !p.newArrival) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const haystack = `${p.name} ${p.gender} ${p.category} ${p.collection} ${p.colors.map((c) => c.name).join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    return list;
  }, [filters, sort]);

  const activeCount =
    filters.genders.length +
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.newOnly ? 1 : 0);

  const clearAll = () =>
    setFilters({ genders: [], categories: [], sizes: [], colors: [], newOnly: false, query: '' });

  const FilterGroup = ({
    title,
    options,
    selected,
    onToggle,
    render,
  }: {
    title: string;
    options: { value: string; label: string }[];
    selected: string[];
    onToggle: (v: string) => void;
    render?: (label: string) => React.ReactNode;
  }) => (
    <div className="border-b border-ink-100 py-5">
      <h4 className="text-sm font-semibold text-ink-900">{title}</h4>
      <div className="mt-3 space-y-2">
        {options.map((opt) => {
          const checked = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className="flex w-full items-center gap-2.5 text-left text-sm text-ink-700 hover:text-ink-900"
            >
              <span
                className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-md border transition-colors ${
                  checked ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-300'
                }`}
              >
                {checked && <Check size={13} />}
              </span>
              {render ? render(opt.label) : <span>{opt.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  const Sidebar = (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-ink-900">Filters</h3>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-medium text-brand-700 hover:text-brand-800">
            Clear all ({activeCount})
          </button>
        )}
      </div>
      <FilterGroup
        title="Gender"
        options={GENDERS.map((g) => ({ value: g, label: g }))}
        selected={filters.genders}
        onToggle={(v) => toggle('genders', v)}
      />
      <FilterGroup
        title="Category"
        options={CATEGORIES.map((c) => ({ value: c, label: c }))}
        selected={filters.categories}
        onToggle={(v) => toggle('categories', v)}
      />
      <FilterGroup
        title="Size"
        options={ALL_SIZES.map((s) => ({ value: s, label: s }))}
        selected={filters.sizes}
        onToggle={(v) => toggle('sizes', v)}
      />
      <div className="border-b border-ink-100 py-5">
        <h4 className="text-sm font-semibold text-ink-900">Color</h4>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {ALL_COLORS.map((c) => {
            const checked = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggle('colors', c.name)}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs transition-colors ${
                  checked ? 'border-brand-500 bg-brand-50 text-brand-800' : 'border-ink-200 text-ink-700 hover:border-ink-300'
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-ink-200"
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="py-5">
        <label className="flex items-center gap-2.5 text-sm text-ink-700 cursor-pointer">
          <span
            className={`grid h-5 w-5 place-items-center rounded-md border transition-colors ${
              filters.newOnly ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-300'
            }`}
          >
            {filters.newOnly && <Check size={13} />}
          </span>
          <input
            type="checkbox"
            className="sr-only"
            checked={filters.newOnly}
            onChange={(e) => setFilters((f) => ({ ...f, newOnly: e.target.checked }))}
          />
          New Arrivals only
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-ink-50/40 min-h-screen">
      {/* Header */}
      <div className="border-b border-ink-100 bg-white">
        <div className="container-px py-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">Shop</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            All Scrubs
          </h1>
          <p className="mt-2 text-ink-600">{PRODUCTS.length} premium styles engineered for performance.</p>
        </div>
      </div>

      <div className="container-px py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24">{Sidebar}</div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="btn-secondary py-2.5 text-sm lg:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeCount > 0 && <span className="ml-1 chip bg-brand-100 text-brand-700">{activeCount}</span>}
              </button>
              <p className="hidden text-sm text-ink-600 sm:block">
                Showing <span className="font-semibold text-ink-900">{filtered.length}</span> of {PRODUCTS.length}
              </p>
              <div className="relative ml-auto">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="appearance-none rounded-full border border-ink-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.key} value={o.key}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 sm:gap-6 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 text-center ring-1 ring-ink-100">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-ink-50 text-ink-300">
                  <Search size={28} />
                </div>
                <p className="mt-4 font-semibold text-ink-900">No scrubs match your filters</p>
                <p className="mt-1 text-sm text-ink-500">Try removing a filter or clearing all.</p>
                <button onClick={clearAll} className="btn-secondary mt-4">Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm animate-fade-in" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-5 animate-slide-in-right">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 text-ink-500 hover:bg-ink-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            {Sidebar}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary mt-6 w-full"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
