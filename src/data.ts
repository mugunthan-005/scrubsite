import type { Product, Testimonial, ColorOption } from './types';

const PUBLIC_IMAGES = [
  '/Gemini_Generated_Image_nce5j3nce5j3nce5.png',
  '/Gemini_Generated_Image_nce5j3nce5j3nce5 (1).png',
  '/Gemini_Generated_Image_nce5j3nce5j3nce5 (2).png',
  '/Gemini_Generated_Image_nce5j3nce5j3nce5 (3).png',
  '/Gemini_Generated_Image_q6oe8eq6oe8eq6oe.png',
  '/Screenshot 2026-07-26 221310.png',
  '/Screenshot 2026-07-26 221323.png',
];

const img = (id: string, _w = 800) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return PUBLIC_IMAGES[hash % PUBLIC_IMAGES.length];
};

export const BRAND_SPECIFICATION = {
  brandName: 'ZYNEX',
  fabricSample: 'Sample A',
  blend: '92% Polyester and 8% Spandex',
  gsm: '200-220 GSM',
  fabricType: 'Knitted fabric',
  preferredColor: 'Navy Blue',
  finishRequirements: [
    'Antimicrobial',
    'Fluid Repellent',
    'Wrinkle-Free',
    '4-Way Stretch',
  ],
};

const navy: ColorOption = { name: 'Navy Blue', hex: '#0B192C' };
const ceilBlue: ColorOption = { name: 'Ceil Blue', hex: '#7fb2d9' };
const teal: ColorOption = { name: 'Teal', hex: '#0da39c' };
const black: ColorOption = { name: 'Black', hex: '#1a1a1a' };
const pewter: ColorOption = { name: 'Pewter', hex: '#8a8d91' };
const wine: ColorOption = { name: 'Wine', hex: '#6d1f3c' };
const white: ColorOption = { name: 'White', hex: '#f7f8fa' };
const hunterGreen: ColorOption = { name: 'Hunter Green', hex: '#1f5e3a' };
const royal: ColorOption = { name: 'Royal Blue', hex: '#1c70f0' };
const grey: ColorOption = { name: 'Graphite', hex: '#4a4f57' };

