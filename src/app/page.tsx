import { About } from '@/components/sections/About';
import { Audiences } from '@/components/sections/Audiences';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { Calculator } from '@/components/sections/Calculator';
import { Contacts } from '@/components/sections/Contacts';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { LeadForm } from '@/components/sections/LeadForm';
import { Lifecycle } from '@/components/sections/Lifecycle';
import { OneScreen } from '@/components/sections/OneScreen';
import { SectionsTable } from '@/components/sections/SectionsTable';
import { Team } from '@/components/sections/Team';
import { Value } from '@/components/sections/Value';

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Lifecycle />
      <Calculator />
      <Audiences />
      <OneScreen />
      <SectionsTable />
      <Value />
      <BeforeAfter />
      <Team />
      <LeadForm />
      <Contacts />
      <Footer />
    </>
  );
}
