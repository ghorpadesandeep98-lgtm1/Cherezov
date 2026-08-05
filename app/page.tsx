import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Kpi } from "@/components/sections/Kpi";
import { PlatformShowcase } from "@/components/sections/PlatformShowcase";
import { ProductsShowcase } from "@/components/sections/ProductsShowcase";
import { Insight } from "@/components/sections/Insight";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Kpi />
      <PlatformShowcase />
      <ProductsShowcase />
      <Insight />
      <Process />
      <Faq />
      <CtaBand />
    </>
  );
}
