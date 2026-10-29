import type { Metadata } from 'next';
import { Contacts } from '@/components/v3/Contacts';
import { Faq } from '@/components/v3/Faq';
import { Header } from '@/components/v3/Header';
import { PzzFaqNote, PzzTerms } from '@/components/v3/pzz/Terms';
import { JsonLd } from '@/components/seo/JsonLd';
import { PZZ_FAQ } from '@/data/v3/content';

/**
 * Страница терминов: «ПЗЗ и ГПЗУ».
 *
 * Зачем отдельный адрес. Это первая страница сайта, которая целится в спрос,
 * измеренный в тысячах показов: «пзз это» — 5 117 в месяц по России, «что такое
 * гпзу» — 2 176 (Wordstat, 05.10.2026), тогда как самый частотный запрос
 * из прежнего списка даёт 390. Прямого ответа на оба вопроса у сайта не было.
 *
 * Собрана так же, как `/calculator`: шапка → интро с единственным `h1` →
 * текст → вопрос-ответы с `FAQPage` → форма. Блок вопрос-ответов берёт свой
 * массив `PZZ_FAQ`, и `@id` разметки собирается как `…/pzz-gpzu#faq` —
 * у каждой страницы своя разметка со своим текстом.
 */

const TITLE = 'ПЗЗ и ГПЗУ: что это и сколько можно построить на участке';
/**
 * 149 знаков, целевое действие в первых 120: дальше поиск строку обрезает.
 */
const DESCRIPTION =
  'Чем ПЗЗ отличается от ГПЗУ и как из них считается площадь будущей застройки. ' +
  'Пришлите кадастровый номер — разберём ваш участок.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/pzz-gpzu' },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    url: '/pzz-gpzu',
    siteName: 'Культура девелопмента',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function PzzGpzuPage() {
  return (
    <>
      <Header />
      <PzzTerms />
      <Faq
        items={PZZ_FAQ}
        title="Что спрашивают про ПЗЗ и ГПЗУ"
        lead="Прямые ответы на два вопроса, с которыми приходят чаще всего: что такое ПЗЗ и что такое ГПЗУ."
      />
      <PzzFaqNote />
      <Contacts />
      <JsonLd faq={PZZ_FAQ} path="/pzz-gpzu" />
    </>
  );
}
