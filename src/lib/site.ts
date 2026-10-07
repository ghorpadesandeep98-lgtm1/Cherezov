/**
 * Абсолютный адрес сайта: нужен для canonical, Open Graph и sitemap.
 * Перед публикацией задайте NEXT_PUBLIC_SITE_URL в окружении хостинга —
 * иначе ссылки в разметке и карте сайта уедут на localhost.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
  /\/+$/,
  '',
);

/**
 * Хост канонического адреса без порта, например `www.cultdev.pro`.
 * Нужен middleware, чтобы отличить основной домен от дубля (`cultdev.vercel.app`,
 * preview-адреса Vercel, `cultdev.pro` без www).
 *
 * Пустая строка, если `NEXT_PUBLIC_SITE_URL` не задана, задана криво или указывает
 * на localhost. Это сделано намеренно: при пустом значении middleware не помечает
 * noindex вообще ничего. Ошибка в эту сторону оставляет дубль в индексе, ошибка
 * в другую — выбивает из индекса основной сайт, и стоит она несопоставимо дороже.
 */
export const CANONICAL_HOST = (() => {
  try {
    const { hostname } = new URL(SITE_URL);
    if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1') return '';
    return hostname.toLowerCase();
  } catch {
    return '';
  }
})();

/** Страницы, которые попадают в карту сайта. */
export const SITE_ROUTES = ['/', '/calculator', '/pzz-gpzu', '/privacy', '/consent'] as const;
