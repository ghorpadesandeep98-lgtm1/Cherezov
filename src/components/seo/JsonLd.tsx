import type { FaqItem } from '@/components/v3/Faq';
import { CONTACTS, FAQ } from '@/data/v3/content';
import { SITE_URL } from '@/lib/site';

/**
 * Микроразметка Schema.org.
 *
 * Зачем: поисковики и ИИ-ассистенты берут из неё готовые факты о компании и
 * прямые ответы на вопросы. Без разметки они разбирают вёрстку наугад и чаще
 * цитируют чужие сайты.
 *
 * Данные берём из того же источника, что и вёрстка (data/v3/content), чтобы
 * разметка не разъезжалась с тем, что видит человек на странице.
 */

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Культура девелопмента',
  alternateName: 'Cultura Development',
  url: SITE_URL,
  description:
    'Земельный брокер и fee-девелопер: предпроектная оценка потенциала участка, ' +
    'девелоперский сценарий, архитектурная концепция и проектная документация.',
  telephone: CONTACTS.phone,
  email: CONTACTS.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Молодой Гвардии, 82, офис 418',
    addressLocality: 'Киров',
    addressCountry: 'RU',
  },
  areaServed: { '@type': 'Country', name: 'Россия' },
  sameAs: [CONTACTS.telegram],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Оценка девелоперского потенциала участка',
        description:
          'Земля, продукт, экономика и риски в одной модели: сценарии развития территории, ' +
          'цена входа и обоснованное решение о покупке.',
      },
    },
  ],
} as const;

/**
 * FAQPage собираем по той странице, на которой блок реально стоит: у разметки
 * и у вёрстки должен быть один и тот же текст, иначе поиск считает разметку
 * недостоверной. `path` — путь страницы, он же уникальный `@id`.
 *
 * В `text` уходит прямой ответ вместе с фактами для цитирования — ровно то,
 * что человек видит в раскрытом пункте.
 */
function faqPage(items: readonly FaqItem[], path: string) {
  const base = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${base}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [item.a, ...(item.facts ?? []), item.note ?? ''].filter(Boolean).join(' '),
      },
    })),
  };
}

type JsonLdProps = {
  /** Вопрос-ответы этой страницы. По умолчанию — общие вопросы с главной. */
  faq?: readonly FaqItem[];
  /** Путь страницы, на которой стоит блок: '/' или, например, '/calculator'. */
  path?: string;
};

export function JsonLd({ faq = FAQ, path = '/' }: JsonLdProps = {}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage(faq, path)) }}
      />
    </>
  );
}
