"use client";

import { Reveal } from "../Section";
import { Eyebrow } from "../Avatar";
import { Card } from "../Card";
import {
  IconCompass,
  IconEye,
  IconScale,
  IconShield,
} from "../Icons";

const DIFFS = [
  {
    icon: IconCompass,
    title: "Metodologia proprietária",
    desc: "Um processo de estruturação patrimonial testado em mais de uma década — não uma planilha genérica.",
  },
  {
    icon: IconEye,
    title: "Acompanhamento contínuo",
    desc: "Revisões periódicas, ajustes de rota e monitoramento ativo. Sua estratégia evolui junto com o mercado e com você.",
  },
  {
    icon: IconScale,
    title: "Independência total",
    desc: "Sem vínculo com bancos ou corretoras. Recebemos exclusivamente do cliente — nossa lealdade é uma só.",
  },
  {
    icon: IconShield,
    title: "Performance × risco",
    desc: "O objetivo não é bater um índice, é otimizar o par retorno/risco do seu patrimônio. Crescer dormindo tranquilo.",
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[80%] -translate-x-1/2 rounded-full bg-gold/5 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Diferenciais</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-tight text-ink">
            Por que a Lion Gold é{" "}
            <em className="font-serif">diferente</em>
          </h2>
          <p className="mt-5 text-lg text-ink-muted">
            Quatro pilares que sustentam cada decisão que tomamos com — e por —
            você.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFS.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title} delay={i * 120}>
                <Card className="group h-full" lift={6} shimmer>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {d.desc}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
