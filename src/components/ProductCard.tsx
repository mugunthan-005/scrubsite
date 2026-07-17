import type { Product } from '../types';
import { useRouter } from '../context/RouterContext';
import Rating from './Rating';
import Image from './Image';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { navigate } = useRouter();
  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / (product.compareAt as number)) * 100)
    : 0;

  return (
    <article
      className="group cursor-pointer animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms` }}
      onClick={() => navigate(`/product/${product.slug}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink-50 ring-1 ring-ink-100 transition-all duration-500 group-hover:shadow-lift group-hover:ring-ink-200">
        <Image
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.newArrival && (
            <span className="chip bg-teal-500 text-white shadow-sm">New</span>
          )}
          {product.bestSeller && (
            <span className="chip bg-ink-900 text-white shadow-sm">Best Seller</span>
          )}
          {hasDiscount && (
            <span className="chip bg-accent-500 text-white shadow-sm">-{discountPct}%</span>
          )}
        </div>

        {/* Quick view */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="btn-secondary w-full bg-white/90 backdrop-blur-sm py-2.5 text-sm">
            Quick View
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3.5 px-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
            {product.gender} · {product.category}
          </p>
          <Rating rating={product.rating} count={product.reviewCount} showCount={false} />
        </div>
        <h3 className="mt-1 font-semibold text-ink-900 leading-snug group-hover:text-brand-700 transition-colors">
          {product.name}
        </h3>
        {/* Color swatches */}
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-4 w-4 rounded-full ring-1 ring-ink-200 ring-offset-1"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-xs text-ink-400">+{product.colors.length - 5}</span>
          )}
        </div>
        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-ink-900">${product.price.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-sm text-ink-400 line-through">
              ${(product.compareAt as number).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
