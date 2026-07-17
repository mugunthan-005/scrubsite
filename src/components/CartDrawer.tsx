import { useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const { navigate } = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const goToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const goToShop = () => {
    closeCart();
    navigate('/shop');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
      />
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-700" />
            <h2 className="text-base font-semibold text-ink-900">
              Your Cart {totalItems > 0 && <span className="text-ink-400">({totalItems})</span>}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-ink-500 hover:bg-ink-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-ink-50 text-ink-300">
              <ShoppingBag size={32} />
            </div>
            <div>
              <p className="font-semibold text-ink-900">Your cart is empty</p>
              <p className="mt-1 text-sm text-ink-500">Add some scrubs to get started.</p>
            </div>
            <button onClick={goToShop} className="btn-secondary mt-2">
              Browse the Shop
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <button
                    onClick={() => {
                      closeCart();
                      navigate(`/product/${item.slug}`);
                    }}
                    className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-ink-100 ring-1 ring-ink-100"
                  >
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </button>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-semibold text-ink-900 leading-snug">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-ink-400 hover:text-error-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-500">
                      {item.color} · Size {item.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full ring-1 ring-ink-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="grid h-8 w-8 place-items-center text-ink-600 hover:text-brand-700 disabled:opacity-40"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="grid h-8 w-8 place-items-center text-ink-600 hover:text-brand-700 disabled:opacity-40"
                          disabled={item.quantity >= 99}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-ink-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-ink-100 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-600">Subtotal</span>
              <span className="text-lg font-bold text-ink-900">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-ink-500">Shipping and taxes calculated at checkout.</p>
            <button onClick={goToCheckout} className="btn-primary w-full">
              Checkout
              <ArrowRight size={18} />
            </button>
            <button onClick={goToShop} className="btn-ghost w-full text-sm">
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
