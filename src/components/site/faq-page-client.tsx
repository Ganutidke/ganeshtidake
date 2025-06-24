
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import type { IFaq } from '@/models/faq.model';

export default function FaqPageClient({ faqs }: { faqs: IFaq[] }) {
  return (
    <FramerMotionWrapper>
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary">Frequently Asked Questions</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Here are some answers to common questions about my work and process.
          </p>
        </div>

        <div className="mt-12">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <FramerMotionWrapper key={faq._id} delay={index * 0.1}>
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger className="text-lg text-left hover:text-primary transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    </FramerMotionWrapper>
                ))}
            </Accordion>
        </div>
      </div>
    </FramerMotionWrapper>
  );
}
