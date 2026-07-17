import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Minus, Plus, ShoppingBag, Truck, RefreshCw, Shield, ZoomIn } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import Rating from '../components/Rating';
import ProductCard from '../components/ProductCard';


export default function ProductDetail({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const { addItem } = useCart();
  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setSelectedColor(0);
    setSelectedSize(null);
    setQuantity(1);
    setAdded(false);
  }, [slug]);

  if (!product) {
    return (
      <div className="container-px py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-ink-900">Product not found</h1>
        <p className="mt-2 text-ink-600">The scrub you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary mt-6">Back to Shop</button>
      </div>
    );
  }

  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: product.colors[selectedColor].name,
        size: selectedSize,
        slug: product.slug,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const onZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container-px py-4">
        <nav className="flex items-center gap-2 text-sm text-ink-500">
          <button onClick={() => navigate('/')} className="hover:text-ink-900">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/shop')} className="hover:text-ink-900">Shop</button>
          <span>/</span>
          <span className="text-ink-900 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      <div className="container-px py-6 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div
              className="relative aspect-square overflow-hidden rounded-2xl bg-ink-50 ring-1 ring-ink-100 cursor-zoom-in"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={onZoomMove}
            >
              <div
                className="h-full w-full transition-transform duration-200"
                style={zoom ? { transform: `scale(1.8)`, transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
              >
                <img
                  src={product.images[activeImage]}
                  alt={`${product.name} - view ${activeImage + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 text-xs text-ink-700 backdrop-blur-sm">
                <ZoomIn size={13} /> Hover to zoom
              </div>
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-ink-700 backdrop-blur-sm hover:bg-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-ink-700 backdrop-blur-sm hover:bg-white"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-20 overflow-hidden rounded-xl ring-2 transition ${
                      i === activeImage ? 'ring-brand-600' : 'ring-ink-100 hover:ring-ink-300'
                    }`}
                  >
                    <img src={src} alt={`${product.name} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:py-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">
              {product.gender} · {product.category}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <Rating rating={product.rating} count={product.reviewCount} />
              <span className="text-sm text-ink-500">·</span>
              <span className="text-sm text-ink-600">{product.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-ink-900">${product.price.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-ink-400 line-through">${(product.compareAt as number).toFixed(2)}</span>
                  <span className="chip bg-accent-500 text-white">
                    Save ${(product.compareAt as number - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-ink-700 leading-relaxed">{product.description}</p>

            {/* Color selector */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <span className="label mb-0">Color</span>
                <span className="text-sm font-medium text-ink-900">{product.colors[selectedColor].name}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    title={c.name}
                    className={`relative h-10 w-10 rounded-full ring-2 ring-offset-2 transition ${
                      i === selectedColor ? 'ring-brand-600' : 'ring-ink-200 hover:ring-ink-300'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {i === selectedColor && (
                      <Check
                        size={16}
                        className="absolute inset-0 m-auto"
                        style={{ color: isLight(c.hex) ? '#1e2533' : '#fff' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="label mb-0">Size</span>
                <button className="text-sm font-medium text-brand-700 hover:text-brand-800">Size guide</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSize(s);
                      setSizeError(false);
                    }}
                    className={`min-w-[3rem] rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                      selectedSize === s
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-ink-200 text-ink-700 hover:border-ink-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <p className="mt-2 text-sm text-red-600">Please select a size.</p>}
            </div>

            {/* Quantity + Add to cart */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full ring-1 ring-ink-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-12 place-items-center text-ink-600 hover:text-brand-700 disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="grid h-12 w-12 place-items-center text-ink-600 hover:text-brand-700 disabled:opacity-40"
                  disabled={quantity >= 99}
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`btn flex-1 px-8 py-3.5 text-base transition-all ${
                  added ? 'bg-teal-500 text-white' : 'btn-primary'
                }`}
              >
                {added ? (
                  <>
                    <Check size={20} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-ink-100 pt-6">
              {[
                { Icon: Truck, label: 'Free shipping over $75' },
                { Icon: RefreshCw, label: '30-day easy returns' },
                { Icon: Shield, label: '2-year quality guarantee' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon size={22} className="text-brand-700" />
                  <span className="text-xs text-ink-600">{label}</span>
                </div>
              ))}
            </div>

            {/* Fabric specs */}
            <div className="mt-8 rounded-2xl bg-ink-50 p-5">
              <h3 className="font-semibold text-ink-900">Fabric & Features</h3>
              <p className="mt-2 text-sm text-ink-600">
                <span className="font-medium text-ink-900">Fabric:</span> {product.fabric}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.features.map((f) => (
                  <span key={f} className="chip bg-white text-ink-700 ring-1 ring-ink-200">
                    <Check size={12} className="text-teal-500" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">You may also like</h2>
            <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function isLight(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
