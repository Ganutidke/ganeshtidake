
import { getCertificates } from '@/lib/actions/certificate.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';

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

  return (
    <div className="container py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">Certificates & Achievements</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A showcase of my certified skills and professional accomplishments.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <Card key={cert._id as string} className="group relative flex flex-col overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={cert.coverImage.url}
                  alt={cert.title}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col">
              <CardTitle className="font-headline text-xl mb-2">{cert.title}</CardTitle>
              <p className="text-muted-foreground flex-grow">
                Issued by: <span className="font-semibold text-foreground">{cert.issuingOrganization}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Date: {format(new Date(cert.issueDate), 'MMMM yyyy')}
              </p>
            </CardContent>
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 bg-primary text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
