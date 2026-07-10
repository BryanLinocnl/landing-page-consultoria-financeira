"use client";

import { Reveal } from "../Section";
import { Counter } from "../Counter";

const STATS = [
  { value: 12, suffix: "+", label: "Anos de mercado" },
  { value: 300, suffix: "+", label: "Clientes atendidos" },
  { value: 800, prefix: "R$ ", suffix: "M+", label: "Patrimônio orientado" },
  { value: 96, suffix: "%", label: "Retenção de clientes" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-bg-2 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_50%,rgba(201,169,98,0.08),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 120} className="text-center">
              <p className="font-display text-4xl font-light tracking-tight text-gold-gradient sm:text-5xl">
                <Counter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </p>
              <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
