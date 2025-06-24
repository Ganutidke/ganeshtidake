
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
import { motion, type Variants } from 'framer-motion';

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

// 1. Main container animation: drops down and expands
const navContainerVariants: Variants = {
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
      duration: 1.5, // A bit longer for a more pronounced effect
      times: [ 0, 0.4, 1 ],
      ease: "easeOut",
      delay: 0.2,
      // Orchestrate children animations after the container is ready
      delayChildren: 1.0, 
    },
  },
};

// 2. Nav items (the buttons) appear from the outside-in
const navItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: { order: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      // The delay is based on the 'order' custom prop
      delay: i.order * 0.15,
      duration: 0.4,
      ease: 'easeOut',
      // Delay the text animation until this one is nearly done
      delayChildren: 0.2,
    },
  }),
};

// 3. Text inside nav items fades in after its button appears
const textVariants: Variants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// The order in which items appear. 0 is first, 1 is second, etc.
// This creates the "outside-in" effect.
const animationOrder = [
  0, // Home
  1, // About
  2, // Work
  2, // Blog
  1, // Gallery
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="py-4 sticky top-0 z-50">
      <motion.nav
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-fit items-center gap-1 rounded-full border bg-background/70 p-1.5 shadow-lg backdrop-blur-md"
      >
        {mainNavLinks.map((link, index) => (
          <motion.div
            key={link.href}
            custom={{ order: animationOrder[index] }}
            variants={navItemVariants}
          >
            <Link
              href={link.href}
              className={cn(
                'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                pathname === link.href && 'bg-muted text-foreground',
                link.label === 'Home' && 'px-2.5'
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label !== 'Home' && 
                <motion.span variants={textVariants} className="hidden sm:inline">
                  {link.label}
                </motion.span>
              }
            </Link>
          </motion.div>
        ))}

        <motion.div custom={{ order: 0 }} variants={navItemVariants}>
          <Separator orientation="vertical" className="h-6 mx-1" />
        </motion.div>
        
        <motion.div custom={{ order: 0 }} variants={navItemVariants}>
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
        </motion.div>
      </motion.nav>
    </header>
  );
}
