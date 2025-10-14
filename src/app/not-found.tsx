"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import FramerMotionWrapper from "@/components/site/framer-motion-wrapper";

export default function RootNotFound() {
  return (
    <FramerMotionWrapper className="mt-20">
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        {/* Fade In Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Text */}
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
            The page you’re looking for doesn’t exist or may have been moved.
            <br />
            But hey — let’s get you back to something awesome!
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:opacity-90 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Home
            </Link>

            <Link
              href="/projects"
              className="border border-border text-muted-foreground px-5 py-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition"
            >
              View Projects
            </Link>
          </div>
        </motion.div>

        {/* Decorative Blob Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <div className="relative w-64 h-64 mx-auto">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full text-primary/25"
            >
              <path
                fill="currentColor"
                d="M39.3,-63.4C49.3,-55.7,54.5,-41.2,61.7,-27.1C68.9,-12.9,78.1,1,78.8,15.7C79.5,30.4,71.7,45.8,60.3,54.4C48.9,63,34,64.8,20.3,65.8C6.6,66.8,-6.1,67,-19.2,64.8C-32.2,62.6,-45.6,57.9,-57.2,48.6C-68.9,39.2,-78.8,25.2,-80.9,10.3C-83.1,-4.6,-77.5,-20.5,-70.7,-35.3C-63.9,-50.2,-55.8,-63.9,-43.2,-71.6C-30.7,-79.3,-15.3,-81,0.5,-81.7C16.4,-82.4,32.7,-82.9,39.3,-63.4Z"
                transform="translate(100 100)"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-8xl font-extrabold text-foreground">
              😕
            </span>
          </div>
        </motion.div>
      </section>
    </FramerMotionWrapper>
  );
}
