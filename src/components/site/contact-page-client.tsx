
'use client';

import ContactForm from '@/components/site/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import type { IIntro } from '@/models/intro.model';

export default function ContactPageClient({ intro }: { intro: IIntro | null }) {
  return (
    <FramerMotionWrapper>
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary">Get In Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 bg-card p-8 sm:p-12 rounded-lg shadow-lg">
          <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold font-headline text-primary mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                  You can reach me through any of the channels below. I look forward to hearing from you!
              </p>
              <div className="space-y-6">
                  {intro?.email && (
                  <a href={`mailto:${intro.email}`} className="flex items-center gap-4 group">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Mail className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="font-semibold text-foreground">Email</p>
                          <p className="text-muted-foreground group-hover:text-primary transition-colors">
                              {intro.email}
                          </p>
                      </div>
                  </a>
                  )}
                  {intro?.phone && (
                  <a href={`tel:${intro.phone}`} className="flex items-center gap-4 group">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Phone className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="font-semibold text-foreground">Phone</p>
                          <p className="text-muted-foreground group-hover:text-primary transition-colors">
                             {intro.phone}
                          </p>
                      </div>
                  </a>
                  )}
                  {intro?.address && (
                  <div className="flex items-center gap-4 group">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="font-semibold text-foreground">Location</p>
                          <p className="text-muted-foreground">
                              {intro.address}
                          </p>
                      </div>
                  </div>
                  )}
              </div>
          </div>
          
          <div className="lg:col-span-3">
              <ContactForm />
          </div>
        </div>
      </div>
    </FramerMotionWrapper>
  );
}
