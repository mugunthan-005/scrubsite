import { Shield, Leaf, Heart, Award, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import Image from '../components/Image';

const VALUES = [
  { Icon: Shield, title: 'Performance Engineering', desc: 'Crafted with Sample A 92% Polyester & 8% Spandex knitted fabric (200-220 GSM) engineered for demanding healthcare shifts.' },
  { Icon: Leaf, title: 'Fluid & Antimicrobial Shield', desc: 'Advanced finish requirements provide fluid repellency, antimicrobial protection, wrinkle resistance, and 4-way stretch.' },
  { Icon: Heart, title: 'Built for Clinicians', desc: 'Designed in our signature preferred Navy Blue with input from 500+ nurses, doctors, and tech professionals.' },
  { Icon: Award, title: 'Guaranteed Quality', desc: 'A 2-year guarantee on every seam and finish. If it fails, we replace it immediately.' },
];

const STATS = [
  { value: '200-220', label: 'GSM Knitted Fabric' },
  { value: '92 / 8', label: '% Poly & Spandex Blend' },
  { value: '4-Way', label: 'Stretch & Fluid Repellent' },
  { value: 'Navy Blue', label: 'Signature Preferred Color' },
];

export default function About() {
  const { navigate } = useRouter();
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 opacity-30">
          <Image src="/Gemini_Generated_Image_nce5j3nce5j3nce5 (3).png" alt="" className="h-full w-full" />
          <div className="absolute inset-0 bg-ink-950/60" />
        </div>
        <div className="container-px relative py-24 lg:py-32 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">Our Story</p>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl lg:text-6xl text-balance">
            ZYNEX — The standard healthcare deserves
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-300 leading-relaxed">
            ZYNEX was founded to solve clinical apparel challenges. We engineered Sample A: a premium 92% Polyester / 8% Spandex knitted fabric (200-220 GSM) with antimicrobial, fluid repellent, wrinkle-free, and 4-way stretch performance.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container-px -mt-12 relative z-10">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-8 shadow-lift ring-1 ring-ink-100 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-brand-700 sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs text-ink-600 sm:text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-px py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">What We Stand For</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Four pillars of ZYNEX innovation</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, desc }, i) => (
            <div key={title} className="card p-6 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-semibold text-ink-900">{title}</h3>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/Gemini_Generated_Image_q6oe8eq6oe8eq6oe.png" alt="Medical professional in scrubs" className="h-full w-full" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">Our Mission</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
              Comfort is not a luxury on a twelve-hour shift
            </h2>
            <p className="mt-5 text-ink-700 leading-relaxed">
              We believe medical professionals deserve uniforms engineered to the highest standard. That's why ZYNEX developed our signature 200-220 GSM knitted fabric blend — giving you total confidence with fluid repellency, antimicrobial shield, and 4-way stretch.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Available in preferred Navy Blue and signature clinical tones, every ZYNEX garment is built to empower healthcare workers.
            </p>
            <button onClick={() => navigate('/shop')} className="btn-primary mt-8">
              Shop ZYNEX Scrubs
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
