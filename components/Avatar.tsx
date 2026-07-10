import { IconChevron } from "./Icons";

/** Avatar com iniciais — alternativa elegante a foto (sem dependência de imagens externas) */
const GRADIENTS = [
  "from-gold to-gold-2",
  "from-navy to-navy-2",
  "from-[#2a2a2a] to-gold-2",
  "from-gold-2 to-[#1a1a2e]",
];

export function Avatar({
  name,
  size = 56,
  idx = 0,
}: {
  name: string;
  size?: number;
  idx?: number;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
  const grad = GRADIENTS[idx % GRADIENTS.length];

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${grad} ring-1 ring-white/15`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="font-display font-bold text-white"
        style={{ fontSize: size * 0.36 }}
      >
        {initials}
      </span>
    </div>
  );
}

/** Estrelas de avaliação */
export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M12 2l3 6.5 7 .9-5 4.8 1.2 7L12 18l-6.2 3.2L7 14.2 2 9.4l7-.9L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/** Tag/eyebrow de seção — label editorial dourada */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
      <span className="h-px w-6 bg-gold/60" />
      {children}
    </span>
  );
}

/** Marca pequena de seção */
export function SectionMark({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted/60">
      {children}
    </span>
  );
}

/** Divisor sutil com ícone de seta */
export function SectionDivider() {
  return (
    <div className="flex justify-center py-2 text-ink-muted/40">
      <IconChevron size={22} />
    </div>
  );
}
