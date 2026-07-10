"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

/** Formata número com separador de milhar brasileiro */
function formatNumber(n: number, decimals: number): string {
  const factor = 10 ** decimals;
  const rounded = Math.round(n * factor) / factor;
  const [intPart, decPart] = rounded.toFixed(decimals).split(".");
  const formattedInt = Number(intPart).toLocaleString("pt-BR");
  return decimals > 0 ? `${formattedInt},${decPart}` : formattedInt;
}

/** Contador que anima de 0 até `value` quando entra na viewport */
export function Counter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return controls.stop;
  }, [inView, value, duration, mv]);

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(display, decimals)}
      {suffix}
    </span>
  );
}
