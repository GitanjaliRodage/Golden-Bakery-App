
import { Product } from './types';

export const BAKERY_MENU: Product[] = [
  {
    id: 'c1',
    name: 'Royal Velvet Cake',
    description: 'Deep red sponge with premium cream cheese frosting and gold leaf accents.',
    price: 45.00,
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324634bf6?q=80&w=600&h=400&fit=crop',
    rating: 4.9
  },
  {
    id: 'c2',
    name: 'Golden Truffle Chocolate',
    description: 'Layers of dark Belgian chocolate ganache with a hint of sea salt.',
    price: 52.00,
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&h=400&fit=crop',
    rating: 5.0
  },
  {
    id: 'i1',
    name: 'Artisan Vanilla Bean',
    description: 'Hand-churned with organic Madagascar vanilla pods.',
    price: 8.50,
    category: 'Ice Cream',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=600&h=400&fit=crop',
    rating: 4.8
  },
  {
    id: 'i2',
    name: 'Salted Caramel Swirl',
    description: 'Rich cream infused with house-made salted butter caramel.',
    price: 9.00,
    category: 'Ice Cream',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&h=400&fit=crop',
    rating: 4.7
  },
  {
    id: 'd1',
    name: 'Iced Rose Matcha',
    description: 'Premium ceremonial grade matcha with delicate rose syrup.',
    price: 6.50,
    category: 'Cold Drinks',
    image: 'https://images.unsplash.com/photo-1515823662273-0b2e5783300b?q=80&w=600&h=400&fit=crop',
    rating: 4.6
  },
  {
    id: 'd2',
    name: 'Signature Gold Cold Brew',
    description: '12-hour steeped Arabica beans topped with a hint of honey.',
    price: 5.50,
    category: 'Cold Drinks',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&h=400&fit=crop',
    rating: 4.9
  },
  {
    id: 'p1',
    name: 'Flaky Golden Croissant',
    description: 'Pure French butter layers, baked to a perfect honeycomb crunch.',
    price: 4.25,
    category: 'Pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&h=400&fit=crop',
    rating: 4.8
  }
];
