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

function Routes() {
  const { path } = useRouter();

  if (path === '/' || path === '') return <Home />;
  if (path === '/shop') return <Shop />;
  if (path.startsWith('/product/')) return <ProductDetail slug={path.replace('/product/', '')} />;
  if (path === '/checkout') return <Checkout />;
  if (path === '/about') return <About />;
  if (path === '/contact') return <Contact />;
  if (path === '/collections') return <Collections />;
  if (path === '/account') return <Account />;

  return (
    <div className="container-px py-32 text-center">
      <h1 className="font-display text-4xl font-bold text-ink-900">404</h1>
      <p className="mt-2 text-ink-600">This page doesn't exist.</p>
      <a href="#/" className="btn-primary mt-6 inline-flex">Back home</a>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<div className="container-px py-32 text-center text-ink-500">Loading…</div>}>
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
