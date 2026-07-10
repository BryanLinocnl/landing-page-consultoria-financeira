"use client";

import Image from "next/image";
import { Reveal } from "../Section";
import { Eyebrow } from "../Avatar";
import { Card } from "../Card";
import { IconChart, IconCompass, IconBolt } from "../Icons";

const PAINS = [
  {
    icon: IconChart,
    title: "Rendimento real negativo",
    desc: "A poupança e a renda fixa básica perdem para a inflação ano após ano. Seu dinheiro encolhe enquanto você acha que está protegido.",
  },
  {
    icon: IconCompass,
    title: "Falta de estratégia",
    desc: "Investir por dica, por modismo ou por impulso não é estratégia. Sem um plano, você reage ao mercado em vez de se antecipar a ele.",
  },
  {
    icon: IconBolt,
    title: "Decisões emocionais",
    desc: "Pânico na queda, euforia na alta. A emoção é o maior inimigo do patrimônio — e custa caro demais a longo prazo.",
  },
];

export function Pain() {
  return (
    <section
      id="dor"
      className="relative overflow-hidden border-y border-white/5 bg-bg-2 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -left-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-gold/5 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* image */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=900&h=1200"
                alt="Gráfico de mercado financeiro"
                fill
                className="object-cover img-dramatic"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-2/70 via-transparent to-bg-2/50" />
            </div>
          </Reveal>

          {/* text + cards */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>O problema</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-tight text-ink">
                A maioria perde dinheiro no{" "}
                <em className="font-serif">longo prazo</em>
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
                Não é por falta de inteligência. É por falta de método — e de
                quem encare o seu dinheiro como se fosse o próprio.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5">
              {PAINS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={i * 120}>
                    <Card className="flex items-start gap-5" lift={4}>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                          {p.desc}
                        </p>
                      </div>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
