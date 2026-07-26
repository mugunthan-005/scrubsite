import { useEffect, useState, useRef, useCallback } from 'react';
import { PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import ImageTrail from '../components/ImageTrail';
import ShinyText from '../components/ShinyText';
import SideRays from '../components/SideRays';
import SplitText from '../components/SplitText';
import Scrub3DViewer from '../components/Scrub3DViewer';
import VirtualTryOn from '../components/VirtualTryOn';
import Footer from '../components/Footer';

const SCRUB_TRAIL_IMAGES = PRODUCTS.flatMap((p) => p.images);

// 5-Subscroll Feature Sequence Content Structure with Videos 1 through 5
const FEATURE_STEPS = [
  {
    step: 1,
    tag: 'PERFORMANCE',
    headline: 'Engineered for Everyday Performance',
    usps: [
      'Premium 4-way stretch fabric that moves effortlessly with every shift.',
      'Lightweight construction for lasting comfort during extended wear.',
      'Tailored modern fit that looks professional without restricting movement.',
    ],
    video: '/Video%20One.mp4',
    primaryImage: '/image1.jpg',
    secondaryImage: '/image1.png',
    fallbackImage: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageFirst: true, // Scroll 1: Left Video 1, Right Text
  },
  {
    step: 2,
    tag: 'FABRIC TECH',
    headline: 'Smart Fabric. Smarter Performance.',
    usps: [
      'Antimicrobial finish to help reduce odour-causing bacteria.',
      'Fluid-repellent coating for protection against everyday spills.',
      'Wrinkle-resistant fabric that stays crisp throughout the day.',
    ],
    video: '/Video%20two.mp4',
    primaryImage: '/image2.jpg',
    secondaryImage: '/image2.png',
    fallbackImage: 'https://images.pexels.com/photos/2629884/pexels-photo-2629884.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageFirst: false, // Scroll 2: Left Text, Right Video 2
  },
  {
    step: 3,
    tag: 'CLINICAL DESIGN',
    headline: 'Designed Around Real Clinical Needs',
    usps: [
      'Functional pocket layout for quick access to daily essentials.',
      'Reinforced stitching for durability in demanding environments.',
      'Breathable knitted fabric for all-day comfort across every shift.',
    ],
    video: '/Video%20three.mp4',
    primaryImage: '/image3.jpg',
    secondaryImage: '/image3.png',
    fallbackImage: 'https://images.pexels.com/photos/4173270/pexels-photo-4173270.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageFirst: true, // Scroll 3: Left Video 3, Right Text
  },
  {
    step: 4,
    tag: 'PREMIUM QUALITY',
    headline: 'Comfort You Can Feel. Quality You Can Trust.',
    usps: [
      '92% Polyester and 8% Spandex performance blend.',
      '200–220 GSM fabric offering durability without feeling bulky.',
      'Soft-touch finish with excellent shape retention after repeated washes.',
    ],
    video: '/Video%20four.mp4',
    primaryImage: '/image4.jpg',
    secondaryImage: '/image4.png',
    fallbackImage: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageFirst: false, // Scroll 4: Left Text, Right Video 4
  },
  {
    step: 5,
    tag: 'NEXT GEN',
    headline: 'Designed for the Next Generation of Healthcare',
    usps: [
      'Contemporary minimalist design inspired by premium activewear.',
      'Clean silhouettes that balance style with workplace professionalism.',
      'Crafted to make healthcare professionals feel confident every day.',
    ],
    video: '/Video%20five.mp4',
    primaryImage: '/image5.jpg',
    secondaryImage: '/image5.png',
    fallbackImage: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1200',
    imageFirst: true, // Scroll 5: Left Video 5, Right Text
  },
];

const TOTAL_SECTIONS = 4;

// Smart Image loader that attempts /imageX.jpg or /imageX.png before falling back gracefully
function SmartImage({ primary, secondary, fallback, alt, className }: { primary: string; secondary: string; fallback: string; alt: string; className?: string }) {
  const [imgSrc, setImgSrc] = useState(primary);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setImgSrc(primary);
    setAttempt(0);
  }, [primary]);

  const handleError = () => {
    if (attempt === 0) {
      setAttempt(1);
      setImgSrc(secondary);
    } else if (attempt === 1) {
      setAttempt(2);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
    />
  );
}

