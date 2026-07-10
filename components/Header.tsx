"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { Logo, IconMenu, IconClose } from "./Icons";

const NAV = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Metodologia", href: "/#metodologia" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contato", href: "/#contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={34} />
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            Lion<span className="text-gold"> Gold</span>
          </span>
        </Link>

        {/* desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href="/triagem" size="sm" variant="gold">
            Fale com um especialista
          </Button>
        </div>

        {/* mobile toggle */}
        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="text-ink md:hidden"
        >
          {open ? <IconClose size={26} /> : <IconMenu size={26} />}
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                href="/triagem"
                size="md"
                variant="gold"
                className="mt-2"
                onClick={() => setOpen(false)}
              >
                Fale com um especialista
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
