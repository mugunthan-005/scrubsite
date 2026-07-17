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
    <footer className="mt-24 bg-ink-950 text-ink-200">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-px py-14 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-2xl text-white sm:text-3xl">
              Join the healthcare professionals who never settle
            </h3>
            <p className="mt-2 text-ink-400 max-w-md">
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
              className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white placeholder:text-ink-500 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/20"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
        {subscribed && (
          <div className="container-px pb-6 -mt-6 text-sm text-teal-300 animate-fade-in">
            You're in. Check your inbox for a welcome offer.
          </div>
        )}
      </div>

      {/* Links */}
      <div className="container-px py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c-1.5 0-2.5 1-2.5 2.5V9H6v3h3.5v10h5V12H18V9h-3.5V4.5C14.5 3 13.5 2 12 2z" />
              </svg>
            </span>
            BRAND_NAME
          </button>
          <p className="mt-4 text-sm text-ink-400 max-w-xs">
            Premium medical scrubs engineered for the people who keep the world healthy. Made with recycled fibers and built for the longest shift.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-ink-300 transition hover:bg-brand-600 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{heading}</h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-ink-400 hover:text-white transition-colors"
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
      <div className="border-t border-white/10">
        <div className="container-px py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
          <p>© {new Date().getFullYear()} BRAND_NAME. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-ink-200 transition-colors">Privacy Policy</button>
            <button className="hover:text-ink-200 transition-colors">Terms of Service</button>
            <button className="hover:text-ink-200 transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
