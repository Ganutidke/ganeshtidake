
'use client';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function FramerMotionWrapper({
  children,
  className,
  delay = 0,
  variants = defaultVariants
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
