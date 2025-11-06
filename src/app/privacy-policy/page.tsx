import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Privacy Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains what information we collect and how we use it.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 text-muted-foreground">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We collect information you provide directly to us when you create an account, place an order, or communicate with us. This may include your name, email address, shipping address, phone number, and payment information.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Process and fulfill your orders, including sending you emails to confirm your order status and shipment.</li>
                <li>Communicate with you about products, services, offers, and promotions.</li>
                <li>Improve our website and services.</li>
                <li>Prevent fraudulent transactions and monitor against theft.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Information Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We do not sell or rent your personal information to third parties. We may share your information with third-party service providers who perform services on our behalf, such as payment processing, shipping, and email delivery. These service providers are obligated to protect your information and are not authorized to use it for any other purpose.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. We use secure socket layer (SSL) technology to encrypt your payment information during transmission.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We may update this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice. We encourage you to review the policy whenever you access our services to stay informed about our information practices.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
