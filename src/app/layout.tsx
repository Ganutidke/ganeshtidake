import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getIntro } from "@/lib/actions/intro.actions";
import { getTheme } from "@/lib/actions/theme.actions";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import AnalyticsTracker from "@/components/analytics-tracker";

export async function generateMetadata(): Promise<Metadata> {
  const intro = await getIntro();

  const title = intro?.headline
    ? `${intro.headline} | Portfolio`
    : "Ganesh Tidake | Portfolio";
  const description =
    intro?.subheadline ||
    "A personal portfolio showcasing modern web applications and SaaS products built with Next.js, React, and Tailwind CSS.";

  const baseUrl = "https://ganeshtidake.site";

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: intro?.headline || "Ganesh Tidake Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: intro?.headline || "Ganesh Tidake Portfolio",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: intro?.headline || "Ganesh Tidake",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    robots: {
      index: true,
      follow: true,
    },
    keywords: [
      intro?.headline || "Ganesh Tidake",
      "Web Developer",
      "Next.js Developer",
      "React.js",
      "Frontend Developer",
      "SaaS Builder",
      "Portfolio",
      "Tailwind CSS",
    ].filter(Boolean),
    authors: intro?.headline
      ? [{ name: intro.headline, url: baseUrl }]
      : [{ name: "Ganesh Tidake", url: baseUrl }],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  const themeStyles = theme
    ? `
    :root, .dark {
      --background: ${theme.background};
      --foreground: ${theme.foreground};
      --card: ${theme.card};
      --primary: ${theme.primary};
      --secondary: ${theme.secondary};
      --accent: ${theme.accent};
      --border: ${theme.border};
      --card-foreground: ${theme.foreground};
      --popover: ${theme.card};
      --popover-foreground: ${theme.foreground};
      --primary-foreground: 210 40% 98%;
      --secondary-foreground: ${theme.foreground};
      --muted: ${theme.secondary};
      --muted-foreground: ${theme.foreground};
      --accent-foreground: ${theme.foreground};
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 210 40% 98%;
      --input: ${theme.border};
      --ring: ${theme.primary};
    }
  `
    : "";

  const intro = await getIntro();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;600;700&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        {theme && (
          <style
            id="custom-theme-variables"
            dangerouslySetInnerHTML={{ __html: themeStyles }}
          />
        )}

        {/* ✅ Global Structured Data (Schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: intro?.headline || "Ganesh Tidake",
              url: "https://ganeshtidake.site",
              jobTitle: intro?.subheadline || "Full Stack Web Developer",
              sameAs: [
                "https://github.com/ganeshtidake",
                "https://linkedin.com/in/ganeshtidake",
              ],
              image: "https://ganeshtidake.site/og-image.png",
              description:
                intro?.subheadline ||
                "Building modern web apps and SaaS products with Next.js and React.",
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: intro?.headline || "Ganesh Tidake Portfolio",
              url: "https://ganeshtidake.site",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://ganeshtidake.site/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body className="font-body antialiased">
        {children}
        <Analytics />
        <Toaster />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <AnalyticsTracker />
      </body>
    </html>
  );
}
