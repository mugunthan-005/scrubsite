import { User, Package, Heart, LogOut, MapPin } from 'lucide-react';

export default function Account() {
  return (
    <div className="container-px py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-700">
            <User size={28} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink-900">Welcome back</h1>
            <p className="text-sm text-ink-600">Manage your orders, favorites, and profile.</p>
          </div>
        </div>

        {/* Sign-in prompt (demo) */}
        <div className="mt-8 card p-6">
          <h2 className="font-semibold text-ink-900">Sign in to your account</h2>
          <p className="mt-1 text-sm text-ink-600">This is a showcase demo. Authentication is not wired up.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="you@hospital.com" />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="••••••••" />
            </div>
          </div>
          <button className="btn-primary mt-4 w-full sm:w-auto">Sign In</button>
        </div>

        {/* Quick links */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { Icon: Package, title: 'Orders', desc: 'Track and review past orders' },
            { Icon: Heart, title: 'Wishlist', desc: 'Your saved scrubs' },
            { Icon: MapPin, title: 'Addresses', desc: 'Manage shipping info' },
          ].map(({ Icon, title, desc }) => (
            <button key={title} className="card flex flex-col items-start gap-2 p-5 text-left transition hover:-translate-y-1 hover:shadow-lift">
              <Icon size={22} className="text-brand-700" />
              <p className="font-semibold text-ink-900">{title}</p>
              <p className="text-xs text-ink-600">{desc}</p>
            </button>
          ))}
        </div>

        <button className="mt-6 flex items-center gap-2 text-sm text-ink-600 hover:text-red-600">
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </div>
  );
}
