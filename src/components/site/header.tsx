
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Home,
  User,
  LayoutGrid,
  Newspaper,
  Image as GalleryIcon,
  Briefcase,
  Award,
  GraduationCap,
  HelpCircle,
  Mail,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/projects', label: 'Work', icon: LayoutGrid },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/gallery', label: 'Gallery', icon: GalleryIcon },
];

const moreLinks = [
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/certificates', label: 'Certificates', icon: Award },
  { href: '/education', label: 'Education', icon: GraduationCap },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const navVariants = {
  hidden: {
    y: -40,
    scaleX: 0.3,
    scaleY: 0.6,
    opacity: 0,
  },
  visible: {
    y: [ -40, 0, 0 ],
    scaleX: [ 0.3, 0.3, 1 ],
    scaleY: [ 0.6, 1, 1 ],
    opacity: [ 0, 1, 1 ],
    transition: {
      duration: 1.2,
      times: [ 0, 0.5, 1 ],
      ease: "easeOut",
      delay: 0.2,
      delayChildren: 0.7,
      staggerChildren: 0.1,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: -5, transition: { duration: 0.1 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="py-4 sticky top-0 z-50">
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-fit items-center gap-1 rounded-full border bg-background/70 p-1.5 shadow-lg backdrop-blur-md"
      >
        {mainNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
              pathname === link.href && 'bg-muted text-foreground',
              link.label === 'Home' && 'px-2.5' // Less padding for icon-only button
            )}
          >
            <link.icon className="h-5 w-5" />
            {link.label !== 'Home' && 
              <motion.span variants={textVariants} className="hidden sm:inline">
                {link.label}
              </motion.span>
            }
          </Link>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {moreLinks.map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <Link href={link.href} className="flex items-center gap-2">
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.nav>
    </header>
  );
}
