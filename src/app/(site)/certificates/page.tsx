
import { getCertificates } from '@/lib/actions/certificate.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import CertificatesPageClient from '@/components/site/certificates-page-client';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const certificates = await getCertificates();

  const hasCertificates = certificates && certificates.length > 0;

  const description = hasCertificates
    ? "Explore verified certificates and achievements by Ganesh Tidake — showcasing expertise in web development, SaaS, and modern technologies."
    : "View certificates and credentials from Ganesh Tidake, a full-stack web developer specializing in modern web technologies.";

  return {
    title: "Certificates ",
    description,
    alternates: {
      canonical: "https://ganeshtidake.site/certificates",
    },
    openGraph: {
      title: "Certificates | Ganesh Tidake",
      description,
      url: "https://ganeshtidake.site/certificates",
      siteName: "Ganesh Tidake Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Ganesh Tidake Certificates",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Certificates | Ganesh Tidake",
      description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: [
      "Ganesh Tidake Certificates",
      "Web Developer Certificates",
      "Next.js Developer Certifications",
      "Frontend Developer Achievements",
      "SaaS Developer Certificates",
      "React.js Certificates",
      "Tailwind CSS Certification",
    ],
  };
}

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  if (!certificates || certificates.length === 0) {
    return (
      <PagePlaceholder
        title="Certificates"
        description="No certificates found yet. Add some from the admin panel!"
      />
    );
  }

  return <CertificatesPageClient certificates={certificates} />;
}
