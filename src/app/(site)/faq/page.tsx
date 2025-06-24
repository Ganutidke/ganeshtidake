
import { getFaqs } from '@/lib/actions/faq.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import FaqPageClient from '@/components/site/faq-page-client';

export default async function FaqPage() {
  const faqs = await getFaqs();

  if (!faqs || faqs.length === 0) {
    return (
      <PagePlaceholder
        title="Frequently Asked Questions"
        description="No FAQs found yet. Add some from the admin panel!"
      />
    );
  }

  return <FaqPageClient faqs={faqs} />;
}
