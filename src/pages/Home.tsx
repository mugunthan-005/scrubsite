import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Shield,
  Wind,
  Sparkles,
  StretchHorizontal,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS, TESTIMONIALS } from '../data';
import ProductCard from '../components/ProductCard';
import Image from '../components/Image';

const FEATURES = [
  {
    Icon: StretchHorizontal,
    title: '4-Way Stretch',
    desc: 'Moves with every reach, bend, and twist without losing shape.',
  },
  {
    Icon: Shield,
    title: 'Anti-Microbial',
    desc: 'Silver-ion treatment inhibits odor-causing bacteria shift after shift.',
  },
  {
    Icon: Wind,
    title: 'Moisture-Wicking',
    desc: 'Pulls sweat away from skin and dries fast to keep you cool.',
  },
  {
    Icon: Sparkles,
    title: 'Wrinkle-Resistant',
    desc: 'Wash, dry, wear. No ironing board required, ever.',
  },
];

const COLLECTIONS = [
  {
    title: "Men's Scrubs",
    desc: 'Tailored fits built for performance',
    path: '/shop?gender=Men',
    image: 'https://images.pexels.com/photos/2629884/pexels-photo-2629884.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: "Women's Scrubs",
    desc: 'Designed for the female form',
    path: '/shop?gender=Women',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'New Arrivals',
    desc: 'The latest in clinical wear',
    path: '/shop?new=1',
    image: 'https://images.pexels.com/photos/4173270/pexels-photo-4173270.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

export default function Home() {
  const { navigate } = useRouter();
  const featured = PRODUCTS.filter((p) => p.bestSeller).slice(0, 4);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-50">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Healthcare professional wearing premium scrubs"
            className="h-full w-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/50 to-ink-950/20" />
        </div>
        <div className="container-px relative flex min-h-[88vh] items-center py-20">
          <div className="max-w-2xl animate-fade-up">
            <span className="chip bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm">
              <Star size={12} className="fill-accent-400 text-accent-400" />
              Loved by 50,000+ healthcare professionals
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white text-balance sm:text-5xl lg:text-6xl">
              Engineered for Comfort.
              <br />
              Designed for Performance.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink-200 leading-relaxed">
              Premium medical scrubs built from recycled performance fabric. Anti-microbial, moisture-wicking, and made to outlast the longest shift.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate('/shop')} className="btn-primary text-base">
                Shop Now
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigate('/collections')}
                className="btn bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm hover:bg-white/20 px-6 py-3 text-base"
              >
                Explore Collections
              </button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-ink-300">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-teal-300" />
                30-day returns
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-teal-300" />
                Free shipping over $75
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-ink-950 py-3 text-center text-xs uppercase tracking-[0.2em] text-ink-400">
        Trusted in 1,200+ hospitals · 4.9★ average rating · 100% satisfaction guarantee
      </div>

      {/* Features */}
      <section className="container-px py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">Why Choose Us</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
            Fabric that works as hard as you do
          </h2>
          <p className="mt-4 text-ink-600">
            Every fiber is chosen for a reason. These aren't just scrubs — they're the uniform of people who refuse to compromise.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className="group card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-semibold text-ink-900">{title}</h3>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="container-px">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">Featured Collections</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
                Find your fit
              </h2>
            </div>
            <button onClick={() => navigate('/shop')} className="btn-ghost text-sm group">
              View all
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {COLLECTIONS.map((c, i) => (
              <button
                key={c.title}
                onClick={() => navigate(c.path)}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl text-left animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Image src={c.image} alt={c.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-white">{c.title}</h3>
                  <p className="mt-1 text-sm text-ink-200">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Shop now
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-px py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">Best Sellers</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              Tried, tested, and trusted
            </h2>
          </div>
          <button onClick={() => navigate('/shop')} className="btn-ghost text-sm group">
            View all
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.pexels.com/photos/2633202/pexels-photo-2633202.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-ink-950/70" />
        </div>
        <div className="container-px relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">From the Frontline</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Words from the people who wear them
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative">
              <Quote size={48} className="mx-auto text-brand-500/40" />
              <div className="mt-6 min-h-[200px] text-center">
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={t.id}
                    className={`absolute inset-0 transition-all duration-500 ${
                      i === activeTestimonial
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <div className="flex justify-center gap-1">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} size={18} className="fill-accent-400 text-accent-400" />
                      ))}
                    </div>
                    <p className="mt-5 text-xl font-medium leading-relaxed text-ink-100 sm:text-2xl text-balance">
                      "{t.quote}"
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                      <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20" />
                      <div className="text-left">
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-ink-400">{t.role} · {t.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setActiveTestimonial((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeTestimonial ? 'w-8 bg-brand-500' : 'w-2 bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-16 text-center text-white sm:px-16">
          <div className="absolute inset-0 opacity-20">
            <Image src="https://images.pexels.com/photos/4173270/pexels-photo-4173270.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" className="h-full w-full" />
          </div>
          <div className="relative">
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-balance">
              Ready to upgrade your shift?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-brand-100">
              Join thousands of healthcare professionals who chose comfort without compromise.
            </p>
            <button onClick={() => navigate('/shop')} className="mt-8 btn bg-white text-brand-700 hover:bg-brand-50 px-8 py-3.5 text-base">
              Shop the Collection
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
