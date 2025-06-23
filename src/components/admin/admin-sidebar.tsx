'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  Book,
  Award,
  GraduationCap,
  Lightbulb,
  Home,
  User,
  Mountain
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/intro', label: 'Intro', icon: Home },
  { href: '/admin/about', label: 'About', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: Book },
  { href: '/admin/blogs', label: 'Blogs', icon: Newspaper },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/seo', label: 'SEO Helper', icon: Lightbulb },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-headline">VisionFolio</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {adminNavLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant={pathname === link.href ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <Link href={link.href}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}
