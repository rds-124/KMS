"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ShoppingCart, Plus, Minus } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const cartItem = cartItems.find(item => item.product.sku === product.sku);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  const productImage = PlaceHolderImages && PlaceHolderImages.find(p => p.id === product.images[0]);
  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;
  
  const isOutOfStock = product.stock_status === 'outofstock';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.title} has been added.`,
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= product.stock_qty) {
      setQuantity(value);
    }
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => Math.min(prev + 1, product.stock_qty));
  };
  
  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const formatPrice = (price: number) => {
    if (!isClient) {
      return `₹${price.toFixed(2)}`;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
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
            <h3 className="font-semibold text-base truncate h-6">{product.title}</h3>
            <div className="flex items-baseline gap-2">
              <p className={`font-bold text-lg ${product.sale_price ? 'text-primary' : ''} inline-flex items-baseline price`}>
                {formatPrice(product.sale_price ?? product.price)}
              </p>
              {product.sale_price && (
                <p className="text-sm text-muted-foreground mrp">
                  {formatPrice(product.price)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        {isOutOfStock ? (
           <Button 
              className="w-full"
              disabled
              variant="outline"
            >
              Out of Stock
          </Button>
        ) : cartItem ? (
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={(e) => updateQuantity(product.sku, cartItem.quantity - 1)} aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-bold text-lg w-10 text-center">{cartItem.quantity}</span>
             <Button variant="outline" size="icon" className="h-9 w-9" onClick={(e) => updateQuantity(product.sku, cartItem.quantity + 1)} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock_qty}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full"
            onClick={handleAddToCart}
            variant="outline"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  );
}
