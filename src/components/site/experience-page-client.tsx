
'use client';

import { format } from 'date-fns';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import type { IExperience } from '@/models/experience.model';

export default function ExperiencePageClient({ experienceHistory }: { experienceHistory: IExperience[] }) {
  return (
    <FramerMotionWrapper>
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary">Work Experience</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            My professional journey and roles.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
          {experienceHistory.map((exp, index) => (
            <FramerMotionWrapper key={exp._id as string} delay={index * 0.1}>
              <div className="relative mb-12 md:flex items-center md:justify-center">
                  <div className={`md:w-1/2 w-full ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                      <div className="p-6 rounded-lg shadow-lg bg-card text-left">
                          <p className="text-sm font-semibold text-primary">
                              {format(new Date(exp.startDate), 'MMM yyyy')} - {exp.endDate ? format(new Date(exp.endDate), 'MMM yyyy') : 'Present'}
                          </p>
                          <h3 className="text-xl font-bold font-headline mt-1 text-foreground">{exp.role}</h3>
                          <h4 className="text-lg font-semibold">{exp.company}</h4>
                          {exp.description && (
                              <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                          )}
                      </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block"></div>
              </div>
            </FramerMotionWrapper>
          ))}
        </div>
      </div>
    </FramerMotionWrapper>
  );
}
