import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Shield,
  Wind,
  Sparkles,
  StretchHorizontal,
  Star,
  Quote,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS, TESTIMONIALS } from '../data';
import { motion, useScroll, useTransform } from 'motion/react';
import ProductCard from '../components/ProductCard';
import Image from '../components/Image';
import Ferrofluid from '../components/Ferrofluid';
import ImageTrail from '../components/ImageTrail';
import ShinyText from '../components/ShinyText';

const SCRUB_TRAIL_IMAGES = PRODUCTS.flatMap((p) => p.images);

const FEATURES = [
  {
    Icon: StretchHorizontal,
    title: '4-Way Stretch',
    desc: 'Maximum flexibility that moves with every reach, bend, and shift.',
  },
  {
    Icon: Shield,
    title: 'Antimicrobial',
    desc: 'Specialized finish treatment inhibits bacteria and odor build-up.',
  },
  {
    Icon: Wind,
    title: 'Fluid Repellent',
    desc: 'Barrier shield technology causes liquids and spills to bead off.',
  },
  {
    Icon: Sparkles,
    title: 'Wrinkle-Free',
    desc: 'High-density knit requires zero ironing and maintains crisp drape.',
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

  const { scrollY } = useScroll();

  // Multi-layer Parallax scroll transforms
  const heroTextY = useTransform(scrollY, [0, 600], [0, 90]);
  const heroBgY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  const specBannerY = useTransform(scrollY, [100, 700], [0, 20]);
  const showcaseCardY = useTransform(scrollY, [200, 900], [25, -25]);
  const shinyTextParallaxY = useTransform(scrollY, [200, 900], [-20, 20]);
  const collectionsParallaxY = useTransform(scrollY, [800, 1600], [20, -20]);
  const testimonialImageY = useTransform(scrollY, [1500, 2600], [-50, 50]);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#040D1A] text-white">
      {/* Hero with Parallax depth */}
      <section className="relative overflow-hidden bg-[#040D1A]">
        {/* Ferrofluid interactive fluid WebGL background with Parallax translation */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroBgY }}>
          <Ferrofluid
            dpr={1}
            colors={['#0DA39C', '#1C70F0', '#38BDF8', '#7FB2D9', '#5EEAD4']}
            speed={0.35}
            scale={1.5}
            turbulence={0.8}
            fluidity={0.15}
            rimWidth={0.25}
            sharpness={2.2}
            shimmer={1.0}
            glow={2.0}
            flowDirection="down"
            opacity={0.8}
            mouseInteraction={true}
            mouseStrength={1.0}
            mouseRadius={0.3}
            mouseDampening={0.15}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040D1A]/80 via-[#040D1A]/60 to-[#040D1A] pointer-events-none" />
        </motion.div>

        <div className="container-px relative flex min-h-[85vh] items-center py-20">
          <motion.div className="max-w-2xl animate-fade-up" style={{ y: heroTextY, opacity: heroOpacity }}>
            <span className="chip bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm">
              <Star size={12} className="fill-accent-400 text-accent-400" />
              ZYNEX Premium Medical Apparel
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white text-balance sm:text-5xl lg:text-6xl">
              Engineered for Comfort.
              <br />
              Designed for Performance.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink-200 leading-relaxed">
              Crafted from 92% Polyester & 8% Spandex knitted fabric (200-220 GSM). Featuring 4-way stretch, antimicrobial protection, fluid repellent technology, and wrinkle-free finish in preferred Navy Blue.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigate('/shop')} className="btn-primary text-base shadow-lg shadow-teal-500/20">
                Shop ZYNEX Collection
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
          </motion.div>
        </div>
      </section>

      {/* Specification Banner Bar - Seamlessly Blended */}
      <motion.div className="bg-gradient-to-b from-[#040D1A] via-[#061224] to-[#08182D] py-5 text-white relative z-10" style={{ y: specBannerY }}>
        <div className="container-px flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-slate-400 uppercase tracking-wider">Fabric Sample:</span>
            <span className="text-white font-bold">Sample A</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 uppercase tracking-wider">Blend:</span>
            <span className="text-teal-300 font-bold">92% Poly / 8% Spandex</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 uppercase tracking-wider">GSM:</span>
            <span className="text-white font-bold">200 - 220 GSM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 uppercase tracking-wider">Fabric Type:</span>
            <span className="text-white font-bold">Knitted Fabric</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 uppercase tracking-wider">Preferred Color:</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-white">
              <span className="h-3 w-3 rounded-full bg-[#0B192C] ring-1 ring-white/50" />
              Navy Blue
            </span>
          </div>
        </div>
      </motion.div>

      {/* Scrub Image Trail Interactive Showcase Section - Seamless Blend */}
      <section className="bg-gradient-to-b from-[#08182D] via-[#0B192C] to-[#0D1B2A] py-6 sm:py-10 text-white relative overflow-hidden">
        <div className="container-px max-w-6xl mx-auto">
          <motion.div
            className="relative h-[320px] sm:h-[380px] rounded-3xl bg-gradient-to-br from-[#0B192C]/90 via-[#0F172A]/80 to-[#1E293B]/70 shadow-2xl overflow-hidden cursor-crosshair"
            style={{ y: showcaseCardY }}
          >
            <ImageTrail items={SCRUB_TRAIL_IMAGES} variant={2} />
            <motion.div className="absolute inset-0 grid place-items-center pointer-events-none z-0" style={{ y: shinyTextParallaxY }}>
              <ShinyText
                text="ZYNEX"
                speed={3}
                color="rgba(255, 255, 255, 0.15)"
                shineColor="#2DD4BF"
                spread={120}
                className="font-display text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-widest select-none drop-shadow-md"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features - Seamless Continuous Gradient */}
      <section className="bg-gradient-to-b from-[#0D1B2A] via-[#0F172A] to-[#111C2E] py-20 lg:py-28 text-white relative">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">ZYNEX Fabric Finish Requirements</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl text-balance">
              Knitted performance fabric that works as hard as you do
            </h2>
            <p className="mt-4 text-slate-300">
              Engineered with 200-220 GSM high-density knitted blend (92% Polyester, 8% Spandex) for total freedom of motion and clinical durability.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="group rounded-2xl bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-slate-800/80 hover:shadow-2xl shadow-lg backdrop-blur-sm animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal-500/20 text-teal-300 transition-colors group-hover:bg-teal-500 group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections with Parallax - Seamless Continuous Gradient */}
      <section className="bg-gradient-to-b from-[#111C2E] via-[#0E1A2C] to-[#0A1524] py-20 lg:py-28 text-white relative overflow-hidden">
        <div className="container-px">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Featured Collections</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                Find your fit
              </h2>
            </div>
            <button onClick={() => navigate('/shop')} className="btn-ghost text-sm text-slate-200 hover:text-white group">
              View all
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <motion.div className="mt-10 grid gap-6 md:grid-cols-3" style={{ y: collectionsParallaxY }}>
            {COLLECTIONS.map((c, i) => (
              <button
                key={c.title}
                onClick={() => navigate(c.path)}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-2xl animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Image src={c.image} alt={c.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/90 via-[#040D1A]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-white">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 group-hover:text-white transition-colors">
                    Shop now
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured products - Seamless Continuous Gradient */}
      <section className="bg-gradient-to-b from-[#0A1524] via-[#07111D] to-[#040D1A] py-20 lg:py-28 text-white relative">
        <div className="container-px">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Best Sellers</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                Tried, tested, and trusted
              </h2>
            </div>
            <button onClick={() => navigate('/shop')} className="btn-ghost text-sm text-slate-200 hover:text-white group">
              View all
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Parallax background - Seamless Blend */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#040D1A] to-[#020812] py-20 text-white lg:py-28">
        <motion.div className="absolute inset-0 opacity-25 scale-110" style={{ y: testimonialImageY }}>
          <Image
            src="https://images.pexels.com/photos/2633202/pexels-photo-2633202.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040D1A]/90 via-[#040D1A]/70 to-[#020812]" />
        </motion.div>
        <div className="container-px relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">From the Frontline</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Words from the people who wear them
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative">
              <Quote size={48} className="mx-auto text-teal-500/30" />
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
                    <p className="mt-5 text-xl font-medium leading-relaxed text-slate-200 sm:text-2xl text-balance">
                      "{t.quote}"
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                      <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-teal-400/40" />
                      <div className="text-left">
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-slate-400">{t.role} · {t.location}</p>
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
                <ArrowRight size={18} className="rotate-180" />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === activeTestimonial ? 'w-8 bg-teal-400' : 'w-2.5 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
