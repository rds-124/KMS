import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import MobileBottomNav from "@/components/MobileBottomNav";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
  weight: "variable",
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Karavali Store",
  description: "Authentic products from the heart of Karavali.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plus_jakarta_sans.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <div className="flex flex-col min-h-screen pb-20 md:pb-0">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <WhatsAppButton />
            <MobileBottomNav />
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
