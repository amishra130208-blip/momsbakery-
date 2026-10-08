"use client";

import React, { useState } from 'react';
import { bakeryData } from '@/data/bakeryData';
import { useCart } from '@/context/CartContext';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("cakes");
  const { cart, addToCart, removeFromCart, totalItems, totalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = bakeryData.products.filter(p => p.categoryId === selectedCategory);

  const sendWhatsAppOrder = () => {
    let message = "Hello Mom's Bakery, I would like to place an order:\n\n";
    cart.forEach(item => {
      message += `- ${item.product.name} ${item.variant.label ? `(${item.variant.label})` : ''} x ${item.quantity} = ₹${item.variant.price * item.quantity}\n`;
    });
    message += `\nTotal: ₹${totalPrice}\n\nPlease confirm my order!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918382084622?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1E1A] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur border-b border-[#2C1E1A]/10 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-wide">Mom&apos;s Bakery</h1>
          <p className="text-xs text-[#2C1E1A]/70">100% Eggless • Gorakhpur</p>
        </div>
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-[#2C1E1A] text-[#FDFBF7] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-md hover:bg-[#2C1E1A]/90 transition"
        >
          Cart ({totalItems}) - ₹{totalPrice}
        </button>
      </header>

      {/* Hero Section */}
      <section className="bg-[#2C1E1A] text-[#FDFBF7] py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Freshly Baked With Love</h2>
        <p className="text-[#FDFBF7]/80 max-w-xl mx-auto text-sm md:text-base">
          Welcome to Mom&apos;s Bakery, Gorakhpur. Indulge in our 100% eggless cakes, fresh pizzas, snacks, and combo treats delivered fresh to your doorstep!
        </p>
      </section>

      {/* Categories Bar */}
      <nav className="flex overflow-x-auto gap-3 px-6 py-4 bg-white border-b border-[#2C1E1A]/10">
        {bakeryData.categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition font-medium ${
              selectedCategory === cat.id
                ? 'bg-[#2C1E1A] text-[#FDFBF7] shadow'
                : 'bg-[#FDFBF7] text-[#2C1E1A] hover:bg-[#2C1E1A]/10'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </nav>

      {/* Products Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-[#2C1E1A]/60 py-12">No items found in this category.</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#2C1E1A]/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">{product.name}</h3>
                <p className="text-xs text-[#2C1E1A]/60 mb-4">{product.description || "Fresh & Delicious preparation."}</p>
              </div>
              <div className="space-y-3">
                {product.variants.map(variant => (
                  <div key={variant.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#2C1E1A]/80">{variant.label ? variant.label : 'Standard'}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#2C1E1A]">₹{variant.price}</span>
                      <button
                        onClick={() => addToCart(product, variant)}
                        className="bg-[#D4A373] text-[#2C1E1A] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#D4A373]/80 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#2C1E1A]/10 pb-4 mb-4">
              <h3 className="text-xl font-serif font-bold">Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-[#2C1E1A] font-bold text-lg">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-[#2C1E1A]/60 py-12">Your cart is empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.product.id + item.variant.id} className="flex justify-between items-center border-b border-[#2C1E1A]/5 pb-3">
                    <div>
                      <h4 className="font-bold text-sm">{item.product.name} {item.variant.label && `(${item.variant.label})`}</h4>
                      <p className="text-xs text-[#2C1E1A]/60">₹{item.variant.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeFromCart(item.product.id, item.variant.id)} className="bg-[#2C1E1A]/10 text-[#2C1E1A] px-2 py-1 rounded text-xs font-bold">🗑️</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#2C1E1A]/10 pt-4 mt-4 space-y-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button
                  onClick={sendWhatsAppOrder}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-center hover:bg-green-700 transition shadow"
                >
                  Order via WhatsApp 📱
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#2C1E1A] text-[#FDFBF7]/70 py-8 px-6 text-center text-xs mt-12">
        <p>© 2026 Mom&apos;s Bakery, Transport Nagar, Gorakhpur. All rights reserved.</p>
      </footer>
    </div>
  );
                }
