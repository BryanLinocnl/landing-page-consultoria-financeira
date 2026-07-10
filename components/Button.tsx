import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "ghost" | "lime";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-transparent border border-gold text-ink hover:bg-gold/10 hover:-translate-y-0.5 shadow-[0_0_24px_-6px_rgba(201,169,98,0.35),inset_0_0_20px_-6px_rgba(201,169,98,0.12)] hover:shadow-[0_0_36px_-4px_rgba(201,169,98,0.55),inset_0_0_24px_-4px_rgba(201,169,98,0.18)]",
  gold:
    "bg-transparent border border-gold text-ink hover:bg-gold/10 hover:-translate-y-0.5 shadow-[0_0_24px_-6px_rgba(212,175,55,0.35),inset_0_0_20px_-6px_rgba(212,175,55,0.12)] hover:shadow-[0_0_36px_-4px_rgba(212,175,55,0.55),inset_0_0_24px_-4px_rgba(212,175,55,0.18)]",
  lime:
    "bg-gold text-[#0a0a0a] hover:bg-[#D4AF37] shadow-[0_8px_30px_-8px_rgba(201,169,98,0.45)] hover:shadow-[0_10px_40px_-6px_rgba(201,169,98,0.55)] hover:-translate-y-0.5",
  outline:
    "border border-white/20 text-ink hover:border-gold hover:text-gold hover:bg-white/5",
  ghost: "text-ink-muted hover:text-gold hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorRest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
