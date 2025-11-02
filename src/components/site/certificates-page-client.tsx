
'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import type { ICertificate } from '@/models/certificate.model';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from '@radix-ui/react-dialog';

export default function CertificatesPageClient({ certificates }: { certificates: ICertificate[] }) {
  return (
    <FramerMotionWrapper>
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
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-48 w-full sm:w-1/3 flex-shrink-0 cursor-pointer">
                    <Image
                      src={cert.coverImage.url}
                      alt={cert.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="p-0 border-0 max-w-4xl bg-transparent">
                  <DialogTitle className="z-10 text-foreground">{cert.title}</DialogTitle>
                  <Image
                    src={cert.coverImage.url}
                    alt={cert.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-lg"
                  />
                </DialogContent>
              </Dialog>
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
    </FramerMotionWrapper>
  );
}
