import { type ReactNode } from 'react';
import Header from '@/components/site/header';
import Footer from '@/components/site/footer';
import PageLoader from '@/components/site/page-loader';
import { trackView } from '@/lib/actions/analytics.actions';

export default async function SiteLayout({ children }: { children: ReactNode }) {
  await trackView();
  return (
    <div className="flex min-h-screen flex-col">
      <PageLoader />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
