import Link from "next/link";
import { Logo, IconMail, IconPhone } from "./Icons";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-bg-2">
      {/* gold marquee band */}
      <div className="overflow-hidden border-b border-white/10 bg-gold py-3">
        <div className="flex whitespace-nowrap">
          <span className="animate-marquee px-4 text-xs font-bold uppercase tracking-[0.15em] text-[#0a0a0a]">
            Estratégia Patrimonial · Independência · Dados · Longo Prazo · Preservação · Multiplicação · Proteção · Lion Gold
          </span>
          <span className="animate-marquee px-4 text-xs font-bold uppercase tracking-[0.15em] text-[#0a0a0a]">
            Estratégia Patrimonial · Independência · Dados · Longo Prazo · Preservação · Multiplicação · Proteção · Lion Gold
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* marca */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="font-display text-lg font-bold tracking-tight text-ink">
                Lion<span className="text-gold"> Gold</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm text-ink-muted">
              Consultoria financeira independente. Estratégia patrimonial de
              elite, baseada em dados — não em emoção.
            </p>
          </div>

          {/* contato */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-ink">
              Contato
            </h3>
            <a
              href="mailto:blinconl@gmail.com"
              className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-gold"
            >
              <IconMail size={18} /> blinconl@gmail.com
            </a>
            <a
              href="tel:+5511999999999"
              className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-gold"
            >
              <IconPhone size={18} /> +55 (11) 99999-9999
            </a>
          </div>

          {/* navegação */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-ink">
              Navegação
            </h3>
            <Link href="/#sobre" className="text-sm text-ink-muted transition-colors hover:text-gold">
              Sobre
            </Link>
            <Link href="/#metodologia" className="text-sm text-ink-muted transition-colors hover:text-gold">
              Metodologia
            </Link>
            <Link href="/#depoimentos" className="text-sm text-ink-muted transition-colors hover:text-gold">
              Depoimentos
            </Link>
            <Link href="/#contato" className="text-sm text-ink-muted transition-colors hover:text-gold">
              Contato
            </Link>
          </div>
        </div>

        {/* disclaimer */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-ink-muted/70">
            <strong className="text-ink-muted">Disclaimer:</strong> As
            informações apresentadas neste site têm caráter educativo e
            informativo, não constituindo recomendação de investimento
            individualizada. Investimentos envolvem riscos e a rentabilidade
            passada não garante resultados futuros. Consulte um profissional
            certificado antes de tomar decisões. Lion Gold Consultoria — CNPJ
            XX.XXX.XXX/0001-XX.
          </p>
          <p className="mt-4 text-xs text-ink-muted/60">
            © {new Date().getFullYear()} Lion Gold Consultoria. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
