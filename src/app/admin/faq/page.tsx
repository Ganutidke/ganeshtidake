
import PageHeader from '@/components/admin/page-header';
import FaqManagementClient from '@/components/admin/faq-management-client';
import { getFaqs } from '@/lib/actions/faq.actions';

export default async function AdminFaqPage() {
  const faqs = await getFaqs();
  return (
    <div>
      <PageHeader
        title="FAQ Management"
        description="Create, edit, and manage your frequently asked questions."
      />
      <FaqManagementClient faqs={faqs} />
    </div>
  );
}
