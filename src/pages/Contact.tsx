import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const CONTACTS = [
  { Icon: Mail, label: 'Email us', value: 'care@BRAND_NAME.com', href: 'mailto:care@BRAND_NAME.com' },
  { Icon: Phone, label: 'Call us', value: '1-800-BRAND-01', href: 'tel:18002726301' },
  { Icon: MapPin, label: 'Visit us', value: '120 Market St, Suite 400, San Francisco, CA', href: '#' },
  { Icon: MessageSquare, label: 'Live chat', value: 'Mon–Fri, 8am–8pm CT', href: '#' },
];

const FAQS = [
  { q: 'What is your return policy?', a: 'We offer 30-day free returns on all unworn items with tags attached. Return shipping is on us for orders over $75.' },
  { q: 'How do I find my size?', a: 'Our scrubs run true to size with a modern fit. Check the size guide on each product page for detailed measurements, or chat with our team for a personal recommendation.' },
  { q: 'Are your scrubs antimicrobial?', a: 'Yes. Our signature fabric features a silver-ion anti-microbial treatment that inhibits odor-causing bacteria and lasts the lifetime of the garment.' },
  { q: 'Do you offer bulk / hospital orders?', a: 'Absolutely. We offer volume pricing and custom embroidery for orders of 20+ sets. Contact care@BRAND_NAME.com for a quote.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er.name = 'Required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) er.email = 'Enter a valid email.';
    if (!form.subject.trim()) er.subject = 'Required.';
    if (!form.message.trim()) er.message = 'Required.';
    setErrors(er);
    if (Object.keys(er).length === 0) {
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-ink-50 py-16 lg:py-24">
        <div className="container-px text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-700">We're Here to Help</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink-900 sm:text-5xl text-balance">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-600">
            Questions about sizing, orders, or bulk purchases? Our team responds within one business day.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="container-px -mt-10 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACTS.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="card flex flex-col items-center gap-3 p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900">{label}</p>
                <p className="mt-1 text-xs text-ink-600">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="container-px py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Send us a message</h2>
            <p className="mt-2 text-ink-600">Fill out the form and we'll get back to you shortly.</p>
            {sent && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-teal-50 p-4 text-sm text-teal-700 animate-fade-in">
                <CheckCircle2 size={18} /> Your message has been sent. We'll be in touch soon!
              </div>
            )}
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="label">Your name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Dr. Jane Doe"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="you@hospital.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="label">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`input ${errors.subject ? 'border-red-500' : ''}`}
                  placeholder="How can we help?"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
              </div>
              <div>
                <label className="label">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`input resize-none ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Tell us more…"
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Frequently asked</h2>
            <div className="mt-6 space-y-3">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group card p-5">
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-ink-900 list-none">
                    {faq.q}
                    <span className="ml-4 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-ink-100 text-ink-600 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
