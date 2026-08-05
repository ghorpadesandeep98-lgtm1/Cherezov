import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProductsShowcase } from "@/components/sections/ProductsShowcase";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/content/site";

export const metadata: Metadata = {
  title: "Продукция",
  description: "Календари, книги, каталоги и упаковка на собственной производственной базе.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Что мы печатаем"
        title={
          <>
            Продукция,
            <br />
            собранная руками.
          </>
        }
        lead="От квартального календаря тиражом в сто экземпляров до книги в твёрдом переплёте с фольгой и футляром."
      >
        <Reveal delay={0.2} className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className="group bg-white/85 px-6 py-8 backdrop-blur transition-colors duration-500 hover:bg-lime"
            >
              <h2 className="text-[18px] font-bold tracking-tight">{p.title}</h2>
              <p className="mt-2 text-[13px] leading-snug text-graphite group-hover:text-ink/70">
                {p.short}
              </p>
            </a>
          ))}
        </Reveal>
      </PageHero>

      <ProductsShowcase eyebrow="Каталог направлений" />
      <Process />
      <CtaBand />
    </>
  );
}
