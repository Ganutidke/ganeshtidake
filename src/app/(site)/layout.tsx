import { type ReactNode } from 'react';
import Header from '@/components/site/header';
import Footer from '@/components/site/footer';
import PageLoader from '@/components/site/page-loader';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PageLoader />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
