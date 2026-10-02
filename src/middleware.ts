import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CANONICAL_HOST } from '@/lib/site';

/**
 * Закрываем от индексации все хосты, кроме канонического.
 *
 * Зачем. Сайт отвечает как минимум на трёх адресах: боевой домен, технический
 * `cultdev.vercel.app` и preview-адреса Vercel. Содержимое на них одинаковое,
 * поэтому поисковик видит дубли и сам выбирает, какую копию показывать; выбрать
 * он может не ту, а ссылочный вес делится между копиями.
 *
 * Почему заголовком, а не через robots.txt. `robots.txt` на всех этих адресах один
 * и тот же файл — `Disallow: /` в нём закрыл бы и основной сайт. `X-Robots-Tag`
 * отдаётся в ответе конкретного хоста, поэтому им можно разделить домены.
 * Именно поэтому `src/app/robots.ts` здесь не трогаем.
 *
 * Почему не редирект. Редирект с `*.vercel.app` на домен пришлось бы держать
 * в коде вместе со списком хостов и он ломал бы preview-деплои, на которых
 * правки как раз и смотрят. Задача — убрать дубль из индекса, а не запретить
 * открывать адрес.
 *
 * `nofollow` рядом с `noindex` — чтобы робот не обходил по ссылкам дубля
 * остальные его страницы и не заводил в индекс новые копии.
 *
 * Если `CANONICAL_HOST` пуст (переменная `NEXT_PUBLIC_SITE_URL` не задана или
 * указывает на localhost), заголовок не ставится нигде: см. комментарий
 * к `CANONICAL_HOST` в `src/lib/site.ts`.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!CANONICAL_HOST) return response;

  // Заголовок Host приходит с портом (`example.com:443`) — сравниваем только имя.
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();
  if (host && host !== CANONICAL_HOST) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  /*
   * Только документы. Статика `_next/static`, картинки `_next/image` и файлы
   * из `public/` в индекс как страницы не попадают, а лишний вызов middleware
   * на каждый ассет — это задержка на ровном месте.
   */
  matcher: ['/((?!_next/static|_next/image|assets/|favicon.ico).*)'],
};
