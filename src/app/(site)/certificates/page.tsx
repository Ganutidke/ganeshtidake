
import { getCertificates } from '@/lib/actions/certificate.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">Certificates & Achievements</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A showcase of my certified skills and professional accomplishments.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        {certificates.map((cert) => (
          <Card key={cert._id as string} className="group flex flex-col sm:flex-row items-center gap-8 p-6 transition-all duration-300 hover:bg-card/80 hover:shadow-primary/20 hover:shadow-lg">
            <div className="relative h-48 w-full sm:w-1/3 flex-shrink-0">
               <Image
                  src={cert.coverImage.url}
                  alt={cert.title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex-grow text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                {format(new Date(cert.issueDate), 'MMMM yyyy')}
              </p>
              <h3 className="font-headline text-xl font-bold mt-1 text-foreground">{cert.title}</h3>
              <p className="text-muted-foreground mt-1">
                Issued by: <span className="font-semibold text-foreground">{cert.issuingOrganization}</span>
              </p>
              {cert.credentialUrl && (
                 <Button asChild size="sm" className="mt-4">
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                        View Credential
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
