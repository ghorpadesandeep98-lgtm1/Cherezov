/* Проект не использует PostCSS-плагины (стили — на CSS-модулях и токенах).
   Файл нужен, чтобы Next не поднимался за конфигом в корень репозитория:
   там лежит postcss.config.mjs от Tailwind-версии сайта. */
const config = { plugins: {} };

export default config;
