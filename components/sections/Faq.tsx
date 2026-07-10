"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../Section";
import { Eyebrow } from "../Avatar";
import { IconChevron } from "../Icons";

const FAQS = [
  {
    q: "Quanto preciso de patrimônio para começar?",
    a: "Trabalhamos principalmente com investidores que já acumularam patrimônio ou estão em fase ativa de construção. O diagnóstico inicial ajuda a definir se faz sentido para o seu momento — sem compromisso.",
  },
  {
    q: "Vocês vendem produtos de bancos ou corretoras?",
    a: "Não. A Lion Gold é totalmente independente. Recebemos exclusivamente do cliente, o que elimina qualquer conflito de interesse. Nossa recomendação é 100% orientada ao seu objetivo.",
  },
  {
    q: "Como é cobrado o serviço?",
    a: "O modelo é definido após o diagnóstico, conforme o escopo e a complexidade do seu patrimônio. Tudo é transparente e acordado antes de qualquer início — sem surpresas.",
  },
  {
    q: "Vocês aplicam o dinheiro para mim?",
    a: "A Lion Gold atua como consultoria estratégica. Definimos juntos a estratégia e a alocação; a execução fica sempre sob seu controle, nas instituições que você escolher. Você nunca perde a guarda do seu patrimônio.",
  },
  {
    q: "Com que frequência há revisões?",
    a: "Definimos um calendário de revisões no início do trabalho — normalmente trimestrais, com ajustes extraordinários quando o mercado ou a sua situação exigirem. Acompanhamento é parte do método, não um extra.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. Tratamos todas as informações com sigilo absoluto e usamos apenas dados necessários para a estratégia. Nada é compartilhado com terceiros sem sua autorização expressa.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-bg-3 transition-colors hover:border-white/15">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold text-ink sm:text-lg">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-gold"
        >
          <IconChevron size={22} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-ink-muted">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-white/5 bg-bg-2 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <Eyebrow>Dúvidas</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-tight text-ink">
            Perguntas{" "}
            <em className="font-serif">frequentes</em>
          </h2>
          <p className="mt-5 text-lg text-ink-muted">
            Tudo que você precisa saber antes de dar o primeiro passo.
          </p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <FaqItem q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
