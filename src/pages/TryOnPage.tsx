import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Upload, Download, RefreshCw, Eye, ArrowRight, Lock, Check, Sparkles, ArrowLeft } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import Footer from '../components/Footer';

interface ColorOption {
  name: string;
  hex: string;
  hsl: [number, number, number];
}

const COLOR_SWATCHES: ColorOption[] = [
  { name: 'Navy Blue', hex: '#0B192C', hsl: [215, 60, 11] },
  { name: 'Ceil Blue', hex: '#639CD9', hsl: [211, 60, 62] },
  { name: 'Ocean Teal', hex: '#0DA39C', hsl: [177, 85, 35] },
  { name: 'Royal Blue', hex: '#1C70F0', hsl: [216, 88, 52] },
  { name: 'Burgundy', hex: '#6D1F3C', hsl: [337, 56, 27] },
  { name: 'Hunter Green', hex: '#1F5E3A', hsl: [146, 50, 25] },
  { name: 'Charcoal', hex: '#374151', hsl: [217, 19, 27] },
  { name: 'Midnight Black', hex: '#111827', hsl: [222, 47, 11] },
];

const SAMPLE_MODELS = {
  Men: 'https://images.pexels.com/photos/2629884/pexels-photo-2629884.jpeg?auto=compress&cs=tinysrgb&w=800',
  Women: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800',
  Unisex: 'https://images.pexels.com/photos/4173270/pexels-photo-4173270.jpeg?auto=compress&cs=tinysrgb&w=800',
};

