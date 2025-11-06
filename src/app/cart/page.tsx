"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Minus, Plus } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const shippingThreshold = 799;
  const shippingCost = cartTotal >= shippingThreshold ? 0 : 50;
  const total = cartTotal + shippingCost;
  const remainingForFreeShipping = shippingThreshold - cartTotal;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-8">Your Shopping Cart</h1>
      
      {cartCount === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty.</p>
          <Button asChild>
            <Link href="/category/all">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {cartItems.map(item => {
                    const productImage = PlaceHolderImages.find(p => p.id === item.product.images[0]);
                    const price = item.product.sale_price ?? item.product.price;
                    return (
                      <div key={item.product.sku} className="flex items-center p-4 gap-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                          {productImage && (
                            <Image
                              src={productImage.imageUrl}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                              data-ai-hint={productImage.imageHint}
                            />
                          )}
                        </div>
                        <div className="flex-grow">
                          <Link href={`/product/${item.product.sku}`} className="font-semibold hover:text-primary">{item.product.title}</Link>
                          <p className="text-sm text-muted-foreground">₹{price.toFixed(2)}</p>
                          <div className="flex items-center border rounded-md w-fit mt-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.sku, item.quantity - 1)}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.sku, item.quantity + 1)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{(price * item.quantity).toFixed(2)}</p>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive mt-2" onClick={() => removeFromCart(item.product.sku)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'Free'}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                {remainingForFreeShipping > 0 && (
                    <div className="text-center text-sm text-accent bg-accent/10 p-3 rounded-md">
                        Add ₹{remainingForFreeShipping.toFixed(2)} more to get FREE shipping!
                    </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
