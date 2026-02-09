
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/categories";
import { useFirestoreCart } from "@/hooks/use-firestore-cart";
import { useState, useEffect, useRef, useMemo } from "react";
import { useUser, useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { cn } from "@/lib/utils";
import { MobileThemeToggle } from "./MobileThemeToggle";
import { ThemeToggle } from "./ThemeToggle";
import SearchSheet from "./SearchSheet";
import { Input } from "./ui/input";
import { products as allProducts } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from "@/types";
import Image from "next/image";

function SearchResultItem({ product, onLinkClick }: { product: Product, onLinkClick: () => void }) {
  const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);
  const price = product.sale_price ?? product.price;

  return (
    <Link href={`/product/${product.sku}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted" onClick={onLinkClick}>
      <div className="relative h-14 w-14 rounded-md overflow-hidden flex-shrink-0 border">
        {productImage ? (
          <Image
            src={productImage.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            data-ai-hint={productImage.imageHint}
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-sm line-clamp-2">{product.title}</p>
        <p className="text-sm text-muted-foreground">₹{price.toFixed(2)}</p>
      </div>
    </Link>
  );
}

export default function Header() {
  const { cartCount } = useFirestoreCart();
  const { user } = useUser();
  const auth = useAuth();
  const [isAtTop, setIsAtTop] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Desktop search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY === 0);

      // Hiding navbar logic for desktop
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setShowNav(false);
      } else {
        // Scrolling up or at the top
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown on click outside or ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleAuthClick = () => {
    if (!user) {
      initiateAnonymousSignIn(auth);
    }
  };

  const isHomePage = pathname === '/';
  const showMobileAccountButton = isHomePage || pathname.startsWith('/category');

  // Filter products for dropdown
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowercasedQuery = searchQuery.toLowerCase();
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(lowercasedQuery) ||
      product.category.toLowerCase().includes(lowercasedQuery) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)))
    );
  }, [searchQuery]);

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    setSearchQuery('');
  }

  return (
    <>
      {isHomePage && (
        <div className={cn(
          "fixed top-4 left-4 z-50 md:hidden transition-opacity duration-300",
          isAtTop ? "opacity-90" : "opacity-0 pointer-events-none"
        )}>
          <MobileThemeToggle />
        </div>
      )}

      {showMobileAccountButton && (
        <div className={cn(
          "fixed top-4 right-4 z-50 md:hidden transition-opacity duration-300",
          isAtTop ? "opacity-90" : "opacity-0 pointer-events-none"
        )}>
          {user ? (
            <Link href="/account" passHref>
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-background/80 backdrop-blur-sm rounded-full shadow-md text-foreground" aria-label="Account">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="icon" className="h-9 w-9 bg-background/80 backdrop-blur-sm rounded-full shadow-md text-foreground" onClick={handleAuthClick} aria-label="Account">
              <User className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <header className={cn(
        "sticky top-0 z-40 hidden w-full p-4 md:block transition-transform duration-300",
        showNav ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 rounded-2xl bg-primary px-6 text-primary-foreground">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <div className="bg-primary-foreground rounded-full px-4 py-1 shadow-[0_1px_3px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.2)] flex flex-col items-center border border-black/50">
                  <span className="font-bold font-headline text-2xl leading-none bg-gradient-to-b from-primary via-primary to-black/70 bg-clip-text text-transparent">Karavali</span>
                  <span className="font-semibold text-primary text-[0.6rem] tracking-[0.2em] uppercase">
                      Mangalore Store
                  </span>
              </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10">
                  Categories <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/category/${category.slug}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div ref={searchContainerRef} className="relative flex-grow max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
            <Input
                type="search"
                placeholder="Search for products..."
                className="w-full rounded-full bg-background text-foreground pl-10 pr-4 h-10 shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && (
                 <div className="absolute top-full mt-2 w-full bg-background text-foreground rounded-xl shadow-lg border z-50 flex flex-col max-h-[60vh]">
                    {searchQuery.trim() === '' ? (
                         <div className="text-center py-12 px-4">
                            <p className="text-muted-foreground">Search for Grocery, Stores, Vegetable or Meat</p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <>
                            <div className="overflow-y-auto p-2">
                                <div className="space-y-1">
                                    {filteredProducts.slice(0, 8).map(product => (
                                        <SearchResultItem key={product.sku} product={product} onLinkClick={handleLinkClick} />
                                    ))}
                                </div>
                            </div>
                            {filteredProducts.length > 8 && (
                                <div className="p-2 border-t text-center">
                                    <Button asChild variant="link" size="sm">
                                        <Link href={`/search?q=${encodeURIComponent(searchQuery)}`} onClick={handleLinkClick}>
                                            View all {filteredProducts.length} results
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12 px-4">
                            <p className="text-muted-foreground">No products found for "{searchQuery}"</p>
                        </div>
                    )}
                 </div>
            )}
          </div>

          <div className="flex items-center gap-4">
              <ThemeToggle className="text-primary-foreground hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10" />

              {user ? (
                <Link href="/account" passHref>
                  <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10" aria-label="Account">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10" onClick={handleAuthClick} aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              )}

              <Link href="/cart" passHref>
                  <Button variant="ghost" size="icon" className="relative hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="sr-only">Cart</span>
                      {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                          {cartCount}
                          </span>
                      )}
                  </Button>
              </Link>
          </div>
        </div>
      </header>
      <SearchSheet open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
