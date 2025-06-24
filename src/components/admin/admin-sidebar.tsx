
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
  Mountain,
  Mail,
  LayoutGrid,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/intro', label: 'Intro', icon: Home },
  { href: '/admin/about', label: 'About', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: Book },
  { href: '/admin/projects/categories', label: 'Categories', icon: LayoutGrid },
  { href: '/admin/blogs', label: 'Blogs', icon: Newspaper },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/seo', label: 'SEO Helper', icon: Lightbulb },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    if (href === '/admin/projects') {
      return pathname.startsWith(href) && !pathname.includes('/categories');
    }
    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarRail />
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-primary"
        >
          <Mountain className="h-6 w-6 shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden font-headline">
            Ganesh Tidke
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminNavLinks.map((link) => {
            const isActive = isLinkActive(link.href);
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={{
                    children: link.label,
                    side: 'right',
                    align: 'center',
                  }}
                >
                  <Link href={link.href}>
                    <link.icon />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {link.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
