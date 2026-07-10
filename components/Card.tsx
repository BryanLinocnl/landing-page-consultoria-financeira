"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** intensidade do hover (px de elevação) */
  lift?: number;
  onClick?: () => void;
  /** exibe a borda shimmer premium */
  shimmer?: boolean;
};

export function Card({
  children,
  className = "",
  lift = 8,
  onClick,
  shimmer = false,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -lift, transition: { duration: 0.25, ease: "easeOut" } }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-3 p-6 transition-all duration-300 hover:border-gold/30 hover:bg-bg-2 ${shimmer ? "shimmer-border" : ""} ${className}`}
    >
      {/* brilho no hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-gold/[0.08] to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
