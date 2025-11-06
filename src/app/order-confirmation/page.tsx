import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 flex items-center justify-center">
      <Card className="max-w-lg w-full text-center p-8">
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-headline font-bold">Thank you for your order!</h1>
          <p className="text-muted-foreground">
            Your order has been placed successfully. You will receive an email confirmation shortly with your order details and tracking information once it ships.
          </p>
          <div className="pt-4">
            <Button asChild size="lg">
              <Link href="/category/all">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
