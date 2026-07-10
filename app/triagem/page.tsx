"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo, IconArrowRight, IconCheck, IconChevron } from "@/components/Icons";
import { QUESTIONS, TIMELINE_STEPS, type Answers } from "@/lib/triage-questions";

type StepKey = "objetivo" | "perfil" | "patrimônio" | "classes" | "urgência" | "contato" | "concluido";

const STEP_KEYS: StepKey[] = [
  "objetivo",
  "perfil",
  "patrimônio",
  "classes",
  "urgência",
  "contato",
  "concluido",
];

export default function TriagemPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-ink-muted">
          Carregando triagem...
        </div>
      }
    >
      <TriagemContent />
    </Suspense>
  );
}

function TriagemContent() {
  const router = useRouter();
  const search = useSearchParams();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    name: search?.get("name") ?? "",
    email: search?.get("email") ?? "",
    phone: search?.get("phone") ?? "",
    message: search?.get("message") ?? "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const stepKey = STEP_KEYS[step];

  function goNext() {
    setError("");
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEP_KEYS.length - 1));
  }
  function goBack() {
    setError("");
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  function validateCurrent(): boolean {
    if (stepKey === "objetivo" && !answers.objetivo) return setErr("Selecione uma opção");
    if (stepKey === "perfil" && !answers.perfil) return setErr("Selecione uma opção");
    if (stepKey === "patrimônio" && !answers.patrimonio) return setErr("Selecione uma faixa");
    if (stepKey === "classes" && (!answers.classes || answers.classes.length === 0))
      return setErr("Selecione ao menos uma classe");
    if (stepKey === "urgência" && !answers.urgencia) return setErr("Selecione uma opção");
    if (stepKey === "contato") {
      if (!answers.name.trim()) return setErr("Informe seu nome");
      if (!/^\S+@\S+\.\S+$/.test(answers.email)) return setErr("E-mail inválido");
      if (answers.phone.replace(/\D/g, "").length < 8) return setErr("Telefone inválido");
    }
    return true;
  }
  function setErr(msg: string) {
    setError(msg);
    return false;
  }

  function handleNext() {
    if (!validateCurrent()) return;
    if (stepKey === "contato") {
      submit();
    } else {
      goNext();
    }
  }

  async function submit() {
    setSubmitting(true);
    try {
      await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
      setDone(true);
      goNext(); // vai para tela concluido
      // auto-redirect após 6s
      setTimeout(() => router.push("/"), 6000);
    }
  }

  // teclado: Enter avança, Back volta (exceto no textarea)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "Enter") handleNext();
      if (e.key === "ArrowLeft") goBack();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, answers, done]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      {/* Header minimal */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="font-display text-base font-bold tracking-tight text-ink">
              Lion<span className="text-gold"> Gold</span>
            </span>
          </Link>
          <span className="text-xs text-ink-muted">
            Passo {Math.min(step + 1, 6)} de 6
          </span>
        </div>
      </header>

      {/* Timeline */}
      <Timeline step={step} done={done} />

      {/* Conteúdo */}
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {stepKey === "objetivo" && (
              <QuestionStep
                q={QUESTIONS.objetivo}
                selected={answers.objetivo}
                onSelect={(v) => setAnswers({ ...answers, objetivo: v })}
              />
            )}
            {stepKey === "perfil" && (
              <QuestionStep
                q={QUESTIONS.perfil}
                selected={answers.perfil}
                onSelect={(v) => setAnswers({ ...answers, perfil: v })}
              />
            )}
            {stepKey === "patrimônio" && (
              <QuestionStep
                q={QUESTIONS.patrimonio}
                selected={answers.patrimonio}
                onSelect={(v) => setAnswers({ ...answers, patrimonio: v })}
              />
            )}
            {stepKey === "classes" && (
              <MultiStep
                q={QUESTIONS.classes}
                selected={answers.classes ?? []}
                onToggle={(v) => {
                  const cur = answers.classes ?? [];
                  const next = cur.includes(v)
                    ? cur.filter((c) => c !== v)
                    : [...cur, v];
                  setAnswers({ ...answers, classes: next });
                }}
              />
            )}
            {stepKey === "urgência" && (
              <QuestionStep
                q={QUESTIONS.urgencia}
                selected={answers.urgencia}
                onSelect={(v) => setAnswers({ ...answers, urgencia: v })}
              />
            )}
            {stepKey === "contato" && (
              <ContactStep answers={answers} setAnswers={setAnswers} />
            )}
            {stepKey === "concluido" && <DoneStep answers={answers} />}
          </motion.div>
        </AnimatePresence>

        {/* erro + navegação */}
        {stepKey !== "concluido" && (
          <>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center text-sm text-gold"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition hover:text-ink disabled:opacity-30 disabled:hover:text-ink-muted"
              >
                <IconChevron size={18} className="rotate-90" />
                Voltar
              </button>

              {stepKey === "contato" ? (
                <button
                  onClick={handleNext}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-semibold text-white transition hover:bg-gold-2 disabled:opacity-60"
                >
                  {submitting ? "Enviando..." : "Concluir triagem"}
                  {!submitting && <IconArrowRight size={18} />}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-semibold text-white transition hover:bg-gold-2"
                >
                  Continuar
                  <IconArrowRight size={18} />
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ---------- Timeline ---------- */
function Timeline({ step, done }: { step: number; done: boolean }) {
  const activeIdx = done ? TIMELINE_STEPS.length : step;
  const progress = (activeIdx / (TIMELINE_STEPS.length - 1)) * 100;

  return (
    <div className="fixed top-16 z-40 w-full border-b border-white/5 bg-bg-2/60 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-5 py-5 sm:px-8">
        {/* linha de progresso */}
        <div className="relative mb-4 h-1 rounded-full bg-white/10">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-gold to-gold-2"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        {/* marcos */}
        <div className="flex justify-between gap-1">
          {TIMELINE_STEPS.map((label, i) => {
            const state = i < activeIdx ? "done" : i === activeIdx ? "active" : "todo";
            return (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <motion.div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold transition-colors ${
                    state === "done"
                      ? "border-gold bg-gold text-white"
                      : state === "active"
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-white/15 bg-transparent text-ink-muted/40"
                  }`}
                  animate={state === "active" ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {state === "done" ? <IconCheck size={12} /> : i + 1}
                </motion.div>
                <span
                  className={`hidden text-[10px] font-medium sm:block ${
                    state === "todo" ? "text-ink-muted/40" : "text-ink-muted"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Pergunta com radio cards ---------- */
type QuestionDef = {
  title: string;
  subtitle: string;
  options: { value: string; label: string; desc?: string }[];
};

function QuestionStep({
  q,
  selected,
  onSelect,
}: {
  q: QuestionDef;
  selected?: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
        {q.title}
      </h2>
      <p className="mt-3 text-base text-ink-muted">{q.subtitle}</p>

      <div className="mt-8 grid gap-3">
        {q.options.map((opt, i) => {
          const active = selected === opt.value;
          return (
            <motion.button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 4 }}
              className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                active
                  ? "border-gold bg-gold/10"
                  : "border-white/10 bg-white/[0.02] hover:border-gold/40"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  active ? "border-gold bg-gold" : "border-white/30"
                }`}
              >
                {active && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
              <span className="flex-1">
                <span className="block font-medium text-ink">{opt.label}</span>
                {opt.desc && (
                  <span className="block text-sm text-ink-muted">{opt.desc}</span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Pergunta multiselect ---------- */
function MultiStep({
  q,
  selected,
  onToggle,
}: {
  q: QuestionDef;
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
        {q.title}
      </h2>
      <p className="mt-3 text-base text-ink-muted">{q.subtitle}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {q.options.map((opt, i) => {
          const active = selected.includes(opt.value);
          return (
            <motion.button
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -2 }}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all ${
                active
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-white/15 bg-white/[0.02] text-ink-muted hover:border-gold/40 hover:text-ink"
              }`}
            >
              {active && <IconCheck size={15} />}
              {opt.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Confirmação de contato ---------- */
function ContactStep({
  answers,
  setAnswers,
}: {
  answers: Answers;
  setAnswers: (a: Answers) => void;
}) {
  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-ink placeholder:text-ink-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/40";

  return (
    <div>
      <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
        Confirme seus dados de contato
      </h2>
      <p className="mt-3 text-base text-ink-muted">
        Pré-preenchido do formulário. Ajuste se precisar — é por aqui que
        falaremos com você.
      </p>

      <div className="mt-8 space-y-4">
        <div>
          <label htmlFor="t-name" className="mb-1.5 block text-sm font-medium text-ink">
            Nome completo
          </label>
          <input
            id="t-name"
            type="text"
            value={answers.name}
            onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
            className={field}
            placeholder="Seu nome"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="t-email" className="mb-1.5 block text-sm font-medium text-ink">
              E-mail
            </label>
            <input
              id="t-email"
              type="email"
              value={answers.email}
              onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
              className={field}
              placeholder="voce@email.com"
            />
          </div>
          <div>
            <label htmlFor="t-phone" className="mb-1.5 block text-sm font-medium text-ink">
              Telefone
            </label>
            <input
              id="t-phone"
              type="tel"
              value={answers.phone}
              onChange={(e) => setAnswers({ ...answers, phone: e.target.value })}
              className={field}
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tela final ---------- */
function DoneStep({ answers }: { answers: Answers }) {
  const router = useRouter();
  const summary = [
    { label: "Objetivo", value: answers.objetivo },
    { label: "Perfil", value: answers.perfil },
    { label: "Patrimônio", value: answers.patrimonio },
    { label: "Classes", value: answers.classes?.join(", ") },
    { label: "Urgência", value: answers.urgencia },
    { label: "Nome", value: answers.name },
    { label: "E-mail", value: answers.email },
    { label: "Telefone", value: answers.phone },
  ].filter((s) => s.value);

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold"
      >
        <IconCheck size={40} />
      </motion.div>

      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Triagem concluída!
      </h2>
      <p className="mx-auto mt-4 max-w-md text-base text-ink-muted">
        Recebemos suas respostas, <strong className="text-ink">{answers.name}</strong>.
        Em breve entraremos em contato pelo e-mail ou telefone informado.
      </p>

      <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold">
          Resumo
        </p>
        <dl className="space-y-2">
          {summary.map((s) => (
            <div key={s.label} className="flex justify-between gap-4 text-sm">
              <dt className="text-ink-muted">{s.label}</dt>
              <dd className="text-right font-medium text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-6 text-xs text-ink-muted">
        Redirecionando para a página inicial em alguns segundos...
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-ink transition hover:border-gold hover:text-gold"
      >
        Voltar ao início
      </button>
    </div>
  );
}
