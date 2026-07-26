import { useEffect, useState } from 'react';
import { ArrowRight, Quote, Star } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS, TESTIMONIALS } from '../data';
import { motion, useScroll, useTransform } from 'motion/react';
import ProductCard from '../components/ProductCard';
import Image from '../components/Image';
import ImageTrail from '../components/ImageTrail';
import ShinyText from '../components/ShinyText';
import SideRays from '../components/SideRays';
import SplitText from '../components/SplitText';
import MagicBento from '../components/MagicBento';
import Scrub3DViewer from '../components/Scrub3DViewer';

const SCRUB_TRAIL_IMAGES = PRODUCTS.flatMap((p) => p.images);

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
      {/* Hero with SideRays animation background & Parallax depth */}
      <section className="relative overflow-hidden bg-[#040D1A] min-h-[85vh] flex items-center">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroBgY }}>
          <SideRays
            speed={2.5}
            rayColor1="#0DA39C"
            rayColor2="#38BDF8"
            intensity={2}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1.0}
          />
        </motion.div>

        {/* Hero 2-Column Grid: Left Title & Subheading, Right 3D Model seamlessly blended */}
        <div className="container-px relative z-10 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[65vh] w-full">
          {/* Left Column: Animated ZYNEX brand name & SplitText Subheading */}
          <motion.div className="lg:col-span-6 text-left animate-fade-up flex flex-col gap-4" style={{ y: heroTextY, opacity: heroOpacity }}>
            <ShinyText
              text="ZYNEX"
              speed={2.5}
              color="rgba(255, 255, 255, 0.95)"
              shineColor="#2DD4BF"
              spread={140}
              className="font-display text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-widest select-none drop-shadow-2xl"
            />
            <SplitText
              text="Engineered for Comfort. Designed for Performance."
              className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-teal-300 tracking-wide max-w-xl text-left drop-shadow-lg"
              delay={35}
              duration={0.7}
              ease="power3.out"
              splitType="chars"
              textAlign="left"
              tag="p"
            />
          </motion.div>

          {/* Right Column: Seamlessly Blended 3D Medical Scrubs Model */}
          <motion.div className="lg:col-span-6 min-h-[440px] sm:min-h-[520px] w-full relative flex items-center justify-center" style={{ y: heroTextY, opacity: heroOpacity }}>
            <Scrub3DViewer modelPath="/medical scrubs 3d model.glb" />
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

      {/* Scrub Image Trail Interactive Showcase Section - End to End Full Width with Increased Vertical Height */}
      <section className="bg-gradient-to-b from-[#08182D] via-[#0B192C] to-[#0D1B2A] py-0 text-white relative overflow-hidden w-full">
        <motion.div
          className="relative h-[550px] sm:h-[650px] lg:h-[720px] w-full bg-gradient-to-br from-[#0B192C]/90 via-[#0F172A]/80 to-[#1E293B]/70 shadow-2xl overflow-hidden cursor-crosshair"
          style={{ y: showcaseCardY }}
        >
          <ImageTrail items={SCRUB_TRAIL_IMAGES} variant={2} />
          <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 text-center w-full" style={{ y: shinyTextParallaxY }}>
            <ShinyText
              text="ZYNEX"
              speed={3}
              color="rgba(255, 255, 255, 0.18)"
              shineColor="#2DD4BF"
              spread={120}
              className="font-display text-7xl sm:text-9xl lg:text-[14rem] font-black uppercase tracking-widest select-none drop-shadow-md text-center mx-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Magic Bento Grid - Seamless Continuous Gradient */}
      <section className="bg-gradient-to-b from-[#0D1B2A] via-[#0F172A] to-[#111C2E] py-20 lg:py-28 text-white relative">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">ZYNEX Fabric & Engineering Standards</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl text-balance">
              Knitted performance fabric that works as hard as you do
            </h2>
            <p className="mt-4 text-slate-300">
              Engineered with 200-220 GSM high-density knitted blend (92% Polyester, 8% Spandex) for total freedom of motion and clinical durability.
            </p>
          </div>
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="45, 212, 191"
          />
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
