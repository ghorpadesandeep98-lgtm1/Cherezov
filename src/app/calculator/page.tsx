import type { Metadata } from 'next';
import { Audiences } from '@/components/v3/Audiences';
import { CaseStudy } from '@/components/v3/CaseStudy';
import { Contacts } from '@/components/v3/Contacts';
import { Faq } from '@/components/v3/Faq';
import { Header } from '@/components/v3/Header';
import { OneScreen } from '@/components/v3/OneScreen';
import { Questions } from '@/components/v3/Questions';
import { PageIntro } from '@/components/v3/calculator/PageIntro';
import { JsonLd } from '@/components/seo/JsonLd';
import { CALCULATOR_FAQ } from '@/data/v3/content';

/**
 * Страница инструмента: «Калькулятор девелопера».
 *
 * Собрана из тех же блоков, что и главная, но в другом порядке и с другой
 * вершиной: здесь человек уже знает, чего хочет, и ему нужен не рассказ о
 * подходе, а сам инструмент — пять вопросов, демонстрационный экран модели,
 * кому это нужно и доказательство на кейсе.
 *
 * Вопрос-ответы и FAQPage стоят здесь, а не на главной: это вопросы про саму
 * предпроектную оценку, и разметка должна лежать на странице с этим текстом.
 */

const TITLE = 'Калькулятор девелопера — модель предпроектной оценки участка';
/**
 * Описание переписано 23.09.2026 по гипотезе аналитика от 22.09: `/calculator` —
 * единственная содержательная страница сайта в индексе Яндекса, и сниппет
 * описывал инструмент, ни словом не упоминая целевое действие. Целевое действие
 * должно оставаться в первых 120 символах. `title` намеренно не трогаем:
 * одна правка — одна переменная, иначе результат нечем будет объяснить.
 */
const DESCRIPTION =
  'Разбираем конкретный участок: сколько на нём можно построить, за какие деньги ' +
  'и стоит ли в него заходить. Земля, продукт, экономика и сценарии — в одной модели. ' +
  'Пришлите свой участок на разбор.';

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
      <PageIntro />
      <Questions />
      <OneScreen />
      <Audiences />
      <CaseStudy />
      <Faq
        items={CALCULATOR_FAQ}
        title="Что спрашивают про предпроектную оценку"
        lead="Прямые ответы на вопросы, с которыми приходят чаще всего: чем предпроектная оценка отличается от консалтинга, как считаются цена входа и обоснование цены земли, что такое квартирография и GBA, кто такой fee-девелопер, чем мастер-план отличается от проекта планировки территории и что проверяет банк в модели проекта."
      />
      <Contacts />
      <JsonLd faq={CALCULATOR_FAQ} path="/calculator" />
    </>
  );
}
