import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import SideRays from '../components/SideRays';
import SplitText from '../components/SplitText';
import Scrub3DViewer from '../components/Scrub3DViewer';
import VirtualTryOn from '../components/VirtualTryOn';
import Footer from '../components/Footer';
import Lanyard from '../components/Lanyard';

// 5 Feature beats with verified copy, patched ZYNA videos, and lightweight textures (~70KB)
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
    primaryImage: '/scrub_feature_1.jpg',
    secondaryImage: '/scrub_feature_1.jpg',
    fallbackImage: '/Gemini_Generated_Image_nce5j3nce5j3nce5.png',
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
    primaryImage: '/scrub_feature_2.jpg',
    secondaryImage: '/scrub_feature_2.jpg',
    fallbackImage: '/Gemini_Generated_Image_nce5j3nce5j3nce5 (1).png',
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
    video: '/Video%20three.mp4', // Patched video with authentic ZYNA pocket badge
    primaryImage: '/scrub_feature_3.jpg',
    secondaryImage: '/scrub_feature_3.jpg',
    fallbackImage: '/Gemini_Generated_Image_nce5j3nce5j3nce5 (2).png',
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
    primaryImage: '/scrub_feature_4.jpg',
    secondaryImage: '/scrub_feature_4.jpg',
    fallbackImage: '/Gemini_Generated_Image_nce5j3nce5j3nce5 (3).png',
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
    video: '/Video%20five.mp4', // Patched video with authentic ZYNA pocket & collar badge
    primaryImage: '/scrub_feature_5.jpg',
    secondaryImage: '/scrub_feature_5.jpg',
    fallbackImage: '/Gemini_Generated_Image_q6oe8eq6oe8eq6oe.png',
    imageFirst: true, // Scroll 5: Left Video 5, Right Text
  },
];

const TOTAL_SECTIONS = 4;

