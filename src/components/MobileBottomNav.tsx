
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Search, ShoppingCart, User } from 'lucide-react';
import { useFirestoreCart } from '@/hooks/use-firestore-cart';
import { useUser, useAuth } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { cn } from '@/lib/utils';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount } = useFirestoreCart();
  const { user } = useUser();
  const auth = useAuth();

  const handleAuthClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      initiateAnonymousSignIn(auth);
    } else {
      // In a real app, this might navigate to an /account page
      console.log("User is already signed in:", user.uid);
    }
  };
  
  // Navigation items for the bottom bar. 'type' determines if it's a link or a button.
  const navItems = [
    { type: 'link', href: '/', icon: Home, label: 'Home' },
    { type: 'link', href: '/category/all', icon: LayoutGrid, label: 'Categories' },
    { type: 'link', href: '/cart', icon: ShoppingCart, label: 'Cart' },
    { type: 'link', href: '/category/all', icon: Search, label: 'Search' }, // Pointing Search to categories page for now
    { type: 'button', icon: User, label: 'Account', onClick: handleAuthClick },
  ];

  // The bottom nav should not appear on admin pages
  if (pathname.startsWith('/admin')) {
      return null;
  }

  return (
    /**
     * Mobile-only Bottom Navigation Bar
     * - Fixed to the bottom, visible only on screens smaller than 768px (`md:hidden`).
     * - Features a "pill" shaped, floating design with a background blur and shadow.
     * - Contains 5 items for primary navigation: Home, Categories, Cart, Search, and Account.
     */
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 md:hidden">
        <div className="w-full h-16 bg-background/80 backdrop-blur-sm rounded-full shadow-[0_-2px_16px_rgba(0,0,0,0.08)]">
            <nav className="flex h-full items-center justify-around">
                {navItems.map((item) => {
                    // Determine if the link is active. Search is excluded from being active to avoid conflict with Categories.
                    const isActive = item.type === 'link' && (
                        (item.href === '/' && pathname === '/') ||
                        (item.href !== '/' && item.label !== 'Search' && pathname.startsWith(item.href))
                    );

                    // Render a Next.js Link for navigation items
                    if (item.type === 'link') {
                        return (
                            <Link
                                href={item.href!}
                                key={item.label}
                                className={cn(
                                'flex h-full w-full flex-col items-center justify-center gap-1 rounded-full text-xs transition-colors',
                                isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'
                                )}
                            >
                                <div className="relative">
                                    <item.icon className="h-5 w-5" />
                                    {item.label === 'Cart' && cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-[11px]">{item.label}</span>
                            </Link>
                        );
                    }
                    
                    // Render a button for action items like 'Account'
                    if (item.type === 'button') {
                        return (
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-full text-xs text-muted-foreground transition-colors hover:text-primary"
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-[11px]">{item.label}</span>
                            </button>
                        );
                    }

                    return null;
                })}
            </nav>
        </div>
    </div>
  );
}
