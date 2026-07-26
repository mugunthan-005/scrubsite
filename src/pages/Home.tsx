import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowRight, Quote, Star } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS, TESTIMONIALS } from '../data';
import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';
import Image from '../components/Image';
import ImageTrail from '../components/ImageTrail';
import ShinyText from '../components/ShinyText';
import SideRays from '../components/SideRays';
import SplitText from '../components/SplitText';
import Scrub3DViewer from '../components/Scrub3DViewer';
import Footer from '../components/Footer';

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

const TOTAL_SECTIONS = 6;

export default function Home() {
  const { navigate } = useRouter();
  const featured = PRODUCTS.filter((p) => p.bestSeller).slice(0, 4);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  
  // Touch tracking ref
  const touchStartY = useRef<number | null>(null);



  // Rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Section navigation trigger with 1-second delay pause lock
  const goToSection = useCallback((targetIndex: number) => {
    if (isLocked || targetIndex < 0 || targetIndex >= TOTAL_SECTIONS) return;
    
    setIsLocked(true);
    setCurrentSection(targetIndex);

    // 1-second delay lock after scrolling each section
    setTimeout(() => {
      setIsLocked(false);
    }, 1000);
  }, [isLocked]);

  const handleNext = useCallback(() => {
    if (currentSection < TOTAL_SECTIONS - 1) {
      goToSection(currentSection + 1);
    }
  }, [currentSection, goToSection]);

  const handlePrev = useCallback(() => {
    if (currentSection > 0) {
      goToSection(currentSection - 1);
    }
  }, [currentSection, goToSection]);

  // Wheel event listener with 1-second delay lock
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      
      if (e.deltaY > 0) {
        handleNext();
      } else if (e.deltaY < 0) {
        handlePrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleNext, handlePrev]);

  // Keyboard navigation listener (ArrowDown, ArrowUp, PageDown, PageUp, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartY.current = null;
  };

  return (
    <div 
      className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#040D1A] text-white select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-Screen Section Transition Stack */}
      <div 
        className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translate3d(0, -${currentSection * 100}%, 0)` }}
      >
        {/* ==================== SECTION 1: HERO ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-center overflow-hidden bg-[#040D1A]">
          <div className="absolute inset-0 z-0">
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
          </div>

          <div className="container-px relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            {/* Left Column: Brand title & Tagline (EXPLORE COLLECTION BUTTON REMOVED) */}
            <motion.div
              className="lg:col-span-6 text-left flex flex-col gap-5"
              initial={{ opacity: 0, y: 40 }}
              animate={currentSection === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
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

            {/* Right Column: 3D Scrub Model */}
            <motion.div
              className="lg:col-span-6 min-h-[380px] sm:min-h-[480px] w-full relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={currentSection === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Scrub3DViewer modelPath="/medical scrubs 3d model.glb" />
            </motion.div>
          </div>
        </section>


        {/* ==================== SECTION 2: SPECS & CURSOR CANVAS SHOWCASE ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#040D1A] via-[#061224] to-[#08182D]">


          {/* Interactive Scrub Image Trail Canvas */}
          <div className="relative flex-1 w-full bg-gradient-to-br from-[#0B192C]/90 via-[#0F172A]/80 to-[#1E293B]/70 shadow-2xl overflow-hidden cursor-crosshair flex items-center justify-center">
            <ImageTrail items={SCRUB_TRAIL_IMAGES} variant={2} />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 text-center w-full">
              <ShinyText
                text="ZYNEX"
                speed={3}
                color="rgba(255, 255, 255, 0.18)"
                shineColor="#2DD4BF"
                spread={120}
                className="font-display text-7xl sm:text-9xl lg:text-[13rem] font-black uppercase tracking-widest select-none drop-shadow-md text-center mx-auto"
              />
            </div>
          </div>
        </section>


        {/* ==================== SECTION 3: REIMAGINED MEDICAL WORKWEAR FEATURES ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#0D1B2A] via-[#0F172A] to-[#111C2E] py-8 sm:py-12">
          <div className="container-px relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Blank Image Canvas Container */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={currentSection === 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-5 h-[380px] sm:h-[480px] lg:h-[540px] w-full rounded-2xl bg-gradient-to-b from-[#061224]/80 via-[#0A192F]/60 to-[#040D1A]/90 border border-teal-500/20 shadow-2xl backdrop-blur-md relative overflow-hidden flex items-center justify-center group"
              >
                {/* Ambient Soft Glow inside blank canvas */}
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-sky-500/10 to-transparent blur-2xl group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 text-center px-6">
                  <span className="h-3 w-3 rounded-full bg-teal-400/80 animate-ping inline-block mb-3" />
                  <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-teal-300/80">
                    Product Canvas Placeholder
                  </p>
                </div>
              </motion.div>

              {/* Right Column: 5 Reimagined Feature Highlights */}
              <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 text-left">
                {[
                  {
                    num: "01",
                    title: "Not Just a Scrub.",
                    desc: "The next generation of medical workwear.",
                  },
                  {
                    num: "02",
                    title: "Shield Every Shift.",
                    desc: "Fluid repellent. Antimicrobial. Ready for the realities of healthcare.",
                  },
                  {
                    num: "03",
                    title: "Move Freely. Work Comfortably.",
                    desc: "Breathable bamboo-blend fabric with four-way stretch, designed for long hours on your feet.",
                  },
                  {
                    num: "04",
                    title: "Designed Around Healthcare Professionals.",
                    desc: "Every stitch is engineered for comfort, durability, and confidence in demanding clinical environments.",
                  },
                  {
                    num: "05",
                    title: "Wear the Future of Healthcare.",
                    desc: "Medease transforms everyday scrubs into performance-driven medical workwear—because those who care for others deserve equipment designed to care for them.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, y: 25 }}
                    animate={currentSection === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="group relative p-3.5 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-teal-500/40 hover:bg-slate-900/80 transition-all duration-300 shadow-md flex items-start gap-4"
                  >
                    <span className="font-display text-xs sm:text-sm font-extrabold text-teal-400/90 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/30 flex-none group-hover:bg-teal-500 group-hover:text-white transition-all">
                      {item.num}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-display text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* ==================== SECTION 4: FEATURED COLLECTIONS ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#111C2E] via-[#0E1A2C] to-[#0A1524]">
          <div className="container-px relative z-10">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">Featured Collections</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                  Find your perfect fit
                </h2>
              </div>
              <button onClick={() => navigate('/shop')} className="btn-ghost text-xs sm:text-sm text-teal-300 hover:text-white group flex items-center gap-2">
                View all collections
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {COLLECTIONS.map((c, i) => (
                <motion.button
                  key={c.title}
                  onClick={() => navigate(c.path)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={currentSection === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group relative h-[380px] sm:h-[430px] overflow-hidden rounded-2xl text-left shadow-2xl border border-white/10 focus:outline-none cursor-pointer"
                >
                  <Image src={c.image} alt={c.title} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/95 via-[#040D1A]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl font-bold text-white">{c.title}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300">{c.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 group-hover:text-white transition-colors">
                      Shop now
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>


        {/* ==================== SECTION 5: BEST SELLERS ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#0A1524] via-[#07111D] to-[#040D1A]">
          <div className="container-px relative z-10">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">Best Sellers</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                  Tried, tested, and trusted
                </h2>
              </div>
              <button onClick={() => navigate('/shop')} className="btn-ghost text-xs sm:text-sm text-teal-300 hover:text-white group flex items-center gap-2">
                Explore shop
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {featured.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={currentSection === 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ==================== SECTION 6: TESTIMONIALS & FOOTER ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-between overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#040D1A] to-[#020812] no-scrollbar">
          <div className="container-px relative pt-12 pb-8 flex-1 flex flex-col justify-center">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-300">From the Frontline</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                Words from the doctors & nurses who wear ZYNEX
              </h2>
            </div>

            <div className="mx-auto mt-8 max-w-3xl w-full">
              <div className="relative min-h-[190px]">
                <Quote size={40} className="mx-auto text-teal-500/30" />
                <div className="mt-4 min-h-[160px] text-center">
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
                          <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="mt-3 text-lg font-medium leading-relaxed text-slate-200 sm:text-xl text-balance">
                        "{t.quote}"
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-teal-400/40" />
                        <div className="text-left">
                          <p className="font-semibold text-sm text-white">{t.name}</p>
                          <p className="text-xs text-slate-400">{t.role} · {t.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => setActiveTestimonial((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ArrowRight size={16} className="rotate-180" />
                </button>

                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === activeTestimonial ? 'w-6 bg-teal-400' : 'w-2 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to section ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Footer attached seamlessly to the final section */}
          <div className="w-full flex-none">
            <Footer />
          </div>
        </section>
      </div>
    </div>
  );
}
