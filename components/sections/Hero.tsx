"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../Button";
import { HeroBackground } from "../HeroBackground";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-28 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                <span className="h-px w-8 bg-gold/60" />
                Consultoria patrimonial de elite
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-light leading-[1.03] tracking-tight text-ink"
            >
              Preserve.
              <br />
              <em className="font-serif">Multiplique.</em>
              <br />
              Proteja.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted sm:text-xl"
            >
              Estratégia personalizada para quem já construiu patrimônio — e não
              pode desperdiçá-lo com decisões emocionais.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/triagem" size="lg" variant="gold">
                Agendar diagnóstico
              </Button>
              <Button href="/#metodologia" variant="outline" size="lg">
                Conhecer metodologia
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8 text-sm text-ink-muted"
            >
              <div>
                <div className="font-display text-2xl font-semibold text-gold">
                  +12 anos
                </div>
                de mercado
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="font-display text-2xl font-semibold text-gold">
                  +R$ 800M
                </div>
                orientados
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="font-display text-2xl font-semibold text-gold">
                  +300
                </div>
                clientes
              </div>
            </motion.div>
          </motion.div>

          {/* Hero image — editorial portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop"
                alt="Executivo experiente em escritório de alta classe"
                fill
                className="object-cover img-dramatic"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent" />

              {/* floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-8 left-8 rounded-2xl border border-white/10 bg-bg/80 p-5 backdrop-blur-md"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold">
                  Crescimento projetado
                </p>
                <p className="mt-1 font-display text-3xl font-semibold text-ink">
                  +147%
                </p>
                <p className="text-xs text-ink-muted">Horizonte 10 anos</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted/50 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-widest">Role</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-white/20 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
