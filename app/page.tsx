import { Hero } from "@/components/sections/Hero";
import { Lifecycle } from "@/components/sections/Lifecycle";
import { CoreProduct } from "@/components/sections/CoreProduct";
import { Audiences } from "@/components/sections/Audiences";
import { OneScreen } from "@/components/sections/OneScreen";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Lifecycle />
      <CoreProduct />
      <Audiences />
      <OneScreen />
      <CtaBand />
    </>
  );
}