const STANDARD_FABRIC = '92% Polyester, 8% Spandex (Sample A, 200-220 GSM Knitted Fabric)';
const STANDARD_FEATURES = ['4-Way Stretch', 'Antimicrobial', 'Fluid Repellent', 'Wrinkle-Free'];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'atlas-mens-scrub-top',
    name: 'Atlas Men\'s Performance Scrub Top',
    gender: 'Men',
    category: 'Tops',
    collection: "Men's Scrubs",
    price: 48,
    compareAt: 62,
    rating: 4.9,
    reviewCount: 312,
    bestSeller: true,
    newArrival: false,
    description:
      'The Atlas scrub top is engineered with ZYNEX 92/8 knitted fabric (200-220 GSM) featuring 4-way stretch and fluid repellent finish. Five functional pockets keep essentials close.',
    fabric: STANDARD_FABRIC,
    features: [...STANDARD_FEATURES, '5 Pockets'],
    colors: [navy, black, ceilBlue, teal, grey],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    images: [img('2629884'), img('2629877'), img('2633202')],
  },
  {
    id: 'p2',
    slug: 'nova-womens-scrub-top',
    name: 'Nova Women\'s V-Neck Scrub Top',
    gender: 'Women',
    category: 'Tops',
    collection: "Women's Scrubs",
    price: 46,
    compareAt: 58,
    rating: 4.8,
    reviewCount: 421,
    bestSeller: true,
    newArrival: true,
    description:
      'The Nova top blends a flattering V-neckline with athletic-grade ZYNEX 200-220 GSM knitted performance fabric. Antimicrobial and wrinkle-free for demanding shifts.',
    fabric: STANDARD_FABRIC,
    features: [...STANDARD_FEATURES, '4 Pockets'],
    colors: [navy, wine, teal, ceilBlue, black, royal],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [img('4173251'), img('4173244'), img('4173232')],
  },
  {
    id: 'p3',
    slug: 'meridian-scrub-pants',
    name: 'Meridian Drawstring Scrub Pants',
    gender: 'Unisex',
    category: 'Pants',
    collection: 'New Arrivals',
    price: 52,
    rating: 4.7,
    reviewCount: 198,
    bestSeller: false,
    newArrival: true,
    description:
      'A tapered-leg pant with adjustable drawstring waist cut from 200-220 GSM 92% Polyester / 8% Spandex knitted fabric. Seven pockets with fluid repellent & wrinkle-free finish.',
    fabric: STANDARD_FABRIC,
    features: [...STANDARD_FEATURES, '7 Pockets', 'Adjustable Waist'],
    colors: [navy, black, teal, pewter, hunterGreen],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    images: [img('4173270'), img('4173275'), img('4173283')],
  },
  {
    id: 'p4',
    slug: 'roundtail-lab-coat',
    name: 'Roundtail Premium Lab Coat',
    gender: 'Unisex',
    category: 'Lab Coats',
    collection: "Men's Scrubs",
    price: 74,
    compareAt: 89,
    rating: 4.9,
    reviewCount: 142,
    bestSeller: true,
    newArrival: false,
    description:
      'A refined lab coat with fluid-repellent finish, notched lapel, back vent, and sculpted fit that elevates clinical wear without sacrificing utility.',
    fabric: '92% Polyester, 8% Spandex (200-220 GSM Fluid Repellent Finish)',
    features: ['Fluid Repellent', 'Antimicrobial', 'Wrinkle-Free', '3 Pockets', 'Back Vent'],
    colors: [white, navy],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [img('4021808'), img('4021814'), img('4021820')],
  },
  {
    id: 'p5',
    slug: 'element-scrub-set',
    name: 'Element 2-Piece Scrub Set',
    gender: 'Women',
    category: 'Sets',
    collection: "Women's Scrubs",
    price: 88,
    compareAt: 110,
    rating: 4.8,
    reviewCount: 267,
    bestSeller: false,
    newArrival: true,
    description:
      'A coordinated top and pant set in ZYNEX preferred Navy Blue. Built with 200-220 GSM 92/8 knitted fabric — antimicrobial, fluid repellent, and 4-way stretch.',
    fabric: STANDARD_FABRIC,
    features: [...STANDARD_FEATURES, 'Matching Set'],
    colors: [navy, teal, wine, black, royal],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [img('4173290'), img('4173296'), img('4173302')],
  },
  {
    id: 'p6',
    slug: 'fortis-mens-scrub-set',
    name: 'Fortis Men\'s Scrub Set',
    gender: 'Men',
    category: 'Sets',
    collection: "Men's Scrubs",
    price: 92,
    compareAt: 116,
    rating: 4.7,
    reviewCount: 184,
    bestSeller: true,
    newArrival: false,
    description:
      'A rugged yet refined top and pant set designed for long shifts. 200-220 GSM knitted fabric with reinforced seams, 4-way stretch, and fluid repellent protection.',
    fabric: STANDARD_FABRIC,
    features: [...STANDARD_FEATURES, 'Reinforced Seams'],
    colors: [navy, black, ceilBlue, hunterGreen, grey],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    images: [img('2629884'), img('2633202'), img('2629877')],
  },
  {
    id: 'p7',
    slug: 'lumen-womens-scrub-pants',
    name: 'Lumen Women\'s Jogger Scrub Pants',
    gender: 'Women',
    category: 'Pants',
    collection: "Women's Scrubs",
    price: 54,
    rating: 4.9,
    reviewCount: 233,
    bestSeller: true,
    newArrival: true,
    description:
      'A sleek jogger silhouette with ribbed cuffs and yoga waistband. Made from ZYNEX 92% Poly / 8% Spandex knitted fabric (200-220 GSM) with antimicrobial and wrinkle-free technology.',
    fabric: STANDARD_FABRIC,
    features: [...STANDARD_FEATURES, 'Yoga Waistband'],
    colors: [navy, black, teal, wine, ceilBlue],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    images: [img('4173275'), img('4173283'), img('4173270')],
  },
  {
    id: 'p8',
    slug: 'horizon-unisex-scrub-top',
    name: 'Horizon Unisex Crew Scrub Top',
    gender: 'Unisex',
    category: 'Tops',
    collection: 'New Arrivals',
    price: 44,
    compareAt: 54,
    rating: 4.6,
    reviewCount: 156,
    bestSeller: false,
    newArrival: true,
    description:
      'A clean crew-neck top with relaxed unisex cut. Built from ZYNEX 200-220 GSM knitted fabric for 4-way stretch flexibility and fluid repellency.',
    fabric: STANDARD_FABRIC,
    features: [...STANDARD_FEATURES, 'Breathable Knit'],
    colors: [navy, teal, black, ceilBlue, royal, pewter],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    images: [img('4173244'), img('4173232'), img('4173251')],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Dr. Marcus Vance',
    role: 'Emergency Physician',
    hospital: 'St. Jude Medical Center',
    content:
      'The 92/8 knitted fabric is unlike any scrub I have worn in 12 years of practice. Soft, fluid repellent, and doesn’t wrinkle after a 14-hour shift.',
    rating: 5,
    avatar: '/Gemini_Generated_Image_nce5j3nce5j3nce5.png',
  },
  {
    id: 't2',
    author: 'Elena Rostova, RN',
    role: 'ICU Charge Nurse',
    hospital: 'Metro General Hospital',
    content:
      'The 4-way stretch allows complete freedom of movement when lifting patients. The fluid repellent finish saved my uniform on day one.',
    rating: 5,
    avatar: '/Gemini_Generated_Image_nce5j3nce5j3nce5 (1).png',
  },
  {
    id: 't3',
    author: 'Dr. Sarah Jenkins',
    role: 'Surgical Resident',
    hospital: 'Johns Hopkins Medicine',
    content:
      'I replaced all my old scrubs with ZYNEX. The 200-220 GSM weight strikes the perfect balance between durability and breathability.',
    rating: 5,
    avatar: '/Gemini_Generated_Image_nce5j3nce5j3nce5 (2).png',
  },
  {
    id: 't4',
    author: 'David Chen, PA-C',
    role: 'Pediatric Care',
    hospital: 'Children’s Health',
    content:
      'Clean modern lines, antimicrobial protection, and deep pockets. The Meridian pants with drawstring are my go-to every morning.',
    rating: 5,
    avatar: '/Gemini_Generated_Image_nce5j3nce5j3nce5 (3).png',
  },
];

export const ALL_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
export const ALL_COLORS = Array.from(
  new Map(PRODUCTS.flatMap((p) => p.colors).map((c) => [c.name, c])).values()
);
