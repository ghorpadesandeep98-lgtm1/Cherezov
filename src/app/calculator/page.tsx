import type { Metadata } from 'next';
import { Audiences } from '@/components/v3/Audiences';
import { CaseStudy } from '@/components/v3/CaseStudy';
import { Contacts } from '@/components/v3/Contacts';
import { Header } from '@/components/v3/Header';
import { OneScreen } from '@/components/v3/OneScreen';
import { Questions } from '@/components/v3/Questions';

/**
 * Страница инструмента: «Калькулятор девелопера».
 *
 * Собрана из тех же блоков, что и главная, но в другом порядке и с другой
 * вершиной: здесь человек уже знает, чего хочет, и ему нужен не рассказ о
 * подходе, а сам инструмент — пять вопросов, демонстрационный экран модели,
 * кому это нужно и доказательство на кейсе.
 */

const TITLE = 'Калькулятор девелопера — модель предпроектной оценки участка';
const DESCRIPTION =
  'Инструмент, в котором земля, продукт, экономика и сценарии живут в одной модели: ' +
  'площади, сроки, себестоимость, выручка и NPV. Отвечает на вопрос, стоит ли заходить ' +
  'в участок и по какой цене.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/calculator' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/calculator',
    siteName: 'Культура девелопмента',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <Questions />
      <OneScreen />
      <Audiences />
      <CaseStudy />
      <Contacts />
    </>
  );
}
