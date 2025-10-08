
'use client';

import { format } from 'date-fns';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import type { IEducation } from '@/models/education.model';
import { Badge } from '../ui/badge';

export default function EducationPageClient({ educationHistory }: { educationHistory: IEducation[] }) {
  return (
    <FramerMotionWrapper>
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary">Education</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            My academic journey and qualifications.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
          {educationHistory.map((edu, index) => (
            <div key={edu._id as string} className="relative mb-12">
              <div className={`flex items-center md:flex-row-reverse flex-col md:text-right`}>
                  <div className="md:w-1/2 w-full md:pr-6 md:pl-0 pl-6 mb-6 md:mb-0">
                      <div className="p-6 rounded-lg shadow-lg bg-card text-left">
                      <Badge variant={'outline'} className="text-sm font-semibold text-secondary/45">
                          {format(new Date(edu.startDate), 'MMM yyyy')} - {edu.endDate ? format(new Date(edu.endDate), 'MMM yyyy') : 'Present'}
                      </Badge>
                      <h3 className="text-xl font-bold font-headline mt-1 text-primary">{edu.degree}</h3>
                      <h4 className="text-lg font-semibold">{edu.school}</h4>
                      <p className="text-muted-foreground">{edu.fieldOfStudy}</p>
                      {edu.description && (
                          <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                      )}
                      </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block"></div>
              </div>
             </div>
          ))}
        </div>
      </div>
    </FramerMotionWrapper>
  );
}