// Media renderer with video preloading and seamless fallback handling
function FeatureMedia({ feature }: { feature: typeof FEATURE_STEPS[0] }) {
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setVideoError(false);
  }, [feature.video]);

  if (feature.video && !videoError) {
    return (
      <div className="relative h-[360px] sm:h-[440px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl bg-[#040D1A]">
        <video
          key={feature.video}
          src={feature.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
          className="h-full w-full object-cover rounded-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/40 via-transparent to-transparent pointer-events-none rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="relative h-[360px] sm:h-[440px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl bg-[#040D1A]">
      <SmartImage
        primary={feature.primaryImage}
        secondary={feature.secondaryImage}
        fallback={feature.fallbackImage}
        alt={feature.headline}
        className="h-full w-full object-cover rounded-3xl transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A]/50 via-transparent to-transparent pointer-events-none rounded-3xl" />
    </div>
  );
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [featureStep, setFeatureStep] = useState(0);

  // Synchronous refs to prevent race conditions on rapid mouse wheel events
  const currentSectionRef = useRef(0);
  const featureStepRef = useRef(0);
  const isLockedRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  // Synchronized state updater
  const updateSectionAndStep = useCallback((newSection: number, newStep: number) => {
    const validSection = Math.max(0, Math.min(TOTAL_SECTIONS - 1, newSection));
    const validStep = Math.max(0, Math.min(FEATURE_STEPS.length - 1, newStep));

    currentSectionRef.current = validSection;
    featureStepRef.current = validStep;

    setCurrentSection(validSection);
    setFeatureStep(validStep);
  }, []);

  // Section & Sub-step scroll handler with synchronous ref lock
  const handleScrollAction = useCallback((direction: 'next' | 'prev') => {
    if (isLockedRef.current) return;

    // Immediately lock synchronously to block rapid repeated wheel events
    isLockedRef.current = true;

    const sec = currentSectionRef.current;
    const step = featureStepRef.current;

    if (direction === 'next') {
      if (sec === 0) {
        updateSectionAndStep(1, 0);
      } else if (sec === 1) {
        updateSectionAndStep(2, 0);
      } else if (sec === 2) {
        if (step < FEATURE_STEPS.length - 1) {
          updateSectionAndStep(2, step + 1);
        } else {
          updateSectionAndStep(3, 0); // Advance to Virtual Try-On Section
        }
      }
    } else {
      // Direction 'prev'
      if (sec === 3) {
        updateSectionAndStep(2, FEATURE_STEPS.length - 1); // Back to Step 5 of Section 3
      } else if (sec === 2) {
        if (step > 0) {
          updateSectionAndStep(2, step - 1);
        } else {
          updateSectionAndStep(1, 0);
        }
      } else if (sec === 1) {
        updateSectionAndStep(0, 0);
      }
    }

    // Unlock after transition timeout
    setTimeout(() => {
      isLockedRef.current = false;
    }, 700);
  }, [updateSectionAndStep]);

  // Wheel listener
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      
      if (e.deltaY > 0) {
        handleScrollAction('next');
      } else if (e.deltaY < 0) {
        handleScrollAction('prev');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleScrollAction]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        handleScrollAction('next');
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        handleScrollAction('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleScrollAction]);

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
        handleScrollAction('next');
      } else {
        handleScrollAction('prev');
      }
    }
    touchStartY.current = null;
  };

  const currentFeature = FEATURE_STEPS[featureStep];

  return (
    <div 
      className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#040D1A] text-white select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-Screen Section Transition Stack */}
      <div 
        className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-[#040D1A]"
        style={{ transform: `translate3d(0, -${currentSection * 100}%, 0)` }}
      >
        {/* ==================== SECTION 1: HERO ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-center overflow-hidden bg-[#040D1A]">
          <div className="absolute inset-0 z-0 bg-[#040D1A]">
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
            {/* Left Column: Brand title & Tagline */}
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
          {/* Specification Banner Bar */}
          <div className="bg-[#061224]/90 border-b border-white/10 py-4 text-white relative z-20">
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
          </div>

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


        {/* ==================== SECTION 3: 5-SUBSCROLL PINNED FEATURE SHOWCASE ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0D1B2A] via-[#0F172A] to-[#111C2E] py-4">
          
          {/* Animated Alternating Content */}
          <div className="w-full container-px relative z-10 flex-1 flex items-center justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.step}
                initial={{ opacity: 0, x: currentFeature.imageFirst ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: currentFeature.imageFirst ? 50 : -50 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center w-full"
              >
                {/* Render Column 1 (Media if imageFirst, otherwise Text) */}
                <div className={`lg:col-span-6 ${currentFeature.imageFirst ? 'order-1' : 'order-2 lg:order-1'}`}>
                  {currentFeature.imageFirst ? (
                    <FeatureMedia feature={currentFeature} />
                  ) : (
                    /* Page Text Content - Enlarged Typography */
                    <div className="flex flex-col justify-center text-left space-y-6">
                      <span className="text-white text-sm font-bold font-mono tracking-widest uppercase">
                        {currentFeature.tag}
                      </span>

                      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] text-balance drop-shadow-xl">
                        {currentFeature.headline}
                      </h2>

                      <div className="mt-2 space-y-4">
                        {currentFeature.usps.map((usp, uIdx) => (
                          <div key={uIdx} className="flex items-start gap-4">
                            <CheckCircle2 size={24} className="text-teal-400 mt-1 shrink-0" />
                            <p className="text-slate-100 text-base sm:text-xl leading-relaxed font-medium">
                              {usp}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Render Column 2 (Text if imageFirst, otherwise Media) */}
                <div className={`lg:col-span-6 ${currentFeature.imageFirst ? 'order-2' : 'order-1 lg:order-2'}`}>
                  {!currentFeature.imageFirst ? (
                    <FeatureMedia feature={currentFeature} />
                  ) : (
                    /* Page Text Content - Enlarged Typography */
                    <div className="flex flex-col justify-center text-left space-y-6">
                      <span className="text-white text-sm font-bold font-mono tracking-widest uppercase">
                        {currentFeature.tag}
                      </span>

                      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] text-balance drop-shadow-xl">
                        {currentFeature.headline}
                      </h2>

                      <div className="mt-2 space-y-4">
                        {currentFeature.usps.map((usp, uIdx) => (
                          <div key={uIdx} className="flex items-start gap-4">
                            <CheckCircle2 size={24} className="text-teal-400 mt-1 shrink-0" />
                            <p className="text-slate-100 text-base sm:text-xl leading-relaxed font-medium">
                              {usp}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>


        {/* ==================== SECTION 4: BROWSER-BASED VIRTUAL TRY-ON STUDIO ==================== */}
        <section className="h-full w-full relative flex-none overflow-y-auto bg-[#040D1A] text-white">
          <div className="min-h-full flex flex-col justify-between">
            <VirtualTryOn />
            <div className="w-full flex-none z-20 border-t border-white/10 bg-[#020812]">
              <Footer />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
