import type { Metadata } from "next";
import { Sora, Inter_Tight, Playfair_Display } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lion Gold Consultoria — Estratégia patrimonial de elite",
  description:
    "Consultoria financeira independente para preservar, multiplicar e proteger seu patrimônio. Metodologia proprietária, acompanhamento contínuo e decisões baseadas em dados — não em emoção.",
  keywords: [
    "consultoria financeira",
    "investimentos",
    "patrimônio",
    "aposentadoria",
    "planejamento financeiro",
  ],
  openGraph: {
    title: "Lion Gold Consultoria — Estratégia patrimonial de elite",
    description:
      "Seu patrimônio não pode esperar. Nem o mercado, nem a inflação. Diagnóstico, estratégia e acompanhamento contínuo.",
    type: "website",
    locale: "pt_BR",
    siteName: "Lion Gold Consultoria",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lion Gold Consultoria",
    description: "Estratégia patrimonial de elite.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${interTight.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
