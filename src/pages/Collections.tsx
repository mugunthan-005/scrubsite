import { ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS } from '../data';
import ProductCard from '../components/ProductCard';
import Image from '../components/Image';

const COLLECTIONS = [
  {
    title: "Men's Scrubs",
    desc: 'Tailored, performance-driven scrubs engineered for the male form. Built tough for long shifts.',
    path: '/shop?gender=Men',
    image: '/Gemini_Generated_Image_nce5j3nce5j3nce5.png',
    filter: (p: typeof PRODUCTS[0]) => p.gender === 'Men',
  },
  {
    title: "Women's Scrubs",
    desc: 'Designed for the female body with flattering fits, yoga waistbands, and jogger silhouettes.',
    path: '/shop?gender=Women',
    image: '/Gemini_Generated_Image_nce5j3nce5j3nce5 (1).png',
    filter: (p: typeof PRODUCTS[0]) => p.gender === 'Women',
  },
  {
    title: 'New Arrivals',
    desc: 'The latest drops — new fits, new colors, and new performance features fresh off the line.',
    path: '/shop?new=1',
    image: '/Gemini_Generated_Image_nce5j3nce5j3nce5 (2).png',
    filter: (p: typeof PRODUCTS[0]) => p.newArrival,
  },
];

export default function Collections() {
  const { navigate } = useRouter();
  return (
    <div>
      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="container-px text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">Browse</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink-900 sm:text-5xl">Collections</h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-600">
            Curated edits of our best scrubs, organized by who they're made for.
          </p>
        </div>
      </section>

      {COLLECTIONS.map((col, idx) => {
        const items = PRODUCTS.filter(col.filter).slice(0, 4);
        const reversed = idx % 2 === 1;
        return (
          <section key={col.title} className="container-px py-16 lg:py-20">
            <div className={`grid gap-10 lg:grid-cols-2 lg:items-center ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              {/* Banner */}
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
                <Image src={col.image} alt={col.title} className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{col.title}</h2>
                  <p className="mt-2 max-w-sm text-ink-200">{col.desc}</p>
                  <button onClick={() => navigate(col.path)} className="btn bg-white text-ink-900 hover:bg-ink-50 mt-5">
                    Shop {col.title} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
              {/* Products */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {items.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
