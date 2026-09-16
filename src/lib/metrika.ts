/**
 * Цели Яндекс.Метрики.
 *
 * Форма заявки уходит через fetch на /api/lead, обычной отправки формы браузер
 * не делает — автоматическая цель «Отправка формы» такую конверсию не видит.
 * Поэтому успешную заявку отмечаем вручную: ym(<счётчик>, 'reachGoal', 'lead_form').
 *
 * Если счётчик не подключён (нет NEXT_PUBLIC_YANDEX_METRIKA_ID) или скрипт ещё
 * не загрузился, вызов молча ничего не делает — форма из-за аналитики не ломается.
 */

/** Идентификатор цели в Метрике. Такой же должен стоять в JS-цели счётчика. */
export const LEAD_GOAL = 'lead_form';

type YandexMetrikaFn = (counter: string, action: string, goal?: string) => void;

export function reachGoal(goal: string = LEAD_GOAL): void {
  if (typeof window === 'undefined') return;

  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!id) return;

  const ym = (window as unknown as { ym?: YandexMetrikaFn }).ym;
  if (typeof ym !== 'function') return;

  try {
    ym(id, 'reachGoal', goal);
  } catch {
    // Аналитика не должна мешать пользователю: молчим.
  }
}
