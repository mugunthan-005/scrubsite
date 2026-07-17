export type Gender = 'Men' | 'Women' | 'Unisex';
export type Category = 'Tops' | 'Pants' | 'Lab Coats' | 'Sets';

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  category: Category;
  collection: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  bestSeller: boolean;
  newArrival: boolean;
  description: string;
  fabric: string;
  features: string[];
  colors: ColorOption[];
  sizes: string[];
  images: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
}
