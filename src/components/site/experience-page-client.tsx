'use client';

import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { IExperience } from "@/models/experience.model";
import { Badge } from "../ui/badge";
import FramerMotionWrapper from "@/components/site/framer-motion-wrapper";

export default function ExperiencePageClient({
  experienceHistory,
}: {
  experienceHistory: IExperience[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <FramerMotionWrapper>
      <section className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8 font-display relative overflow-hidden">
        <div className="max-w-5xl mx-auto" ref={ref}>
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold text-primary">
              Work Experience
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              My professional journey and roles.
            </p>
          </div>

          <div className="relative mt-8">
            {/* Animated vertical timeline line */}
            <motion.div
              className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-[3px] rounded origin-top"
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              aria-hidden
            >
              <div className="h-full w-full bg-gradient-to-b from-primary to-cyan-400 rounded" />
            </motion.div>

            <div className="space-y-16 relative">
              {experienceHistory.map((exp, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={exp._id as string}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={cn(
                      "relative flex flex-col md:flex-row md:items-center",
                      isLeft ? "md:justify-start" : "md:justify-end"
                    )}
                  >
                    {/* Dot */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_12px] shadow-primary/50 ring-4 ring-background"></div>

                    {/* Card */}
                    <div
                      className={cn(
                        "w-full md:w-1/2 flex",
                        isLeft
                          ? "md:justify-end md:pr-10"
                          : "md:justify-start md:pl-10"
                      )}
                    >
                      <Card className="group relative w-full bg-card/70 border border-border/60 backdrop-blur-xl transition-all hover:border-primary/40 hover:shadow-[0_0_25px] hover:shadow-primary/10">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <div className="w-12 h-12 flex-shrink-0 rounded-full bg-muted flex items-center justify-center p-2">
                            <img
                              src={"/default-company-logo.png"}
                              alt={exp.company}
                              className="object-contain w-full h-full rounded-full"
                            />
                          </div>

                          <div>
                            <Badge variant={"secondary"} className="mb-2">
                              {`${format(new Date(exp.startDate), "yyyy")} - ${
                                exp.endDate
                                  ? format(new Date(exp.endDate), "yyyy")
                                  : "Present"
                              }`}
                            </Badge>
                            <CardTitle className="text-lg font-semibold">
                              {exp.role}
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground/40">
                              {exp.company}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground/45 leading-relaxed">
                            {exp.description ||
                              `Contributed to impactful projects, enhancing system performance and user experience through innovative solutions.`}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </FramerMotionWrapper>
  );
}
