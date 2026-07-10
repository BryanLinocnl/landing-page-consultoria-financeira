"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "../Section";
import { SectionMark } from "../Avatar";
import {
  IconTarget,
  IconCompass,
  IconBolt,
  IconEye,
} from "../Icons";

const STEPS = [
  {
    icon: IconTarget,
    n: "01",
    title: "Diagnóstico",
    desc: "Mapeamos patrimônio, objetivos, perfil de risco e cenário completo. Sem diagnóstico, não há estratégia.",
  },
  {
    icon: IconCompass,
    n: "02",
    title: "Estratégia",
    desc: "Construímos um plano sob medida: alocação, horizontes, metas. Cada real com um propósito definido.",
  },
  {
    icon: IconBolt,
    n: "03",
    title: "Execução",
    desc: "Implementamos a estratégia com clareza total sobre custos, prazos e instrumentos. Sem ruído, sem pressa.",
  },
  {
    icon: IconEye,
    n: "04",
    title: "Acompanhamento",
    desc: "Monitoramos, revisamos e ajustamos. O mercado muda, a vida muda — sua estratégia precisa acompanhar.",
  },
];

export function Methodology() {
  return (
    <section id="metodologia" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.45fr_1fr]">
          {/* intro */}
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionMark>(02) Metodologia</SectionMark>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-tight text-ink">
              Quatro etapas. Um{" "}
              <em className="font-serif">
                sistema completo
              </em>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Da primeira conversa ao acompanhamento de longo prazo, tudo segue
              um processo desenhado para resultados consistentes.
            </p>

            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 lg:block">
              <Image
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2671&auto=format&fit=crop"
                alt="Planejamento financeiro estratégico"
                fill
                className="object-cover img-dramatic"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* steps grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.n} delay={i * 150}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-bg-3 p-7 transition-colors hover:border-gold/30"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                      <Icon size={28} />
                    </div>
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-gold/70">
                      {s.n}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {s.desc}
                    </p>

                    {/* corner number */}
                    <span className="absolute right-5 top-5 font-display text-4xl font-bold text-white/[0.04]">
                      {i + 1}
                    </span>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
