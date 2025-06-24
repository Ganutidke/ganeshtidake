import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { getIntro } from '@/lib/actions/intro.actions';

export async function generateMetadata(): Promise<Metadata> {
  const intro = await getIntro();
  
  const title = intro?.headline ? `${intro.headline} | Portfolio` : 'Ganesh Tidke | Portfolio';
  const description = intro?.subheadline || 'The portfolio of Ganesh Tidke, a passionate Full-Stack Developer creating modern and responsive web applications.';

  return {
    title,
    description,
    icons: false,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
