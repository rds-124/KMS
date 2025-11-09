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
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);
  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
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
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/product/${product.sku}`} className="block">
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
             {product.stock_status === 'outofstock' && (
              <Badge variant="secondary" className="absolute top-2 right-2">Out of Stock</Badge>
            )}
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-base truncate">{product.title}</h3>
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
      <div className="px-4 pb-4">
        <Button 
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock_status === 'outofstock'}
          variant="outline"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock_status === 'outofstock' ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </Card>
  );
}
