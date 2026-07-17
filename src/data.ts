import type { Product, Testimonial, ColorOption } from './types';

// Curated stock photos from Pexels (medical/scrub themed)
const img = (id: string, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const navy: ColorOption = { name: 'Navy', hex: '#1e2533' };
const ceilBlue: ColorOption = { name: 'Ceil Blue', hex: '#7fb2d9' };
const teal: ColorOption = { name: 'Teal', hex: '#0da39c' };
const black: ColorOption = { name: 'Black', hex: '#1a1a1a' };
const pewter: ColorOption = { name: 'Pewter', hex: '#8a8d91' };
const wine: ColorOption = { name: 'Wine', hex: '#6d1f3c' };
const white: ColorOption = { name: 'White', hex: '#f7f8fa' };
const hunterGreen: ColorOption = { name: 'Hunter Green', hex: '#1f5e3a' };
const royal: ColorOption = { name: 'Royal Blue', hex: '#1c70f0' };
const grey: ColorOption = { name: 'Graphite', hex: '#4a4f57' };

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
      'The Atlas scrub top is engineered with our signature 4-way stretch fabric and a modern tailored fit. Five functional pockets, including a dedicated instrument loop, keep essentials close without bulk.',
    fabric: '72% Recycled Polyester, 21% Rayon, 7% Spandex',
    features: ['4-Way Stretch', 'Anti-Microbial', 'Moisture-Wicking', 'Wrinkle-Resistant', '5 Pockets'],
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
      'The Nova top blends a flattering V-neckline with athletic-grade performance. Contoured side seams and a slightly cropped hem offer a modern silhouette that moves with you through every shift.',
    fabric: '72% Recycled Polyester, 21% Rayon, 7% Spandex',
    features: ['4-Way Stretch', 'Anti-Microbial', 'Moisture-Wicking', 'Wrinkle-Resistant', '4 Pockets'],
    colors: [wine, teal, navy, ceilBlue, black, royal],
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
      'A tapered-leg pant with an adjustable drawstring waist and a hidden elastic back for all-day comfort. Seven pockets, including a cargo pocket with a secure zip compartment.',
    fabric: '72% Recycled Polyester, 21% Rayon, 7% Spandex',
    features: ['4-Way Stretch', 'Moisture-Wicking', 'Wrinkle-Resistant', '7 Pockets', 'Adjustable Waist'],
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
      'A refined lab coat cut from a fluid-resistant, soil-release blend. Notched lapel, back vent, and a sculpted fit that elevates the clinical uniform without sacrificing utility.',
    fabric: '80% Polyester, 20% Cotton (Fluid-Resistant Finish)',
    features: ['Fluid-Resistant', 'Soil-Release', 'Wrinkle-Resistant', '3 Pockets', 'Back Vent'],
    colors: [white],
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
      'A coordinated top and pant in matching fabric and color. The set is built for value without compromise — the same performance knit, finished as a cohesive look.',
    fabric: '72% Recycled Polyester, 21% Rayon, 7% Spandex',
    features: ['4-Way Stretch', 'Anti-Microbial', 'Moisture-Wicking', 'Wrinkle-Resistant', 'Matching Set'],
    colors: [teal, wine, navy, black, royal],
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
      'A rugged yet refined top and pant set designed for long shifts. Reinforced seams, a structured waistband, and a full range of motion through the shoulders and knees.',
    fabric: '72% Recycled Polyester, 21% Rayon, 7% Spandex',
    features: ['4-Way Stretch', 'Anti-Microbial', 'Moisture-Wicking', 'Wrinkle-Resistant', 'Reinforced Seams'],
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
      'A sleek jogger silhouette with ribbed cuffs and a yoga-style waistband for a secure, flattering fit. Six pockets, including two hidden side seam pockets.',
    fabric: '72% Recycled Polyester, 21% Rayon, 7% Spandex',
    features: ['4-Way Stretch', 'Anti-Microbial', 'Moisture-Wicking', 'Wrinkle-Resistant', 'Yoga Waistband'],
    colors: [black, navy, teal, wine, ceilBlue],
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
      'A clean crew-neck top with a relaxed unisex cut. Built from the same performance knit with a focus on breathability and ease of movement across all body types.',
    fabric: '72% Recycled Polyester, 21% Rayon, 7% Spandex',
    features: ['4-Way Stretch', 'Anti-Microbial', 'Moisture-Wicking', 'Wrinkle-Resistant', 'Breathable Knit'],
    colors: [navy, teal, black, ceilBlue, royal, pewter],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    images: [img('4173244'), img('4173232'), img('4173251')],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Amara Okafor',
    role: 'Emergency Medicine',
    location: 'Chicago, IL',
    rating: 5,
    quote:
      'After twelve-hour shifts, these are the only scrubs that still feel like they did at hour one. The stretch is unreal and they never lose their shape.',
    avatar: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't2',
    name: 'Nurse Julian Reyes',
    role: 'ICU Registered Nurse',
    location: 'Austin, TX',
    rating: 5,
    quote:
      'The pockets are actually where I need them and the fabric repels stains I used to ruin three sets a week with. Worth every penny.',
    avatar: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't3',
    name: 'Dr. Priya Sharma',
    role: 'Pediatric Surgeon',
    location: 'Seattle, WA',
    rating: 5,
    quote:
      'I finally have scrubs that fit like they were designed for a woman, not just a smaller men\'s cut. The jogger pants are a game changer in the OR.',
    avatar: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't4',
    name: 'Marcus Bennett, PA-C',
    role: 'Physician Assistant',
    location: 'Denver, CO',
    rating: 5,
    quote:
      'I own six sets now. The color doesn\'t fade, the seams don\'t give, and I get compliments from patients and colleagues every single shift.',
    avatar: 'https://images.pexels.com/photos/2629884/pexels-photo-2629884.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export const ALL_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
export const ALL_COLORS = Array.from(
  new Map(PRODUCTS.flatMap((p) => p.colors).map((c) => [c.name, c])).values()
);
