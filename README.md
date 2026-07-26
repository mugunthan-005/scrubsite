# ZYNEX — Premium Medical Scrubs

A premium e-commerce and showcase website for **ZYNEX** medical scrubs, built with React, TypeScript, and Tailwind CSS.

> **Fabric Specification:** Sample A | 92% Polyester, 8% Spandex | 200-220 GSM | Knitted fabric | Preferred Color: Navy Blue | Finish: Antimicrobial, Fluid Repellent, Wrinkle-Free, 4-Way Stretch

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS 3 (custom design system: clinical blues, teals, slate grays)
- **Icons:** Lucide React
- **State:** React Context API (Cart + lightweight hash Router)
- **Fonts:** Inter (body) + Playfair Display (headings) via Google Fonts
- **Images:** Stock photos from Pexels (referenced by URL, not downloaded)

## Features

### Pages
- **Home** — Hero, "Why Choose Us" feature grid, Featured Collections, Best Sellers, Testimonial slider, CTA
- **Shop** — Product grid with sidebar filtering (Gender, Category, Size, Color, New Arrivals) + sorting (Price, Best Sellers)
- **Product Detail** — Image gallery with hover-zoom, color swatches, size selector, quantity, Add to Cart, related products, fabric specs
- **Collections** — Men's, Women's, and New Arrivals curated edits
- **About** — Brand story, values, stats, mission
- **Contact** — Contact cards, validated message form, FAQ accordion
- **Account** — Sign-in prompt + quick links (showcase)
- **Checkout** — Multi-step (Shipping → Payment → Review → Confirmation) with client-side validation
- **Cart Drawer** — Slide-out cart with quantity controls, remove, subtotal, persistence via localStorage

### E-commerce Logic
- Add/remove items, update quantities, auto-merge by product+color+size
- Cart persists across reloads (localStorage)
- Dynamic cart counter in navbar
- Subtotal, shipping (free over $75), tax, and total calculations
- Checkout form validation (email, ZIP, phone, card number, expiry, CVC)

### Design
- Mobile-first, fully responsive (mobile, tablet, desktop)
- Sticky navbar with scroll-aware backdrop blur
- Animations: fade-up, scale-in, slide-in, shimmer skeletons, hover micro-interactions
- Accessible: keyboard-navigable, aria labels, focus rings, semantic HTML
- 6+ color ramps (brand, teal, accent, ink/neutrals, success, warning, error)

## Mock Data

8 premium scrub products across Men's, Women's, and Unisex — varying in color, size, category (Tops, Pants, Lab Coats, Sets), with ratings, reviews, discounts, and best-seller/new-arrival flags. See `src/data.ts`.

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (runs automatically in this environment)
npm run dev

# Build for production
npm run build

# Type-check
npm run typecheck
```

## Project Structure

```
src/
├── components/      # Reusable UI (Navbar, Footer, CartDrawer, ProductCard, Image, Rating)
├── context/         # CartContext, RouterContext (hash-based)
├── pages/           # Home, Shop, ProductDetail, Checkout, About, Contact, Collections, Account
├── types.ts         # TypeScript interfaces
├── data.ts          # Mock products + testimonials
├── App.tsx          # Router + providers
└── index.css        # Tailwind layers + component classes
```

## Backend Note

This is a frontend showcase with mock data and a client-side checkout simulator (no real payments are processed). The architecture is structured to pair cleanly with a MERN backend (Node.js + Express + MongoDB, MVC) or Supabase when persistence is needed — the `types.ts` interfaces map directly to API response shapes.

## Rebranding

Replace `BRAND_NAME` everywhere:
```bash
grep -rl "BRAND_NAME" src/ index.html | xargs sed -i 's/BRAND_NAME/YourBrand/g'
```
