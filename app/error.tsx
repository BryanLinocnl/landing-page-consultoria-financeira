"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-display text-3xl font-bold text-gold-gradient">
        Algo deu errado.
      </h1>
      <p className="max-w-md text-ink-muted">
        Um erro inesperado ocorreu ao processar sua solicitação.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-gold px-6 py-3 font-semibold text-white transition hover:bg-gold-2"
      >
        Tentar novamente
      </button>
    </main>
  );
}
