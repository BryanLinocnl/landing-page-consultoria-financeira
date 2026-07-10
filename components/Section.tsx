"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  noReveal?: boolean;
};

export function Section({
  children,
  id,
  className = "",
  delay = 0,
  noReveal = false,
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  if (noReveal) {
    return (
      <section id={id} className={`relative w-full ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: delay / 1000 }}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={inView ? "visible" : "hidden"}
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
