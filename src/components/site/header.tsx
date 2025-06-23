
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center rounded-full font-mono">
            G
          </div>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          {navLinks.map((link) => (
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
        </nav>
      </div>
    </header>
  );
}
