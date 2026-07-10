import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Triagem — Lion Gold Consultoria",
  description:
    "Briefing rápido para qualificar seu perfil de investidor e direcionar a estratégia certa para você.",
  robots: { index: false, follow: false },
};

export default function TriagemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="triagem-layout">{children}</div>;
}
