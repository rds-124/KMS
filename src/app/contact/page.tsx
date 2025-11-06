import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'contact-map');

  const contactDetails = [
    { icon: Phone, text: '+91 12345 67890', href: 'tel:+911234567890' },
    { icon: Mail, text: 'support@tulunadustore.com', href: 'mailto:support@tulunadustore.com' },
    { icon: MapPin, text: '123 Temple Road, Mangalore, Karnataka 575001' },
    { icon: Clock, text: 'Mon - Sat: 10:00 AM - 6:00 PM IST' },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Get In Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question about our products, an order, or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                </div>
                <Input placeholder="Subject" />
                <Textarea placeholder="Your Message" rows={5} />
                <Button type="submit" className="w-full" variant="default">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-bold">Contact Information</h2>
            <ul className="space-y-4">
              {contactDetails.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <item.icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  {item.href ? (
                    <a href={item.href} className="hover:text-primary transition-colors">{item.text}</a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
             {mapImage && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
                <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={mapImage.imageHint}
                />
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
