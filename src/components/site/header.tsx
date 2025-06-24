
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '../ui/button';
import { Menu, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mainNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const secondaryNavLinks = [
  { href: '/experience', label: 'Experience' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/education', label: 'Education' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQ' },
]

const allNavLinks = [...mainNavLinks, ...secondaryNavLinks];

export default function Header() {
  const pathname = usePathname();

  const isMoreMenuActive = secondaryNavLinks.some(link => pathname.startsWith(link.href));

  return (
    <header className="py-4 sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center rounded-full font-mono">
            G
          </div>
          <span className="hidden sm:inline-block font-headline">Ganesh Tidke</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground',
                pathname === link.href && 'text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className={cn(
                   "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground p-0 h-auto",
                   isMoreMenuActive && 'text-foreground'
                )}>
                  More <ChevronDown className="h-4 w-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {secondaryNavLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                     <Link
                        href={link.href}
                        className={cn(
                          'transition-colors hover:text-foreground',
                           pathname === link.href && 'text-foreground'
                        )}
                      >
                       {link.label}
                    </Link>
                  </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 pt-12">
                {allNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-xl transition-colors hover:text-foreground',
                      pathname === link.href ? 'text-foreground font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
