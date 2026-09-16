import Script from 'next/script';

/**
 * Яндекс.Метрика. Счётчик подключается, только если задан
 * NEXT_PUBLIC_YANDEX_METRIKA_ID — без номера компонент ничего не рендерит,
 * поэтому в разработке и на превью-стендах статистика не пишется.
 *
 * Вебвизор включён: он записывает действия на странице — движение курсора, клики,
 * прокрутку, — чтобы видеть, где посетитель останавливается и почему не доходит
 * до формы. Содержимое полей ввода при этом не записывается.
 *
 * Это обработка данных посетителя, поэтому она описана в политике
 * конфиденциальности (раздел «Файлы cookie и веб-аналитика»). Выключаете Вебвизор
 * здесь — поправьте и текст политики, иначе сайт обещает одно, а делает другое.
 */
export function YandexMetrika() {
  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!id) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${JSON.stringify(id)}, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });`}
      </Script>
      <noscript>
        <div>
          {/* Пиксель для браузеров без JS — обычный img, next/image здесь не нужен. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
