import type { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/admin-sidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-card p-4 md:p-8">{children}</main>
    </div>
  );
}
