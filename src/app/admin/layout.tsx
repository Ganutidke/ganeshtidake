
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Ganesh Tidke',
  description: 'Admin dashboard for the portfolio of Ganesh Tidke.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background">
        <header className="p-4 md:p-6 flex items-center border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <SidebarTrigger className="md:hidden">
            <PanelLeft />
          </SidebarTrigger>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className='h-9 w-9'>
                <AvatarImage src="https://placehold.co/40x40.png" alt="@ganesh" data-ai-hint="profile avatar" />
                <AvatarFallback>GT</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
