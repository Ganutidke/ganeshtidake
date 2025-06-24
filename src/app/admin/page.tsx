
import DashboardClient from '@/components/admin/dashboard-client';
import { getDashboardStats } from '@/lib/actions/analytics.actions';

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  return <DashboardClient stats={stats} />;
}
