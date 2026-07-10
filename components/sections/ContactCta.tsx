"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Reveal } from "../Section";
import { Eyebrow } from "../Avatar";
import { Button } from "../Button";
import { IconArrowRight, IconCheck } from "../Icons";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY: FormState = { name: "", email: "", phone: "", message: "" };

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length > 10) {
    return digits.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, "($1) $2 $3-$4");
  }
  if (digits.length > 6) {
    return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }
  if (digits.length > 2) {
    return digits.replace(/^(\d{2})(\d*)$/, "($1) $2");
  }
  return digits;
}

export function ContactCta() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate() {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Informe seu nome";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "E-mail inválido";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8)
      e.phone = "Telefone inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const params = new URLSearchParams({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    });
    router.push(`/triagem?${params.toString()}`);
  }

  const field =
    "w-full rounded-xl border bg-bg-3 px-4 py-3 text-ink placeholder:text-ink-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/60 " +
    "border-white/10 focus:border-gold/40";

  return (
    <section
      id="contato"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[80%] -translate-x-1/2 rounded-full bg-gold/8 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-stretch gap-16 lg:grid-cols-2">
          {/* copy + imagem */}
          <Reveal className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-bg-3">
            <div className="relative aspect-[4/3] w-full shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2670&auto=format&fit=crop"
                alt="Reunião de consultoria financeira"
                fill
                className="object-cover img-dramatic"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-3 via-bg-3/70 to-transparent" />
            </div>
            <div className="p-8">
              <Eyebrow>Fale com um especialista</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.05] tracking-tight text-ink">
                Seu patrimônio não vai{" "}
                <em className="font-serif">
                  se resolver sozinho
                </em>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Agende um diagnóstico sem compromisso. Em poucos minutos você
                entende onde está e o que falta para chegar onde quer.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Diagnóstico inicial gratuito",
                  "Atendimento direto com o consultor",
                  "Sem vínculo, sem pressão — só clareza",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-ink">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <IconCheck size={13} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* formulário */}
          <Reveal delay={150}>
            <motion.form
              onSubmit={handleSubmit}
              className="flex h-full flex-col justify-center"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-ink"
                  >
                    Nome completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Seu nome"
                    className={field}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-gold">{errors.name}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-ink"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="voce@email.com"
                      className={field}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-gold">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-ink"
                    >
                      Telefone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: maskPhone(e.target.value) })
                      }
                      placeholder="(11) 99999-9999"
                      className={field}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-gold">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-ink"
                  >
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Conte brevemente seu objetivo..."
                    className={`${field} resize-none`}
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                variant="gold"
                className="mt-6 w-full"
              >
                Enviar
                <IconArrowRight size={18} />
              </Button>
              <p className="mt-3 text-center text-xs text-ink-muted">
                Após enviar, você completa um breve questionário de perfil.
              </p>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
