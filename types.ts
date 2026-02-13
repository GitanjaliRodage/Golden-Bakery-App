
export type Category = 'Cakes' | 'Ice Cream' | 'Cold Drinks' | 'Pastries';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  image?: string;
}
