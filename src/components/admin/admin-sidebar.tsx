'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, LogOut, Mountain, Home, UserCircle, Briefcase, GraduationCap,
  FolderKanban, Newspaper, Award, Image as ImageIcon, HelpCircle, Inbox, Lightbulb, Palette, Grip, MessageSquare, Compass
} from 'lucide-react';
import {
  Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarFooter
} from '@/components/ui/sidebar';
import { logout } from '@/lib/actions/auth.actions';


const menuGroups = [
  {
    title: "Manage",
    links: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/messages', label: 'Messages', icon: Inbox },
      { href: '/admin/intro', label: 'Intro', icon: Home },
      { href: '/admin/about', label: 'About', icon: UserCircle },
    ]
  },
  {
    title: "Portfolio",
    links: [
      { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
      { href: '/admin/projects/categories', label: 'Categories', icon: Grip },
      { href: '/admin/blogs', label: 'Blogs', icon: Newspaper },
      { href: '/admin/experience', label: 'Experience', icon: Briefcase },
      { href: '/admin/education', label: 'Education', icon: GraduationCap },
      { href: '/admin/certificates', label: 'Certificates', icon: Award },
      { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
      { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
    ]
  },
  {
    title: "Settings",
    links: [
      { href: '/admin/theme', label: 'Theme', icon: Palette },
      { href: '/admin/get-started', label: 'Get Started', icon: Compass },
    ]
  },
   {
    title: "AI Tools",
    links: [
      { href: '/admin/seo', label: 'SEO Helper', icon: Lightbulb },
      { href: '/admin/chatbot', label: 'Chatbot', icon: MessageSquare },
    ]
  }
];


export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r bg-card text-card-foreground">
      <SidebarHeader className="p-2">
        <div className="flex items-center justify-center h-10">
          <div className="flex items-center gap-2 w-full">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
              <Mountain className="h-5 w-5"/>
            </div>
            <div className="group-data-[collapsible=icon]:hidden flex-1">
              <p className="font-semibold text-foreground text-sm">Portfolio</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex flex-col p-2">
        <div className="flex-1 overflow-y-auto">
          {menuGroups.map((group) => (
            <div key={group.title} className="mb-4 last:mb-0">
              <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider px-2 py-1 mb-1 group-data-[collapsible=icon]:hidden">
                {group.title}
              </h3>
              <SidebarMenu>
                {group.links.map((link) => {
                  const isActive = link.href === '/admin' 
                    ? pathname === link.href 
                    : pathname.startsWith(link.href);
                  
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
            </div>
          ))}
        </div>
         
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
