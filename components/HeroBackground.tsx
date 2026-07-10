"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/** PRNG determinístico (mulberry32) */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Background animado premium: gradiente radial + grid sutil + partículas douradas */
export function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = useMemo(() => {
    const rand = mulberry32(20240101);
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 2.5 + 1,
      delay: rand() * 4,
      duration: rand() * 6 + 8,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* gradiente base: gold radial top + navy bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,169,98,0.14),transparent_60%),radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(11,30,63,0.7),transparent_60%)]" />

      {/* grade sutil */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* partículas — só no client para evitar hydration mismatch */}
      {mounted &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-gold/50"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* glow inferior dourado difuso */}
      <div className="absolute -bottom-40 left-1/2 h-96 w-[60%] -translate-x-1/2 rounded-full bg-gold/8 blur-[120px]" />
    </div>
  );
}
