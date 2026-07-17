import { useState } from 'react';
import { Check, ChevronLeft, CreditCard, Truck, ShoppingBag, Lock, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';

type Step = 0 | 1 | 2 | 3; // shipping, payment, review, confirmation

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const EMPTY: FormData = {
  email: '', firstName: '', lastName: '', address: '', apt: '', city: '', state: '', zip: '',
  phone: '', cardName: '', cardNumber: '', expiry: '', cvc: '',
};

const STEPS = [
  { label: 'Shipping', Icon: Truck },
  { label: 'Payment', Icon: CreditCard },
  { label: 'Review', Icon: ShoppingBag },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { navigate } = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [orderId, setOrderId] = useState('');

  if (items.length === 0 && step < 3) {
    return (
      <div className="container-px py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-ink-900">Your cart is empty</h1>
        <p className="mt-2 text-ink-600">Add some scrubs before checking out.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary mt-6">Browse Shop</button>
      </div>
    );
  }

  const shipping = subtotal >= 75 ? 0 : 7.95;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  const set = (k: keyof FormData, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validateShipping = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!/\S+@\S+\.\S+/.test(data.email)) e.email = 'Enter a valid email.';
    if (!data.firstName.trim()) e.firstName = 'Required.';
    if (!data.lastName.trim()) e.lastName = 'Required.';
    if (!data.address.trim()) e.address = 'Required.';
    if (!data.city.trim()) e.city = 'Required.';
    if (!data.state.trim()) e.state = 'Required.';
    if (!/^\d{5}(-\d{4})?$/.test(data.zip)) e.zip = 'Enter a valid ZIP.';
    if (!/^[\d\s()+-]{10,}$/.test(data.phone)) e.phone = 'Enter a valid phone.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.cardName.trim()) e.cardName = 'Required.';
    if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(data.cardNumber)) e.cardNumber = 'Enter a 16-digit card number.';
    if (!/^\d{2}\/\d{2}$/.test(data.expiry)) e.expiry = 'MM/YY.';
    if (!/^\d{3,4}$/.test(data.cvc)) e.cvc = '3-4 digits.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validateShipping()) return;
    if (step === 1 && !validatePayment()) return;
    if (step === 2) {
      setOrderId(`BRN-${Date.now().toString().slice(-8)}`);
      clearCart();
      setStep(3);
      return;
    }
    setStep((s) => (s + 1) as Step);
  };

  const back = () => setStep((s) => Math.max(0, s - 1) as Step);

  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const Field = ({
    name, label, type = 'text', placeholder, autoComplete, maxLength,
  format,
  }: {
    name: keyof FormData; label: string; type?: string; placeholder?: string;
    autoComplete?: string; maxLength?: number; format?: (v: string) => string;
  }) => (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        value={data[name]}
        onChange={(e) => set(name, format ? format(e.target.value) : e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        className={`input ${errors[name] ? 'border-red-500 ring-4 ring-red-500/10' : ''}`}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name]}</p>}
    </div>
  );

  if (step === 3) {
    return (
      <div className="container-px py-20 lg:py-32">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-teal-50 text-teal-500 animate-scale-in">
            <CheckCircle2 size={44} />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-ink-900">Order confirmed!</h1>
          <p className="mt-3 text-ink-600">
            Thank you, {data.firstName}. Your order <span className="font-semibold text-ink-900">{orderId}</span> is being prepared.
            A confirmation has been sent to {data.email}.
          </p>
          <div className="mt-8 rounded-2xl bg-ink-50 p-6 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-ink-600">Order total</span>
              <span className="font-bold text-ink-900">${total.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-ink-600">Shipping to</span>
              <span className="font-medium text-ink-900">{data.city}, {data.state}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-ink-600">Estimated delivery</span>
              <span className="font-medium text-ink-900">3-5 business days</span>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="btn-primary mt-8">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink-50/40 min-h-screen">
      <div className="container-px py-8 lg:py-12">
        <button onClick={() => navigate('/shop')} className="mb-6 flex items-center gap-1 text-sm text-ink-600 hover:text-ink-900">
          <ChevronLeft size={16} /> Continue shopping
        </button>

        <h1 className="font-display text-3xl font-bold text-ink-900">Checkout</h1>

        {/* Stepper */}
        <div className="mt-6 flex items-center gap-2 sm:gap-4">
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={s.label} className="flex flex-1 items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition-colors ${
                      done ? 'bg-teal-500 text-white' : active ? 'bg-brand-700 text-white' : 'bg-ink-200 text-ink-500'
                    }`}
                  >
                    {done ? <Check size={16} /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium ${active ? 'text-ink-900' : 'text-ink-500'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px flex-1 ${done ? 'bg-teal-500' : 'bg-ink-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <div className="card p-6 sm:p-8">
            {step === 0 && (
              <div className="space-y-5 animate-fade-in">
                <h2 className="text-lg font-semibold text-ink-900">Shipping information</h2>
                <Field name="email" label="Email address" type="email" placeholder="you@hospital.com" autoComplete="email" />
                <div className="grid grid-cols-2 gap-4">
                  <Field name="firstName" label="First name" autoComplete="given-name" />
                  <Field name="lastName" label="Last name" autoComplete="family-name" />
                </div>
                <Field name="address" label="Street address" placeholder="123 Hospital Ave" autoComplete="address-line1" />
                <Field name="apt" label="Apartment, suite, etc. (optional)" autoComplete="address-line2" />
                <div className="grid grid-cols-3 gap-4">
                  <Field name="city" label="City" autoComplete="address-level2" />
                  <Field name="state" label="State" placeholder="IL" autoComplete="address-level1" maxLength={2} />
                  <Field name="zip" label="ZIP" placeholder="60601" autoComplete="postal-code" maxLength={10} />
                </div>
                <Field name="phone" label="Phone" type="tel" placeholder="(312) 555-0100" autoComplete="tel" />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-ink-900">Payment details</h2>
                  <span className="flex items-center gap-1.5 text-xs text-ink-500">
                    <Lock size={13} /> Secure & encrypted
                  </span>
                </div>
                <Field name="cardName" label="Name on card" autoComplete="cc-name" />
                <Field
                  name="cardNumber"
                  label="Card number"
                  placeholder="4242 4242 4242 4242"
                  autoComplete="cc-number"
                  format={formatCard}
                  maxLength={19}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    name="expiry"
                    label="Expiry (MM/YY)"
                    placeholder="12/27"
                    autoComplete="cc-exp"
                    format={formatExpiry}
                    maxLength={5}
                  />
                  <Field
                    name="cvc"
                    label="CVC"
                    placeholder="123"
                    autoComplete="cc-csc"
                    maxLength={4}
                  />
                </div>
                <div className="rounded-xl bg-ink-50 p-4 text-sm text-ink-600">
                  This is a simulator. No real payment is processed. Use any 16-digit number.
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-semibold text-ink-900">Review your order</h2>
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-xl bg-ink-50 p-3">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ink-900 truncate">{item.name}</p>
                        <p className="text-xs text-ink-500">{item.color} · {item.size} · Qty {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                {/* Shipping summary */}
                <div className="rounded-xl border border-ink-200 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-ink-900">Shipping to</h3>
                    <button onClick={() => setStep(0)} className="text-xs font-medium text-brand-700">Edit</button>
                  </div>
                  <p className="mt-2 text-sm text-ink-700">
                    {data.firstName} {data.lastName}<br />
                    {data.address} {data.apt && `, ${data.apt}`}<br />
                    {data.city}, {data.state} {data.zip}<br />
                    {data.email} · {data.phone}
                  </p>
                </div>
                {/* Payment summary */}
                <div className="rounded-xl border border-ink-200 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-ink-900">Payment</h3>
                    <button onClick={() => setStep(1)} className="text-xs font-medium text-brand-700">Edit</button>
                  </div>
                  <p className="mt-2 text-sm text-ink-700">
                    {data.cardName}<br />
                    •••• •••• •••• {data.cardNumber.slice(-4)} · Exp {data.expiry}
                  </p>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button onClick={back} className="btn-ghost">
                  <ChevronLeft size={18} /> Back
                </button>
              ) : <span />}
              <button onClick={next} className="btn-primary px-8">
                {step === 2 ? 'Place Order' : 'Continue'}
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h3 className="font-semibold text-ink-900">Order summary</h3>
              <ul className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative h-14 w-14 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full rounded-lg object-cover" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink-900 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-ink-900 truncate">{item.name}</p>
                      <p className="text-xs text-ink-500">{item.color} · {item.size}</p>
                    </div>
                    <span className="text-xs font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
                <div className="flex justify-between text-ink-600">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-ink-100 pt-3 text-base font-bold text-ink-900">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
