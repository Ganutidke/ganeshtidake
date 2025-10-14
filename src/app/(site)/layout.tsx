import { type ReactNode } from 'react';
import Header from '@/components/site/header';
import Footer from '@/components/site/footer';
import PageLoader from '@/components/site/page-loader';
import { trackView } from '@/lib/actions/analytics.actions';
import Chatbot from '@/components/site/chatbot';
import { Metadata, Viewport } from 'next';


export const metadata: Metadata = {
  title: {
    default: "Ganesh Tidake | Full Stack Developer & SaaS Builder",
    template: "%s | Ganesh Tidake",
  },
  description:
    "Explore the portfolio of Ganesh Tidake — a full-stack web developer specializing in Next.js, React, and SaaS product development. Passionate about building scalable web applications with modern UI/UX.",
  keywords: [
    "Ganesh Tidake",
    "Web Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Portfolio",
    "SaaS Builder",
    "Frontend Developer",
    "JavaScript",
    "Tailwind CSS",
  ],
  metadataBase: new URL("https://ganeshtidake.site"),
  alternates: {
    canonical: "https://ganeshtidake.site",
  },
  openGraph: {
    title: "Ganesh Tidake | Full Stack Developer & SaaS Builder",
    description:
      "Full-stack developer crafting scalable and modern web experiences using Next.js and React.",
    url: "https://ganeshtidake.site",
    siteName: "Ganesh Tidake Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ganesh Tidake Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Tidake | Full Stack Developer",
    description:
      "Building scalable SaaS apps and web experiences with Next.js, React, and Tailwind CSS.",
    images: ["/og-image.png"],
    creator: "@ganeshtidake", // optional
  },
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "Ganesh Tidake", url: "https://ganeshtidake.site" }],
  creator: "Ganesh Tidake",
  publisher: "Ganesh Tidake",
  category: "Portfolio, Web Development, SaaS",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: 'black',
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  await trackView();
  return (
    <div className="flex min-h-screen flex-col">
      <PageLoader />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
