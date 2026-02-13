
import React, { useState, useMemo } from 'react';
import { ShoppingCart, Menu as MenuIcon, X, Search, IceCream, Coffee, Cake, Croissant, ChevronRight, Sparkles } from 'lucide-react';
import { Product, CartItem, Category } from './types';
import { BAKERY_MENU } from './constants';
import { ProductCard } from './components/ProductCard';
import { ChatBot } from './components/ChatBot';
import { AICakeDesigner } from './components/AICakeDesigner';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDesignerOpen, setIsDesignerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return BAKERY_MENU.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 golden-gradient rounded-xl flex items-center justify-center text-white">
              <Cake className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-stone-900">
              Golden<span className="text-amber-600">Bakery</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#" className="hover:text-amber-600 transition-colors">Home</a>
            <a href="#menu" className="hover:text-amber-600 transition-colors">Menu</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Our Story</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Locations</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search treats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-stone-100 rounded-full text-sm border-none focus:ring-2 focus:ring-amber-500 w-48 transition-all"
              />
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-stone-900 text-white rounded-full hover:bg-amber-600 transition-all shadow-lg shadow-stone-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center overflow-hidden bg-stone-900">
          <img 
            src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=2000&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 px-4 py-2 rounded-full text-amber-400 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Voted #1 Bakery in the City
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-[1.1]">
                Exquisite <br />
                <span className="text-amber-500">Handcrafted</span> <br />
                Delights.
              </h1>
              <p className="text-lg text-stone-300 max-w-lg leading-relaxed">
                From legendary tiered cakes to artisan ice creams, we bring a touch of gold to every bite. Experience the finest ingredients baked with passion.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-amber-500 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all flex items-center gap-2"
                >
                  Order Now <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsDesignerOpen(true)}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-white hover:text-stone-900 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  AI Cake Designer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-stone-900">Explore Our Boutique Menu</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Selected with care, crafted with precision. Each item is a testament to our commitment to excellence.</p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[ 'All', 'Cakes', 'Ice Cream', 'Cold Drinks', 'Pastries' ].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all flex items-center gap-2 ${
                  activeCategory === cat 
                  ? 'bg-stone-900 text-white shadow-lg shadow-stone-200' 
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-400'
                }`}
              >
                {cat === 'Cakes' && <Cake className="w-4 h-4" />}
                {cat === 'Ice Cream' && <IceCream className="w-4 h-4" />}
                {cat === 'Cold Drinks' && <Coffee className="w-4 h-4" />}
                {cat === 'Pastries' && <Croissant className="w-4 h-4" />}
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-stone-100 rounded-3xl border-2 border-dashed border-stone-200">
              <p className="text-stone-400">No treats found matching your criteria. Try another search!</p>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="bg-stone-900 py-24">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-12">
                <Cake className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Premium Ingredients</h3>
              <p className="text-stone-400">We source only the finest organic flour, Belgian chocolate, and seasonal fruits for our creations.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-stone-700 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold">AI Personalized</h3>
              <p className="text-stone-400">Use our AI tools to visualize your dream cake or get personalized recommendations from Goldie.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Daily Freshness</h3>
              <p className="text-stone-400">Everything is baked fresh every morning to ensure you get that perfect crunch and melt-in-your-mouth texture.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-stone-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 golden-gradient rounded-lg flex items-center justify-center text-white">
              <Cake className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">
              Golden<span className="text-amber-600">Bakery</span>
            </span>
          </div>
          <p className="text-stone-500 text-sm mb-8">© 2024 Golden Bakery. Crafted with love and artificial intelligence.</p>
          <div className="flex justify-center gap-6 text-stone-400">
            <a href="#" className="hover:text-amber-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Facebook</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-800">Your Basket</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-stone-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-10 h-10 text-stone-300" />
                  </div>
                  <p className="text-stone-500">Your basket is empty. Start shopping!</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-stone-800">{item.name}</h4>
                      <p className="text-amber-600 font-bold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="font-medium text-stone-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-100"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-100 bg-stone-50 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-bold text-stone-900">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-amber-600 transition-all shadow-lg shadow-stone-200">
                  Checkout Now
                </button>
                <p className="text-center text-xs text-stone-400">Free delivery on orders over $50</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Components */}
      <ChatBot />
      <AICakeDesigner isOpen={isDesignerOpen} onClose={() => setIsDesignerOpen(false)} />
    </div>
  );
};

export default App;
