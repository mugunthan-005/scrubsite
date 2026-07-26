import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Lock } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function VirtualTryOn() {
  const { navigate } = useRouter();

  return (
    <div id="virtual-try-on" className="w-full relative py-16 px-4 sm:px-8 bg-[#040D1A] text-white flex items-center justify-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12 px-4 sm:px-8"
      >
        {/* Left Column: Big Clean Text directly on Page */}
        <div className="lg:col-span-7 text-left space-y-6">
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none drop-shadow-xl">
            AI VIRTUAL TRY-ON
          </h1>

          <p className="text-slate-200 text-lg sm:text-2xl font-medium max-w-2xl leading-relaxed">
            See how ZYNEX clinical apparel fits your body before ordering. Upload your photo, pick your gender and scrub color, and generate your realistic preview in seconds.
          </p>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-400 font-mono pt-2">
            <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>100% Private Browser Memory. No images are saved or stored.</span>
          </div>
        </div>

        {/* Right Column: Big TRY NOW Button redirecting to /try-on page */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6 text-center">
          <button
            onClick={() => navigate('/try-on')}
            className="w-full max-w-md py-8 px-10 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-display font-black text-3xl sm:text-4xl uppercase tracking-wider flex items-center justify-center gap-4 transition-all transform hover:scale-[1.03] shadow-2xl shadow-emerald-500/30 cursor-pointer"
          >
            <span>TRY NOW</span>
            <ArrowRight className="h-8 w-8 text-black" />
          </button>

          <p className="text-slate-400 text-xs uppercase tracking-widest font-mono">
            Instant Processing • No Sign-Up Required
          </p>
        </div>
      </motion.div>
    </div>
  );
}