export default function TryOnPage() {
  const { navigate } = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsApproved, setTermsApproved] = useState(false);

  // Studio selections
  const [gender, setGender] = useState<'Men' | 'Women' | 'Unisex'>('Men');
  const [selectedGarment, setSelectedGarment] = useState<'set' | 'top'>('set');
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_SWATCHES[0]);

  // Image & canvas state
  const [userImageSrc, setUserImageSrc] = useState<string | null>(SAMPLE_MODELS.Men);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clean up object URL when component unmounts or image resets
  const revokeCurrentImage = useCallback(() => {
    if (userImageSrc && userImageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(userImageSrc);
    }
  }, [userImageSrc]);

  // Handle custom photo upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG or PNG).');
      return;
    }

    revokeCurrentImage();
    const blobUrl = URL.createObjectURL(file);
    setUserImageSrc(blobUrl);
    setIsGenerated(false);
  };

  // Update image when gender changes if using default sample model
  useEffect(() => {
    if (userImageSrc && Object.values(SAMPLE_MODELS).includes(userImageSrc)) {
      setUserImageSrc(SAMPLE_MODELS[gender]);
      setIsGenerated(false);
    }
  }, [gender]);

  // Canvas AI rendering engine
  const runAiGeneration = useCallback(() => {
    if (!userImageSrc || !canvasRef.current || !termsApproved) return;

    setIsGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = userImageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Base original image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (!showOriginal && isGenerated) {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = canvas.width;
        offCanvas.height = canvas.height;
        const offCtx = offCanvas.getContext('2d');

        if (offCtx) {
          offCtx.drawImage(img, 0, 0);
          const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
          const data = imageData.data;

          const blendAlpha = 0.85;
          const startY = Math.floor(canvas.height * (selectedGarment === 'top' ? 0.25 : 0.2));
          const endY = Math.floor(canvas.height * (selectedGarment === 'top' ? 0.65 : 0.9));
          const startX = Math.floor(canvas.width * 0.2);
          const endX = Math.floor(canvas.width * 0.8);

          const [tr, tg, tb] = hexToRgb(selectedColor.hex);

          for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
              const idx = (y * canvas.width + x) * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];

              const brightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 510;

              if (brightness > 0.08 && brightness < 0.92) {
                data[idx] = Math.round(r * (1 - blendAlpha) + tr * brightness * blendAlpha);
                data[idx + 1] = Math.round(g * (1 - blendAlpha) + tg * brightness * blendAlpha);
                data[idx + 2] = Math.round(b * (1 - blendAlpha) + tb * brightness * blendAlpha);
              }
            }
          }

          offCtx.putImageData(imageData, 0, 0);
          ctx.drawImage(offCanvas, 0, 0);
        }
      }

      setIsGenerating(false);
    };
  }, [userImageSrc, selectedColor, selectedGarment, showOriginal, isGenerated, termsApproved]);

  useEffect(() => {
    runAiGeneration();
  }, [runAiGeneration]);

  // Trigger AI generation
  const handleGenerateClick = () => {
    setIsGenerated(true);
    runAiGeneration();
  };

  // Helper: Hex to RGB
  function hexToRgb(hex: string): [number, number, number] {
    const cleanHex = hex.replace('#', '');
    const num = parseInt(cleanHex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  // Download image
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `ZYNEX-AI-TryOn-${gender}-${selectedColor.name.replace(/\s+/g, '-')}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  // Clear photo
  const handleClearPhoto = () => {
    revokeCurrentImage();
    setUserImageSrc(SAMPLE_MODELS[gender]);
    setIsGenerated(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#040D1A] text-white flex flex-col justify-between select-none">
      
      {/* Top Header Bar */}
      <div className="w-full border-b border-white/10 py-4 px-6 sm:px-12 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <span className="font-display font-black text-lg tracking-widest text-white">
          ZYNEX VIRTUAL TRY-ON
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: TERMS & CONDITIONS APPROVAL PAGE */}
          {!termsApproved ? (
            <motion.div
              key="terms"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl py-12 px-6 sm:px-12 text-left space-y-8"
            >
              <div className="flex items-center gap-3 text-emerald-400 font-display font-black text-3xl uppercase tracking-wider border-b border-white/10 pb-6">
                <ShieldCheck className="h-9 w-9 text-emerald-400" />
                <span>TERMS & PRIVACY POLICY</span>
              </div>

              <div className="space-y-6 text-slate-200 text-base leading-relaxed">
                <p className="font-semibold text-white text-lg">
                  Please review and accept our privacy guarantee before entering the AI Virtual Try-On Studio:
                </p>

                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 space-y-2">
                  <div className="font-bold flex items-center gap-2 text-white text-lg">
                    <Lock className="h-6 w-6 text-emerald-400" /> Zero Server Storage Guarantee
                  </div>
                  <p className="text-sm text-emerald-100 leading-relaxed">
                    Your uploaded photo is processed <strong>strictly inside your device's browser memory</strong> using client-side HTML5 canvas logic. We do <strong>NOT</strong> upload, store, or transmit your images to any remote server or database.
                  </p>
                </div>

                <ul className="list-disc pl-6 space-y-3 text-slate-300 text-sm font-mono">
                  <li>Your photo is deleted immediately upon closing the page or clicking Reset.</li>
                  <li>Ensure uploaded photos are clear, full-body or torso images for best AI fit.</li>
                  <li>Try-on visualizations are interactive simulations for style reference.</li>
                </ul>
              </div>

              {/* Checkbox agreement */}
              <label className="flex items-center gap-4 text-base text-white cursor-pointer p-5 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-emerald-500/40 transition-all">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="accent-emerald-400 h-6 w-6 rounded cursor-pointer"
                />
                <span className="font-bold">I agree to the Terms & Privacy Policy</span>
              </label>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  disabled={!agreedToTerms}
                  onClick={() => setTermsApproved(true)}
                  className="flex-1 py-5 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-display font-black text-xl uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer transition-all shadow-xl shadow-emerald-500/25"
                >
                  <span>APPROVE & ENTER STUDIO</span>
                  <ArrowRight className="h-6 w-6" />
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="py-5 px-8 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-base uppercase tracking-wider cursor-pointer"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          ) : (
            
            /* STEP 2: UNIFIED FULL-PAGE AI STUDIO */
            <motion.div
              key="studio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-7xl py-8 px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* LEFT COLUMN: Large Photo Upload & Canvas Preview */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                
                {/* Header bar over preview */}
                <div className="flex items-center justify-between font-mono text-xs text-slate-300 border-b border-white/10 pb-3">
                  <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI PREVIEW CANVAS
                  </span>

                  {isGenerated && (
                    <button
                      onMouseDown={() => setShowOriginal(true)}
                      onMouseUp={() => setShowOriginal(false)}
                      onTouchStart={() => setShowOriginal(true)}
                      onTouchEnd={() => setShowOriginal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center gap-2 border border-white/10 cursor-pointer active:scale-95 transition-all"
                    >
                      <Eye className="h-4 w-4" />
                      <span>HOLD ORIGINAL</span>
                    </button>
                  )}
                </div>

                {/* Main Image Dropzone / Canvas Container */}
                <div className="relative w-full min-h-[480px] sm:min-h-[560px] max-h-[640px] rounded-3xl bg-slate-950/90 border-2 border-dashed border-slate-700/80 flex items-center justify-center overflow-hidden shadow-2xl">
                  {userImageSrc ? (
                    <canvas
                      ref={canvasRef}
                      className="max-h-[600px] w-auto max-w-full object-contain rounded-2xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <Upload className="h-16 w-16 text-emerald-400/60 animate-bounce" />
                      <p className="text-white text-base font-bold">UPLOAD YOUR FULL BODY PHOTO</p>
                      <p className="text-slate-400 text-xs">Supports PNG, JPG up to 10MB</p>
                    </div>
                  )}

                  {/* AI Generating Loading Overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center space-y-3 text-emerald-400 font-mono font-bold text-base">
                      <RefreshCw className="h-10 w-10 animate-spin text-emerald-400" />
                      <span>PROCESSING AI FIT & COLOR MASK...</span>
                    </div>
                  )}
                </div>

                {/* Upload Trigger & Reset */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="py-4 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 cursor-pointer transition-all"
                  >
                    <Upload className="h-4 w-4 text-emerald-400" />
                    UPLOAD PHOTO
                  </button>

                  <button
                    onClick={handleClearPhoto}
                    className="py-4 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 cursor-pointer transition-all"
                  >
                    <RefreshCw className="h-4 w-4 text-slate-400" />
                    RESET MODEL
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Gender, Garment, Color & AI Generate */}
              <div className="lg:col-span-5 flex flex-col space-y-8 text-left pt-2">
                
                {/* Studio Header */}
                <div className="border-b border-white/10 pb-4">
                  <h2 className="font-display text-4xl font-black uppercase text-white tracking-tight">
                    AI FIT OPTIONS
                  </h2>
                  <p className="text-slate-400 text-xs font-mono mt-1">Customize your clinical apparel fit</p>
                </div>

                {/* Option 1: Gender Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                    1. GENDER
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Men', 'Women', 'Unisex'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`py-4 px-3 rounded-2xl border text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          gender === g
                            ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg font-black scale-105'
                            : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-slate-600'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Option 2: Apparel Style */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                    2. APPAREL STYLE
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedGarment('set')}
                      className={`py-4 px-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedGarment === 'set'
                          ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg font-black scale-105'
                          : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-slate-600'
                      }`}
                    >
                      FULL 2-PIECE SET
                    </button>

                    <button
                      onClick={() => setSelectedGarment('top')}
                      className={`py-4 px-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedGarment === 'top'
                          ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg font-black scale-105'
                          : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-slate-600'
                      }`}
                    >
                      SCRUB TOP ONLY
                    </button>
                  </div>
                </div>

                {/* Option 3: Color Palette Swatches */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      3. SCRUB COLOR
                    </label>
                    <span className="text-xs font-bold text-emerald-400 font-mono uppercase">
                      {selectedColor.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {COLOR_SWATCHES.map((swatch) => (
                      <button
                        key={swatch.name}
                        onClick={() => setSelectedColor(swatch)}
                        className={`flex flex-col items-center gap-2 p-2.5 rounded-2xl border transition-all cursor-pointer ${
                          selectedColor.name === swatch.name
                            ? 'border-emerald-400 bg-emerald-950/60 ring-2 ring-emerald-400/40 scale-105'
                            : 'border-white/5 bg-slate-900/80 hover:border-slate-600'
                        }`}
                      >
                        <span
                          className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center shadow-md"
                          style={{ backgroundColor: swatch.hex }}
                        >
                          {selectedColor.name === swatch.name && <Check className="h-4 w-4 text-white" />}
                        </span>
                        <span className="text-[10px] font-bold text-slate-200 truncate w-full text-center">
                          {swatch.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Option 4: AI Generate Button */}
                <div className="pt-4 space-y-4">
                  <button
                    onClick={handleGenerateClick}
                    className="w-full py-6 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-display font-black text-2xl uppercase tracking-wider flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-2xl shadow-emerald-500/30 cursor-pointer"
                  >
                    <Sparkles className="h-7 w-7 text-black" />
                    <span>GENERATE AI LOOK</span>
                  </button>

                  {isGenerated && (
                    <button
                      onClick={handleDownload}
                      className="w-full py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 cursor-pointer transition-all"
                    >
                      <Download className="h-4 w-4 text-emerald-400" />
                      <span>DOWNLOAD TRY-ON IMAGE</span>
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
