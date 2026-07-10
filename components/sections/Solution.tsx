"use client";

import Image from "next/image";
import { Reveal } from "../Section";
import { SectionMark } from "../Avatar";
import { IconCheck } from "../Icons";

const PROMISES = [
  "Clareza total sobre onde está, para onde vai e o que falta.",
  "Estratégia personalizada, construída para o seu perfil e objetivos.",
  "Proteção do patrimônio em qualquer cenário de mercado.",
  "Decisões frias, baseadas em dados — não em manchete.",
];

export function Solution() {
  return (
    <section id="solucao" className="relative overflow-hidden py-24 sm:py-32">
      {/* glow lateral */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gold/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionMark>(01) A solução</SectionMark>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-tight text-ink">
              Um método para fazer seu dinheiro{" "}
              <em className="font-serif">
                trabalhar por você
              </em>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
              A Lion Gold substitui o achismo por processo. Cada decisão
              patrimonial passa por diagnóstico, estratégia, execução e
              acompanhamento contínuo — um sistema, não uma aposta.
            </p>

            <ul className="mt-8 space-y-4">
              {PROMISES.map((p, i) => (
                <Reveal key={p} delay={i * 80}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <IconCheck size={15} />
                    </span>
                    <span className="text-ink">{p}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          {/* painel visual */}
          <Reveal delay={150} className="relative">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-bg-3 p-8">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                  alt="Dashboard financeiro com indicadores de crescimento"
                  fill
                  className="object-cover img-dramatic"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-3 via-bg-3/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold">
                    Crescimento projetado
                  </p>
                  <p className="font-display text-5xl font-light text-ink">
                    +147%
                  </p>
                  <p className="text-xs text-ink-muted">10 anos</p>
                </div>
              </div>

              {/* mini gráfico de barras */}
              <div className="mt-6 flex h-32 items-end gap-2">
                {[22, 30, 28, 42, 38, 55, 60, 72, 80, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-gold/80 to-gold transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-wider text-ink-muted/60">
                Ilustrativo. Performance passada não garante resultados futuros.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
