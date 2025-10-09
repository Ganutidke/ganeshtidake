import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getIntro } from "@/lib/actions/intro.actions";
import { getTheme } from "@/lib/actions/theme.actions";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata(): Promise<Metadata> {
  const intro = await getIntro();

  const title = intro?.headline ? `${intro.headline} | Portfolio` : "Portfolio";
  const description =
    intro?.subheadline || "A personal portfolio built with Next.js.";

  return {
    title,
    description,
    icons: null,
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        {theme && (
          <style
            id="custom-theme-variables"
            dangerouslySetInnerHTML={{ __html: themeStyles }}
          />
        )}
      </head>
      <body className="font-body antialiased">
        {children}
        <Analytics />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
