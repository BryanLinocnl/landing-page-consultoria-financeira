import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-display text-7xl font-bold text-gold-gradient">
        404
      </span>
      <h1 className="font-display text-2xl font-semibold text-ink">
        Página não encontrada
      </h1>
      <p className="max-w-md text-ink-muted">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="rounded-full bg-gold px-6 py-3 font-semibold text-white transition hover:bg-gold-2"
      >
        Voltar ao início
      </Link>
    </main>
  );
}
