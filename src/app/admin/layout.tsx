import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/admin-sidebar';

export const metadata: Metadata = {
  title: 'Admin | Ganesh Tidke',
  description: 'Admin dashboard for the portfolio of Ganesh Tidke.',
  robots: {
    index: false,
    follow: false,
  },
  icons: false,
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-card p-4 md:p-8">{children}</main>
    </div>
  );
}