// Smart Image loader that attempts optimized image before falling back
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
      loading="eager"
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
      <div className="relative h-[190px] xs:h-[220px] sm:h-[360px] lg:h-[480px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#081E26] border border-[#CBD7D7]/15">
        <video
          key={feature.video}
          src={feature.video}
          poster={feature.primaryImage}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoError(true)}
          className="h-full w-full object-cover rounded-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041117]/60 via-transparent to-transparent pointer-events-none rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="relative h-[190px] xs:h-[220px] sm:h-[360px] lg:h-[480px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#081E26] border border-[#CBD7D7]/15">
      <SmartImage
        primary={feature.primaryImage}
        secondary={feature.secondaryImage}
        fallback={feature.fallbackImage}
        alt={feature.headline}
        className="h-full w-full object-cover rounded-3xl transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041117]/60 via-transparent to-transparent pointer-events-none rounded-3xl" />
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

  // Section & Sub-step scroll handler with fast responsive transition
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
        if (step < FEATURE_STEPS.length - 1) {
          updateSectionAndStep(1, step + 1);
        } else {
          updateSectionAndStep(2, 0); // Advance to Virtual Try-On Section
        }
      } else if (sec === 2) {
        updateSectionAndStep(3, 0); // Advance to Lanyard 3D Section
      }
    } else {
      // Direction 'prev'
      if (sec === 3) {
        updateSectionAndStep(2, 0); // Back to Virtual Try-On Section
      } else if (sec === 2) {
        updateSectionAndStep(1, FEATURE_STEPS.length - 1); // Back to Step 5 of Section 1
      } else if (sec === 1) {
        if (step > 0) {
          updateSectionAndStep(1, step - 1);
        } else {
          updateSectionAndStep(0, 0);
        }
      }
    }

    // Snappy unlock after 480ms for fluid responsiveness
    setTimeout(() => {
      isLockedRef.current = false;
    }, 480);
  }, [updateSectionAndStep]);

  // Wheel listener with fine-tuned sensitivity
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      
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

  // Touch Swipe handlers (prevents swipe hijacking on interactive 3D elements)
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea')) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 35) {
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
      className="relative h-[calc(100dvh-4rem)] lg:h-[calc(100vh-5rem)] min-h-[calc(100dvh-4rem)] w-full overflow-hidden bg-[#041117] text-[#F0F5F5] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mobile Subtle Floating Section Indicator */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex sm:hidden items-center gap-1.5 bg-[#041117]/90 border border-[#CBD7D7]/20 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xl pointer-events-auto">
        {[0, 1, 2, 3].map((sec) => (
          <button
            key={sec}
            onClick={() => updateSectionAndStep(sec, 0)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              currentSection === sec
                ? 'w-5 bg-[#38A7B8]'
                : 'w-1.5 bg-[#CBD7D7]/30'
            }`}
            aria-label={`Go to section ${sec + 1}`}
          />
        ))}
        <span className="text-[10px] font-mono font-bold text-[#38A7B8] ml-1">
          0{currentSection + 1}/04
        </span>
      </div>
      {/* Floating Section Navigation Dots on Right Edge */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto hidden sm:flex">
        {[
          { label: 'Hero', sec: 0, step: 0 },
          { label: 'Features', sec: 1, step: featureStep },
          { label: 'Try-On', sec: 2, step: 0 },
          { label: 'Identity', sec: 3, step: 0 },
        ].map(({ label, sec, step }) => (
          <button
            key={sec}
            onClick={() => updateSectionAndStep(sec, step)}
            className="group flex items-center justify-end gap-2 text-right cursor-pointer"
            title={label}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7E969B] opacity-0 group-hover:opacity-100 transition-opacity bg-[#041117]/90 px-2 py-0.5 rounded border border-[#CBD7D7]/15">
              {label}
            </span>
            <span
              className={`h-2 rounded-full transition-all ${
                currentSection === sec
                  ? 'w-6 bg-[#38A7B8] shadow-[0_0_8px_rgba(56,167,184,0.6)]'
                  : 'w-2 bg-[#CBD7D7]/30 group-hover:bg-[#CBD7D7]/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Full-Screen Section Transition Stack with Hardware Acceleration */}
      <div 
        className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform bg-[#041117]"
        style={{ transform: `translate3d(0, -${currentSection * 100}%, 0)` }}
      >
        {/* ==================== SECTION 1: HERO ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-center overflow-hidden bg-[#041117]">
          <div className="absolute inset-0 z-0 bg-[#041117]">
            <SideRays
              speed={1.6}
              rayColor1="#134752"
              rayColor2="#287C8C"
              intensity={1.5}
              spread={2}
              origin="top-right"
              tilt={0}
              saturation={1.2}
              blend={0.75}
              falloff={1.6}
              opacity={0.8}
            />
          </div>

          <div className="container-px relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-center w-full py-2 sm:py-6">
            {/* Left Column: Brand title & Tagline */}
            <motion.div
              className="lg:col-span-6 text-left flex flex-col gap-2.5 sm:gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={currentSection === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#38A7B8] font-bold">
                DESIGN-FIRST HEALTHCARE APPAREL
              </span>

              {/* Authentic ZYNA Logo Wordmark */}
              <div className="py-0.5">
                <img
                  src="/zyna-wordmark-transparent.png"
                  alt="ZYNA"
                  className="w-full max-w-[210px] xs:max-w-[260px] sm:max-w-[420px] lg:max-w-[560px] h-auto object-contain select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] filter brightness-110"
                />
              </div>
              
              <SplitText
                text="Engineered for Comfort. Designed for Performance."
                className="font-display text-sm xs:text-base sm:text-2xl lg:text-3xl font-bold text-[#CBD7D7] tracking-wide max-w-xl text-left drop-shadow-lg leading-snug"
                delay={30}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                textAlign="left"
                tag="p"
              />

              <div className="pt-1 sm:pt-2 flex items-center gap-3">
                <button
                  onClick={() => updateSectionAndStep(1, 0)}
                  className="btn-primary text-[11px] sm:text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 cursor-pointer shadow-lg shadow-[#38A7B8]/20"
                >
                  <span>Explore Garment</span>
                  <ChevronRight size={14} />
                </button>
                <a
                  href="#/model-3d"
                  className="btn-secondary text-[11px] sm:text-xs font-mono uppercase tracking-wider px-4 py-2 sm:px-6 sm:py-3 cursor-pointer"
                >
                  3D Studio
                </a>
              </div>
            </motion.div>

            {/* Right Column: 3D Scrub Model */}
            <motion.div
              className="lg:col-span-6 h-[260px] xs:h-[300px] sm:h-[400px] lg:h-[500px] w-full relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={currentSection === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <Scrub3DViewer modelPath="/medical scrubs 3d model.glb" />
            </motion.div>
          </div>
        </section>



        {/* ==================== SECTION 2: 5-SUBSCROLL PINNED FEATURE SHOWCASE ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-center overflow-y-auto lg:overflow-hidden bg-gradient-to-b from-[#041117] via-[#081E26] to-[#041117] py-2 sm:py-4">
          
          {/* Animated Alternating Content */}
          <div className="w-full container-px relative z-10 flex-1 flex items-center justify-center min-h-0 lg:min-h-[500px] py-1 sm:py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.step}
                initial={{ opacity: 0, x: currentFeature.imageFirst ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: currentFeature.imageFirst ? 40 : -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-10 lg:gap-14 items-center w-full"
              >
                {/* Media Column: Always order-1 on mobile so it doesn't jump; alternates on desktop */}
                <div className={`lg:col-span-6 order-1 ${currentFeature.imageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
                  <FeatureMedia feature={currentFeature} />
                </div>

                {/* Text Content Column: Always order-2 on mobile */}
                <div className={`lg:col-span-6 order-2 ${currentFeature.imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex flex-col justify-center text-left space-y-2 sm:space-y-4">
                    <span className="text-[#38A7B8] text-xs sm:text-sm font-bold font-mono tracking-widest uppercase">
                      STEP 0{currentFeature.step} // {currentFeature.tag}
                    </span>

                    <h2 className="font-display text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-black text-[#F0F5F5] tracking-tight leading-tight sm:leading-[1.15] text-balance drop-shadow-xl">
                      {currentFeature.headline}
                    </h2>

                    <div className="space-y-1.5 sm:space-y-3 pt-0.5">
                      {currentFeature.usps.map((usp, uIdx) => (
                        <div key={uIdx} className="flex items-start gap-2.5 sm:gap-4">
                          <CheckCircle2 size={18} className="text-[#38A7B8] mt-0.5 shrink-0 sm:size-[22px]" />
                          <p className="text-[#CBD7D7] text-xs xs:text-sm sm:text-base lg:text-lg leading-snug font-medium">
                            {usp}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Step Navigator Controls */}
                    <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                      {featureStep > 0 && (
                        <button
                          onClick={() => updateSectionAndStep(1, featureStep - 1)}
                          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#081E26] text-[#CBD7D7] border border-[#CBD7D7]/20 text-[10px] sm:text-xs font-mono uppercase tracking-wider hover:bg-[#0D2D37] hover:text-white cursor-pointer transition-colors flex items-center gap-1"
                        >
                          <ChevronLeft size={13} />
                          <span>Prev</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (featureStep < FEATURE_STEPS.length - 1) {
                            updateSectionAndStep(1, featureStep + 1);
                          } else {
                            updateSectionAndStep(2, 0);
                          }
                        }}
                        className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#38A7B8] text-[#041117] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[#4EB8C9] cursor-pointer transition-all shadow-md shadow-[#38A7B8]/20 flex items-center gap-1"
                      >
                        <span>{featureStep < FEATURE_STEPS.length - 1 ? 'Next Beat' : 'Virtual Try-On'}</span>
                        <ChevronRight size={13} />
                      </button>

                      <div className="flex items-center gap-1.5 ml-1 sm:ml-2">
                        {FEATURE_STEPS.map((s, idx) => (
                          <button
                            key={s.step}
                            onClick={() => updateSectionAndStep(1, idx)}
                            className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                              featureStep === idx
                                ? 'w-5 sm:w-6 bg-[#38A7B8]'
                                : 'w-1.5 sm:w-2 bg-[#CBD7D7]/30 hover:bg-[#CBD7D7]/60'
                            }`}
                            title={`Step ${s.step}: ${s.tag}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            </motion.div>
            </AnimatePresence>
          </div>
        </section>


        {/* ==================== SECTION 3: BROWSER-BASED VIRTUAL TRY-ON STUDIO ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-center overflow-y-auto bg-[#041117] text-[#F0F5F5]">
          <VirtualTryOn />
        </section>


        {/* ==================== SECTION 4: INTERACTIVE 3D LANYARD (LAST SECTION) ==================== */}
        <section className="h-full w-full relative flex-none flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#041117] via-[#081E26] to-[#020B0F]">
          <div className="relative flex-1 w-full flex flex-col items-center justify-center min-h-[280px] sm:min-h-[480px]">
            <Lanyard
              position={[0, 0, 22]}
              gravity={[0, -40, 0]}
              frontImage="/zyna-logo.jpg"
              backImage="/zyna-logo.jpg"
              imageFit="cover"
              lanyardImage="/lanyard.png"
              lanyardWidth={1}
            />
          </div>

          {/* Site Footer at the very bottom */}
          <div className="w-full flex-none z-20 border-t border-[#CBD7D7]/15 bg-[#020B0F]">
            <Footer />
          </div>
        </section>
      </div>
    </div>
  );
}
