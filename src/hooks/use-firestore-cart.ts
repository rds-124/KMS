'use client';

import { useMemo, useCallback } from 'react';
import {
  collection,
  doc,
  query,
  where,
  DocumentReference,
} from 'firebase/firestore';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import {
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';
import { products as allProducts, type Product } from '@/lib/products';

// Define the shape of a cart item document as stored in Firestore
export interface FirestoreCartItem {
  id: string; // Firestore document ID
  productId: string;
  quantity: number;
}

// Define the shape of a cart item for use in the application, with the full product details
export interface AppCartItem {
  id: string; // Firestore document ID
  product: Product;
  quantity: number;
}

/**
 * A custom hook to manage a user's shopping cart stored in Firestore.
 * It provides real-time cart data and functions to modify the cart.
 */
export const useFirestoreCart = () => {
  const { user } = useUser();
  const firestore = useFirestore();

  // Create a memoized reference to the user's cart collection.
  // This query will only be re-created if the user's ID changes.
  const cartCollectionRef = useMemoFirebase(() => {
    if (user) {
      return collection(firestore, `users/${user.uid}/cart`);
    }
    return null; // No user, no collection
  }, [firestore, user]);

  // Use the useCollection hook to get real-time updates from the cart collection.
  const { data: firestoreCartItems, isLoading } = useCollection<FirestoreCartItem>(cartCollectionRef);

  // Memoize the application-friendly cart items.
  // This combines the Firestore data with the static product data from /lib/products.
  const cartItems: AppCartItem[] = useMemo(() => {
    if (!firestoreCartItems) {
      return [];
    }
    return firestoreCartItems
      .map(item => {
        const product = allProducts.find(p => p.sku === item.productId);
        if (product) {
          return {
            id: item.id,
            product,
            quantity: item.quantity,
          };
        }
        return null;
      })
      .filter((item): item is AppCartItem => item !== null);
  }, [firestoreCartItems]);


  // Calculate the total number of items in the cart.
  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  // Calculate the total price of all items in the cart.
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.product.sale_price ?? item.product.price;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  /**
   * Adds a product to the cart. If the product is already in the cart,
   * it updates the quantity.
   * @param product The product object to add.
   * @param quantity The quantity to add. Defaults to 1.
   */
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    if (!cartCollectionRef) return; // Guard against no user

    const existingItem = cartItems.find(item => item.product.sku === product.sku);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      const itemDocRef = doc(cartCollectionRef, existingItem.id);
      updateDocumentNonBlocking(itemDocRef, { quantity: newQuantity });
    } else {
      addDocumentNonBlocking(cartCollectionRef, {
        productId: product.sku,
        quantity: quantity,
      });
    }
  }, [cartCollectionRef, cartItems]);
  
  /**
   * Updates the quantity of an item in the cart.
   * If the quantity is set to 0 or less, the item is removed.
   * @param cartItemId The Firestore document ID of the cart item.
   * @param quantity The new quantity.
   */
  const updateCartItemQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (!cartCollectionRef) return;
    const itemDocRef = doc(cartCollectionRef, cartItemId);

    if (quantity > 0) {
      updateDocumentNonBlocking(itemDocRef, { quantity });
    } else {
      deleteDocumentNonBlocking(itemDocRef);
    }
  }, [cartCollectionRef]);


  /**
   * Retrieves a specific cart item by product SKU.
   * @param sku The SKU of the product.
   * @returns The cart item if found, otherwise undefined.
   */
  const getCartItem = useCallback((sku: string): AppCartItem | undefined => {
    return cartItems.find(item => item.product.sku === sku);
  }, [cartItems]);


  return {
    cartItems,
    isLoading,
    cartCount,
    cartTotal,
    addToCart,
    updateCartItemQuantity,
    getCartItem,
  };
};
