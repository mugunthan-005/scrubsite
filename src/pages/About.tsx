import { Shield, Leaf, Heart, Award, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import Image from '../components/Image';

const VALUES = [
  { Icon: Shield, title: 'Performance First', desc: 'Every fabric is lab-tested for durability, stretch, and comfort before it ever reaches a shift.' },
  { Icon: Leaf, title: 'Sustainably Made', desc: 'Our signature knit uses recycled polyester from post-consumer plastic — over 2M bottles diverted and counting.' },
  { Icon: Heart, title: 'Built by Clinicians', desc: 'Designed with input from 500+ nurses, doctors, and techs who know exactly what a uniform should do.' },
  { Icon: Award, title: 'Guaranteed Quality', desc: 'A 2-year guarantee on every seam. If it fails, we replace it. No questions, no fine print.' },
];

const STATS = [
  { value: '50K+', label: 'Professionals served' },
  { value: '1,200+', label: 'Hospitals stocked' },
  { value: '4.9★', label: 'Average rating' },
  { value: '2M+', label: 'Plastic bottles recycled' },
];

export default function About() {
  const { navigate } = useRouter();
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 opacity-30">
          <Image src="https://images.pexels.com/photos/2633202/pexels-photo-2633202.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="h-full w-full" />
          <div className="absolute inset-0 bg-ink-950/60" />
        </div>
        <div className="container-px relative py-24 lg:py-32 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-300">Our Story</p>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl lg:text-6xl text-balance">
            We make the uniform healthcare deserves
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-300 leading-relaxed">
            BRAND_NAME was founded by a team who watched their loved ones come home from double shifts in scrubs that pilled, faded, and fell apart. We knew there had to be a better way.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container-px -mt-12 relative z-10">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-8 shadow-lift ring-1 ring-ink-100 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-brand-700 sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs text-ink-600 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-px py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">What We Stand For</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Four principles, no compromises</h2>
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
            <Image src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Medical professional in scrubs" className="h-full w-full" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">Our Mission</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl text-balance">
              Comfort is not a luxury on a twelve-hour shift
            </h2>
            <p className="mt-5 text-ink-700 leading-relaxed">
              We believe the people who care for us deserve a uniform that cares for them. That's why we obsess over every seam, every pocket, and every fiber — so the only thing you have to think about is your patient.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              From the recycled fibers in our fabric to the reinforced bartacks at every stress point, every decision starts with one question: will this make a healthcare worker's day better?
            </p>
            <button onClick={() => navigate('/shop')} className="btn-primary mt-8">
              Shop Our Scrubs
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
