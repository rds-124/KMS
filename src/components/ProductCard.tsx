"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFirestoreCart } from "@/hooks/use-firestore-cart";
import type { Product } from "@/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Plus, Minus } from "lucide-react";
import { useUser } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { useAuth } from "@/firebase";


type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const auth = useAuth();
  const { user } = useUser();
  const { getCartItem, addToCart, updateCartItemQuantity } = useFirestoreCart();
  
  const cartItem = getCartItem(product.sku);

  const productImage = PlaceHolderImages && PlaceHolderImages.find(p => p.id === product.images[0]);
  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;
  
  const isOutOfStock = product.stock_status === 'outofstock';

  const handleInitialAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
        initiateAnonymousSignIn(auth);
    }
    addToCart(product);
  };
  
  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
        const newQuantity = cartItem.quantity + 1;
        if (newQuantity <= product.stock_qty) {
            updateCartItemQuantity(cartItem.id, newQuantity);
        }
    }
  };
  
  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
        const newQuantity = cartItem.quantity - 1;
        updateCartItemQuantity(cartItem.id, newQuantity); // The hook handles deletion if quantity is <= 0
    }
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col">
      <Link href={`/product/${product.sku}`} className="block flex-grow">
        <CardContent className="p-0">
          <div className="relative">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={product.title}
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
                data-ai-hint={productImage.imageHint}
              />
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2">{discount}% OFF</Badge>
            )}
             {isOutOfStock && (
              <Badge variant="secondary" className="absolute top-2 right-2">Out of Stock</Badge>
            )}
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-sm md:text-base min-h-[2.5rem] md:min-h-[2.75rem] line-clamp-2">{product.title}</h3>
            <p className="text-muted-foreground text-sm">{product.weight}</p>
            <div className="flex items-baseline gap-2">
              <p className={`font-bold text-base md:text-lg ${product.sale_price ? 'text-primary' : ''} inline-flex items-baseline price`}>
                ₹{product.sale_price ?? product.price}
              </p>
              {product.sale_price && (
                <p className="text-xs md:text-sm text-muted-foreground mrp">
                  ₹{product.price}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        {isOutOfStock ? (
           <Button className="w-full" disabled variant="outline">
              Out of Stock
          </Button>
        ) : cartItem && cartItem.quantity > 0 ? (
          <div className="flex items-center justify-center bg-green-600 text-white rounded-full h-10">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-green-700 hover:text-white rounded-full" onClick={decrementQuantity} aria-label="Decrease quantity">
              <Minus className="h-5 w-5" />
            </Button>
            <span className="font-bold text-base w-8 text-center tabular-nums">{cartItem.quantity}</span>
             <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-green-700 hover:text-white rounded-full" onClick={incrementQuantity} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock_qty}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        ) : (
            <Button 
                className="w-full h-10 rounded-full text-lg font-bold"
                variant="outline"
                onClick={handleInitialAdd}
            >
                +
            </Button>
        )}
      </div>
    </Card>
  );
}
