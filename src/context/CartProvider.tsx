"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { CartItem, Product } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  removeFromCart: (sku: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.sku === product.sku);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.sku === product.sku
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock_qty) }
            : item
        );
      }
      return [...prevItems, { product, quantity: Math.min(quantity, product.stock_qty) }];
    });
  }, []);

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.product.sku !== sku);
      }
      const itemToUpdate = prevItems.find(item => item.product.sku === sku);
      if (!itemToUpdate) return prevItems;
      
      const newQuantity = Math.min(quantity, itemToUpdate.product.stock_qty);

      return prevItems.map(item =>
        item.product.sku === sku ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((sku: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.sku !== sku));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.product.sale_price ?? item.product.price;
    return total + price * item.quantity;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
