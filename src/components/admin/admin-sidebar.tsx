'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LogOut,
  Ticket,
  ChevronDown
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { logout } from '@/lib/actions/auth.actions';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';


const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin', label: 'Ticket', icon: Ticket },
];

const Logo = () => (
    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary relative">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 21L4.5 13.5L12 3L19.5 13.5L17 21L12 16L7 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.5 13.5L12 16L19.5 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background"></div>
    </div>
);


export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r bg-card text-card-foreground">
      <SidebarRail />
      <SidebarHeader>
        <Button variant="ghost" className="flex items-center justify-start gap-2 w-full px-2 text-left">
            <Logo />
            <div className="group-data-[collapsible=icon]:hidden flex-1">
                <p className="font-semibold text-foreground text-sm">Name</p>
                <p className="text-xs text-muted-foreground">Agent Admin</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex flex-col">
        <SidebarMenu className="flex-1">
          {adminNavLinks.map((link) => {
            const isActive = pathname === link.href;
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
         <SidebarFooter>
            <form action={logout}>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton type="submit" tooltip={{children: "Logout", side: 'right', align: 'center'}}>
                            <LogOut />
                            <span className="group-data-[collapsible=icon]:hidden">
                            Logout
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </form>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
