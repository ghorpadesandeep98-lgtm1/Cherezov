import { Audiences } from '@/components/v3/Audiences';
import { CaseStudy } from '@/components/v3/CaseStudy';
import { Contacts } from '@/components/v3/Contacts';
import { Faq } from '@/components/v3/Faq';
import { Header } from '@/components/v3/Header';
import { Hero } from '@/components/v3/Hero';
import { Lifecycle } from '@/components/v3/Lifecycle';
import { OneScreen } from '@/components/v3/OneScreen';
import { Optics } from '@/components/v3/Optics';
import { Process } from '@/components/v3/Process';
import { Proof } from '@/components/v3/Proof';
import { Questions } from '@/components/v3/Questions';

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <Questions />
      <Audiences />
      <OneScreen />
      <Lifecycle />
      <CaseStudy />
      <Process />
      <Optics />
      <Proof />
      <Faq />
      <Contacts />
    </>
  );
}
