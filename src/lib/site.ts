/**
 * Абсолютный адрес сайта: нужен для canonical, Open Graph и sitemap.
 * Перед публикацией задайте NEXT_PUBLIC_SITE_URL в окружении хостинга —
 * иначе ссылки в разметке и карте сайта уедут на localhost.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
  /\/+$/,
  '',
);

/** Страницы, которые попадают в карту сайта. */
export const SITE_ROUTES = ['/', '/privacy', '/consent'] as const;
