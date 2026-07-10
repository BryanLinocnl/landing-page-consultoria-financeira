"use client";

import { Reveal } from "../Section";
import { Eyebrow, Avatar, Stars } from "../Avatar";
import { Card } from "../Card";

const TESTIMONIALS = [
  {
    name: "Ricardo Almeida",
    role: "Empresário · Setor logístico",
    text: "Cheguei sem estratégia nenhuma, com dinheiro espalhado em cinco instituições. Em seis meses reorganizei tudo e já vejo a diferença. O método faz sentido.",
    idx: 0,
  },
  {
    name: "Patrícia Mendes",
    role: "Médica · Especialista",
    text: "O que mais me impressionou foi a independência. Pela primeira vez senti que alguém olhava para o meu patrimônio como coisa séria, sem me empurrar produto.",
    idx: 1,
  },
  {
    name: "Fernando Castro",
    role: "Executivo · C-Level",
    text: "Saí da renda fixa por pânico e da bolsa por euforia. A Lion Gold me deu processo. Hoje durmo tranquilo mesmo com o mercado volátil.",
    idx: 2,
  },
  {
    name: "Helena Vasconcelos",
    role: "Aposentada · Investidora",
    text: "Precisava proteger o que construí a vida toda. A estratégia de preservação fez eu entender meu próprio dinheiro. Atendimento impecável.",
    idx: 3,
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[300px] -translate-y-1/2 rounded-full bg-gold/5 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Prova social</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-tight text-ink">
            Quem confia, vê{" "}
            <em className="font-serif">resultado</em>
          </h2>
          <p className="mt-5 text-lg text-ink-muted">
            Histórias reais de quem deixou o achismo para trás e adotou o
            método.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <Card className="h-full" lift={5}>
                <div className="mb-4 flex items-center justify-between">
                  <Stars count={5} />
                  <span className="text-gold/30" aria-hidden>
                    &#10077;
                  </span>
                </div>
                <p className="text-base leading-relaxed text-ink">“{t.text}”</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <Avatar name={t.name} size={48} idx={t.idx} />
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">
                      {t.name}
                    </p>
                    <p className="text-xs text-ink-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
