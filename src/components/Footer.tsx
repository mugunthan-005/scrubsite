import { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

const FOOTER_LINKS = {
  Shop: [
    { label: "Men's Scrubs", path: '/shop?gender=Men' },
    { label: "Women's Scrubs", path: '/shop?gender=Women' },
    { label: 'Lab Coats', path: '/shop?category=Lab+Coats' },
    { label: 'New Arrivals', path: '/shop?new=1' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/about' },
    { label: 'Sustainability', path: '/about' },
  ],
  Support: [
    { label: 'Shipping & Returns', path: '/contact' },
    { label: 'Size Guide', path: '/contact' },
    { label: 'FAQ', path: '/contact' },
    { label: 'Track Order', path: '/contact' },
  ],
};

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Twitter, label: 'Twitter', href: '#' },
  { Icon: Facebook, label: 'Facebook', href: '#' },
  { Icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#020B0F] text-[#CBD7D7] border-t border-[#CBD7D7]/15">
      {/* Newsletter */}
      <div>
        <div className="container-px py-14 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-2xl text-[#F0F5F5] sm:text-3xl">
              Join the healthcare professionals who never settle
            </h3>
            <p className="mt-2 text-[#7E969B] max-w-md">
              Get early access to new collections, exclusive offers, and 10% off your first order.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex w-full max-w-md gap-2 lg:ml-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hospital.com"
              className="flex-1 rounded-full border border-[#CBD7D7]/20 bg-white/5 px-5 py-3 text-[#F0F5F5] placeholder:text-[#7E969B] focus:border-[#38A7B8] focus:outline-none focus:ring-4 focus:ring-[#38A7B8]/20"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
        {subscribed && (
          <div className="container-px pb-6 -mt-6 text-sm text-[#38A7B8] animate-fade-in font-medium">
            You're in. Check your inbox for a welcome offer.
          </div>
        )}
      </div>

      {/* Links */}
      <div className="container-px py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 border-t border-[#CBD7D7]/10">
        <div className="lg:col-span-2">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 text-xl font-extrabold tracking-wider text-[#F0F5F5]">
            <img
              src="/zyna-logo.jpg"
              alt="ZYNA Logo"
              className="h-9 w-9 rounded-lg object-cover ring-1 ring-[#38A7B8]/40"
            />
            <span className="font-display tracking-widest">ZYNA</span>
          </button>
          <p className="mt-4 text-sm text-[#7E969B] max-w-xs leading-relaxed">
            Engineered for clinical performance. Featuring 92% Polyester & 8% Spandex knitted fabric (200-220 GSM), 4-way stretch, antimicrobial protection, and fluid repellent finish.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-[#CBD7D7] transition hover:bg-[#38A7B8] hover:text-[#041117]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-sm font-semibold text-[#F0F5F5] uppercase tracking-wider">{heading}</h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-[#7E969B] hover:text-[#38A7B8] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#CBD7D7]/10">
        <div className="container-px py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E969B]">
          <p>© {new Date().getFullYear()} ZYNA Medical Wear. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-[#CBD7D7] transition-colors">Privacy Policy</button>
            <button className="hover:text-[#CBD7D7] transition-colors">Terms of Service</button>
            <button className="hover:text-[#CBD7D7] transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
