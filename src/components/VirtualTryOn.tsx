import { motion } from 'motion/react';
import { ArrowRight, Lock } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function VirtualTryOn() {
  const { navigate } = useRouter();

  return (
    <div id="virtual-try-on" className="w-full relative py-8 sm:py-16 px-4 sm:px-8 bg-[#041117] text-[#F0F5F5] flex items-center justify-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center py-4 sm:py-12 px-2 sm:px-8"
      >
        {/* Left Column: Big Clean Text directly on Page */}
        <div className="lg:col-span-7 text-left space-y-3 sm:space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#38A7B8] font-bold">
            INNOVATIVE CLOTHING FIT
          </span>

          <h1 className="font-display text-3xl xs:text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-[#F0F5F5] leading-tight sm:leading-none drop-shadow-xl">
            AI VIRTUAL TRY-ON
          </h1>

          <p className="text-[#CBD7D7] text-sm sm:text-xl lg:text-2xl font-medium max-w-2xl leading-relaxed">
            See how ZYNA clinical apparel fits your body before ordering. Upload your photo, pick your gender and scrub color, and generate your realistic preview in seconds.
          </p>

          <div className="flex items-center gap-2.5 text-[11px] sm:text-sm text-[#7E969B] font-mono pt-1 sm:pt-2">
            <Lock className="h-4 w-4 text-[#38A7B8] shrink-0" />
            <span>100% Private Browser Memory. No images are saved or stored.</span>
          </div>
        </div>

        {/* Right Column: Big TRY NOW Button redirecting to /try-on page */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center pt-2 sm:pt-0">
          <button
            onClick={() => navigate('/try-on')}
            className="w-full max-w-md py-4 sm:py-7 px-6 sm:px-10 rounded-2xl bg-[#38A7B8] hover:bg-[#4EB8C9] text-[#041117] font-display font-black text-xl sm:text-3xl uppercase tracking-wider flex items-center justify-center gap-3 sm:gap-4 transition-all transform hover:scale-[1.02] shadow-2xl shadow-[#38A7B8]/30 cursor-pointer"
          >
            <span>TRY NOW</span>
            <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 text-[#041117]" />
          </button>

          <p className="text-[#7E969B] text-[10px] sm:text-xs uppercase tracking-widest font-mono">
            Instant Processing • No Sign-Up Required
          </p>
        </div>
      </motion.div>
    </div>
  );
}
