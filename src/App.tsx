import { Suspense } from 'react';
import { CartProvider } from './context/CartContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Collections from './pages/Collections';
import Account from './pages/Account';
import AdminDashboard from './pages/AdminDashboard';
import FuzzyText from './components/FuzzyText';
import SideRays from './components/SideRays';
import Particles from './components/Particles';

function Routes() {
  const { path, navigate } = useRouter();

  if (path === '/' || path === '') return <Home />;
  if (path === '/shop') return <Shop />;
  if (path.startsWith('/product/')) return <ProductDetail slug={path.replace('/product/', '')} />;
  if (path === '/checkout') return <Checkout />;
  if (path === '/about') return <About />;
  if (path === '/contact') return <Contact />;
  if (path === '/collections') return <Collections />;
  if (path === '/account') return <Account />;
  if (path === '/admin') return <AdminDashboard />;

  return (
    <div className="relative min-h-[85vh] bg-[#040D1A] text-white flex flex-col items-center justify-center py-20 px-4 text-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <SideRays
          speed={2}
          rayColor1="#0DA39C"
          rayColor2="#38BDF8"
          intensity={1.8}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.4}
          blend={0.7}
          falloff={1.5}
          opacity={0.8}
        />
        <div className="absolute inset-0">
          <Particles
            particleColors={['#2DD4BF', '#38BDF8', '#5EEAD4']}
            particleCount={150}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={90}
            moveParticlesOnHover={true}
            alphaParticles={true}
          />
        </div>
      </div>

      {/* FuzzyText Coming Soon Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.6}
          enableHover={true}
          color="#2DD4BF"
          fontSize="clamp(2.5rem, 8vw, 7rem)"
          fontWeight={900}
          fuzzRange={25}
          clickEffect={true}
        >
          COMING SOON
        </FuzzyText>
        
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-md leading-relaxed drop-shadow-md">
          This ZYNEX medical apparel collection and interactive feature is currently under active development.
        </p>

        <button
          onClick={() => navigate('/')}
          className="btn-primary mt-8 rounded-none bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/25 px-8 py-3.5 border-0 transition-all cursor-pointer"
        >
          Return To Home
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col relative">
          <Navbar />
          <main className="flex-1 relative">
            <Suspense fallback={<div className="container-px py-32 text-center text-slate-400">Loading…</div>}>
              <Routes />
            </Suspense>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </RouterProvider>
  );
}
