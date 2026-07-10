"use client";

import Image from "next/image";
import { Reveal } from "../Section";
import { Eyebrow, Avatar } from "../Avatar";
import { IconCheck } from "../Icons";

const CREDENTIALS = [
  "CNPI — Certificado Nacional do Profissional de Investimento",
  "MBA em Finanças — FGV",
  "+12 anos de atuação em gestão patrimonial",
  "Ex-gestor de Family Office",
];

export function About() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden border-y border-white/5 bg-bg-2 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-gold/5 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* retrato */}
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
                alt="Lucas Bittencourt - Consultor-chefe Lion Gold"
                fill
                className="object-cover img-dramatic"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                <Avatar name="Lucas Bittencourt" size={80} idx={0} />
                <p className="mt-4 font-display text-2xl font-semibold text-ink">
                  Lucas Bittencourt
                </p>
                <p className="text-sm text-gold">Consultor-chefe · Fundador</p>
              </div>
              {/* moldura */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            </div>
          </Reveal>

          {/* bio */}
          <Reveal delay={120}>
            <Eyebrow>Sobre o consultor</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-tight text-ink">
              Quem cuida do seu{" "}
              <em className="font-serif">patrimônio</em>
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-muted">
              <p>
                Lucas Bittencourt dedica sua carreira a uma ideia simples: o
                dinheiro do cliente deve ser tratado com o mesmo cuidado que se
                trata o próprio. Mais de uma década conduzindo estratégias
                patrimoniais para famílias, executivos e empresários.
              </p>
              <p>
                Passou por mesas de gestão e Family Offices antes de fundar a
                Lion Gold — uma consultoria independente, feita para poucos.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {CREDENTIALS.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <IconCheck size={13} />
                  </span>
                  <span className="text-sm text-ink">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
