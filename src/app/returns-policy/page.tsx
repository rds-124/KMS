import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, CircleX, Undo2, Banknote } from 'lucide-react';

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Returns & Exchanges Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Your satisfaction is our priority. Here's how we handle returns and exchanges.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-6 w-6 text-accent" />
                Return Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>We have a 7-day return policy for most items, which means you have 7 days after receiving your item to request a return.</p>
              <p>To be eligible for a return, your item must be in the same condition that you received it, unopened or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.</p>
              <p className="font-semibold text-foreground">Please note that perishable goods such as food items (spices, pickles, snacks) are not eligible for returns due to hygiene and safety reasons, unless the item received is damaged or incorrect.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircleX className="h-6 w-6 text-destructive" />
                Damages and Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right. Please provide a photo of the damaged or incorrect item when you contact us.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Undo2 className="h-6 w-6 text-accent" />
                How to Initiate a Return
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>To start a return, you can contact us at <a href="mailto:support@tulunadustore.com" className="text-primary hover:underline">support@tulunadustore.com</a>. If your return is accepted, we’ll send you instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-6 w-6 text-accent" />
                Refunds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 7-10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
