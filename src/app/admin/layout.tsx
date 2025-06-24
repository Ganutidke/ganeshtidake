
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { PanelLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin | Ganesh Tidke',
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
      <SidebarInset className="bg-card">
        <header className="p-4 md:p-6 flex items-center border-b sticky top-0 bg-card/90 backdrop-blur-sm z-10">
          <SidebarTrigger className="md:hidden">
            <PanelLeft />
          </SidebarTrigger>
          <h1 className="ml-4 font-semibold text-lg hidden md:block">Admin Panel</h1>
        </header>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
