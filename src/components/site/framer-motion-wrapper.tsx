
'use client';
import { motion, type Variants } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function FramerMotionWrapper({
  children,
  className,
  delay = 0,
  variants = defaultVariants,
}: Props) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
