import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Solution } from "@/components/sections/Solution";
import { Differentials } from "@/components/sections/Differentials";
import { About } from "@/components/sections/About";
import { Methodology } from "@/components/sections/Methodology";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Pain />
        <Solution />
        <Differentials />
        <About />
        <Methodology />
        <Stats />
        <Testimonials />
        <Faq />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
