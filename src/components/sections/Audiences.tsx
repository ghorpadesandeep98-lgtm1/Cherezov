import type { CSSProperties, ReactNode } from 'react';
import styles from './Audiences.module.css';

type Paper = 'light' | 'salad' | 'dark' | 'forest';

type Sheet = {
  file: string;
  paper: Paper;
  /** откуда лист влетает и как развёрнут по осям */
  dx: number;
  dy: number;
  rx: number;
  ry: number;
  delay: number;
  body: ReactNode;
};

const PAPER_CLASS: Record<Paper, string> = {
  light: styles.paperLight,
  salad: styles.paperSalad,
  dark: styles.paperDark,
  forest: styles.paperForest,
};

const R = (cls: string, width?: string) => <span className={cls} style={width ? { width } : undefined} />;

const miniBar = (height: string, background: string) => (
  <span className={styles.miniBar} style={{ height, background }} />
);

/* Шестнадцать подписанных Excel-файлов — со всех сторон, непрерывно */
const SHEETS: Sheet[] = [
  {
    file: 'Отчёт.xlsx',
    paper: 'light',
    dx: -520,
    dy: -250,
    rx: 12,
    ry: -20,
    delay: 0,
    body: (
      <>
        {R(styles.ruleAccent, '58%')}
        {R(styles.rule)}
        {R(styles.rule)}
        {R(styles.rule, '72%')}
      </>
    ),
  },
  {
    file: 'Данные_участка.xlsx',
    paper: 'light',
    dx: 540,
    dy: -230,
    rx: -10,
    ry: 18,
    delay: 0.7,
    body: <span className={styles.figureBig}>48 %</span>,
  },
  {
    file: 'Показатели.xlsx',
    paper: 'salad',
    dx: -580,
    dy: 180,
    rx: -14,
    ry: -16,
    delay: 1.4,
    body: (
      <div className={styles.miniBars}>
        {miniBar('40%', 'rgba(63,203,132,.4)')}
        {miniBar('66%', 'rgba(63,203,132,.55)')}
        {miniBar('52%', 'rgba(63,203,132,.4)')}
        {miniBar('88%', 'var(--kd-green-mid)')}
        {miniBar('72%', 'rgba(63,203,132,.5)')}
      </div>
    ),
  },
  {
    file: 'Смета_СМР.xlsx',
    paper: 'light',
    dx: 560,
    dy: 210,
    rx: 12,
    ry: 22,
    delay: 2.1,
    body: (
      <>
        {R(styles.rule)}
        {R(styles.rule, '80%')}
        {R(styles.rule)}
        {R(styles.rule, '64%')}
        <span className={styles.figureGreen} style={{ fontSize: 22 }}>
          1,9 млрд ₽
        </span>
      </>
    ),
  },
  {
    file: 'Продажи_план.xlsx',
    paper: 'light',
    dx: -80,
    dy: -330,
    rx: 16,
    ry: -6,
    delay: 2.8,
    body: (
      <>
        {R(styles.ruleAccent, '46%')}
        {R(styles.rule)}
        <span className={styles.figure}>1 240 кв.</span>
      </>
    ),
  },
  {
    file: 'Финмодель_v7.xlsx',
    paper: 'light',
    dx: 120,
    dy: 340,
    rx: -16,
    ry: 8,
    delay: 3.5,
    body: (
      <>
        {R(styles.ruleAccent, '66%')}
        {R(styles.rule)}
        {R(styles.rule, '54%')}
        <span className={styles.figureGreen} style={{ fontSize: 22 }}>
          IRR 24,6 %
        </span>
      </>
    ),
  },
  {
    file: 'Риски.xlsx',
    paper: 'dark',
    dx: -620,
    dy: -40,
    rx: 6,
    ry: -24,
    delay: 4.2,
    body: (
      <>
        {R(styles.ruleDark)}
        {R(styles.ruleDark, '70%')}
        <span className={styles.figureLight}>12 рисков</span>
      </>
    ),
  },
  {
    file: 'ТЭП.xlsx',
    paper: 'light',
    dx: 620,
    dy: -20,
    rx: -8,
    ry: 24,
    delay: 4.9,
    body: (
      <>
        {R(styles.rule)}
        {R(styles.rule, '76%')}
        {R(styles.rule, '58%')}
        <span className={styles.figure}>28 450 м²</span>
      </>
    ),
  },
  {
    file: 'Кэшфлоу.xlsx',
    paper: 'salad',
    dx: -300,
    dy: 320,
    rx: -12,
    ry: -14,
    delay: 5.6,
    body: <span className={styles.figureRuble}>₽</span>,
  },
  {
    file: 'Допущения.xlsx',
    paper: 'light',
    dx: 340,
    dy: -320,
    rx: 14,
    ry: 16,
    delay: 6.3,
    body: (
      <>
        {R(styles.rule)}
        {R(styles.rule, '62%')}
        {R(styles.rule)}
        <span className={styles.figure} style={{ fontSize: 18 }}>
          v7 final
        </span>
      </>
    ),
  },
  {
    file: 'Бюджет_проекта.xlsx',
    paper: 'light',
    dx: -660,
    dy: 120,
    rx: 8,
    ry: 26,
    delay: 0.35,
    body: (
      <>
        {R(styles.rule)}
        {R(styles.rule, '72%')}
        <span className={styles.figure}>2,4 млрд ₽</span>
      </>
    ),
  },
  {
    file: 'График_финанс.xlsx',
    paper: 'light',
    dx: 560,
    dy: 280,
    rx: -14,
    ry: -18,
    delay: 1.05,
    body: (
      <div className={styles.miniBars4}>
        {miniBar('30%', 'rgba(63,203,132,.35)')}
        {miniBar('52%', 'rgba(63,203,132,.45)')}
        {miniBar('74%', 'var(--kd-salad)')}
        {miniBar('96%', 'var(--kd-green-deep)')}
      </div>
    ),
  },
  {
    file: 'Себестоимость.xlsx',
    paper: 'salad',
    dx: 120,
    dy: -420,
    rx: 18,
    ry: 8,
    delay: 1.75,
    body: (
      <>
        {R(styles.ruleSoft)}
        {R(styles.ruleSoft, '64%')}
        <span className={styles.figureGreen}>86 400 ₽/м²</span>
      </>
    ),
  },
  {
    file: 'Кредит_банк.xlsx',
    paper: 'light',
    dx: -140,
    dy: 440,
    rx: -16,
    ry: 12,
    delay: 2.45,
    body: (
      <>
        {R(styles.rule)}
        {R(styles.rule, '56%')}
        <span className={styles.figure}>ставка 8,4 %</span>
      </>
    ),
  },
  {
    file: 'Сценарии_v3.xlsx',
    paper: 'forest',
    dx: 700,
    dy: -160,
    rx: 10,
    ry: -24,
    delay: 3.15,
    body: (
      <>
        {R(styles.ruleDark)}
        {R(styles.ruleDark, '66%')}
        <span className={styles.figureLight}>3 сценария</span>
      </>
    ),
  },
  {
    file: 'Темпы_продаж.xlsx',
    paper: 'light',
    dx: -620,
    dy: -420,
    rx: -10,
    ry: 22,
    delay: 3.85,
    body: (
      <>
        {R(styles.ruleAccent, '70%')}
        {R(styles.rule)}
        <span className={styles.figure}>42 кв./мес</span>
      </>
    ),
  },
];

const CORE_BARS = [
  { height: '38%', background: 'var(--kd-mint-veil)' },
  { height: '56%', background: 'var(--kd-mint-veil)' },
  { height: '48%', background: 'linear-gradient(180deg,#c2f07a,var(--kd-salad))' },
  { height: '72%', background: 'linear-gradient(180deg,#c2f07a,var(--kd-salad))' },
  { height: '64%', background: 'linear-gradient(180deg,#2f7f5c,var(--kd-green-deep))' },
  { height: '100%', background: 'linear-gradient(180deg,#2f7f5c,var(--kd-green-deep))' },
];

function ExcelSheet({ sheet }: { sheet: Sheet }) {
  const dark = sheet.paper === 'dark' || sheet.paper === 'forest';
  const style = {
    '--dx': `${sheet.dx}px`,
    '--dy': `${sheet.dy}px`,
    '--rx': `${sheet.rx}deg`,
    '--ry': `${sheet.ry}deg`,
    animationDelay: `${sheet.delay}s`,
  } as CSSProperties;

  return (
    <div className={PAPER_CLASS[sheet.paper]} style={style} aria-hidden="true">
      <span className={styles.sheetHead}>
        <span className={dark ? styles.brandDark : styles.brand}>
          <span className={dark ? styles.brandIconDark : styles.brandIcon}>X</span>
          EXCEL
        </span>
        <span className={dark ? styles.fileNameDark : styles.fileName}>{sheet.file}</span>
      </span>
      {sheet.body}
    </div>
  );
}

export function Audiences() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>
            Для тех, кто
            <br />
            отвечает за деньги.
            <br />
            <span className={styles.titleTail}>А не за файл Excel</span>
          </h2>
          <p className={styles.headLead}>
            Продукт нужен тем, кто принимает решение и несёт ответственность.
          </p>
        </div>

        <div className={styles.board}>
          <div className={styles.pills}>
            <span className={styles.pill}>Девелоперы</span>
            <span className={styles.pillAccent}>Собственники земли</span>
            <span className={styles.pill}>Инвесторы</span>
            <span className={styles.pill}>Региональные команды</span>
          </div>

          <span className={styles.claim}>
            Вы работаете с десятками файлов —{' '}
            <span className={styles.claimAccent}>а модель должна быть одна</span>
          </span>

          <div className={styles.scene}>
            {SHEETS.map((s) => (
              <ExcelSheet key={s.file} sheet={s} />
            ))}

            {/* Экран модели: всё сходится сюда */}
            <div className={styles.coreLayer}>
              <div className={styles.coreFloat}>
                <div className={styles.coreGlow} />
                <div className={styles.coreCast} />
                <div className={styles.core}>
                  <div className={styles.sheenClip}>
                    <span className={styles.sheen} />
                  </div>

                  <div className={styles.coreHead}>
                    <span className={styles.coreDot} />
                    <span className={styles.coreHeadLabel}>ОДНА МОДЕЛЬ ПРОЕКТА</span>
                    <span className={styles.coreHeadTime}>обновлено сейчас</span>
                  </div>

                  <div className={styles.coreBody}>
                    <span className={styles.coreTitle}>Калькулятор девелопмента</span>

                    <div className={styles.coreKpis}>
                      <div className={styles.coreKpi}>
                        <div className={styles.coreKpiValueGreen}>24,6 %</div>
                        <div className={styles.coreKpiLabel}>IRR</div>
                      </div>
                      <div className={styles.coreKpi}>
                        <div className={styles.coreKpiValue}>700 млн</div>
                        <div className={styles.coreKpiLabel}>прибыль</div>
                      </div>
                      <div className={styles.coreKpi}>
                        <div className={styles.coreKpiValue}>28 450</div>
                        <div className={styles.coreKpiLabel}>м² продаж</div>
                      </div>
                    </div>

                    <div className={styles.coreChart}>
                      {CORE_BARS.map((b, i) => (
                        <div
                          key={i}
                          className={styles.coreBar}
                          style={{
                            height: b.height,
                            background: b.background,
                            animationDelay: `${i * 0.18}s`,
                          }}
                        />
                      ))}
                    </div>

                    <div className={styles.coreFoot}>
                      <span className={styles.coreFootLeft}>14 источников данных</span>
                      <span className={styles.coreFootRight}>собрано в одну модель</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.compareLabel}>сравнение</div>
        <div className={styles.compare}>
          <div className={styles.compareExcel}>
            <span className={styles.compareTitle}>Excel-модель</span>
            <div className={styles.compareList}>
              {['Живёт у автора', 'Ошибки скрыты в допущениях', 'Решение сложно защитить'].map(
                (t) => (
                  <span key={t} className={styles.compareItem}>
                    <span className={styles.compareDash} />
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className={styles.compareCalc}>
            <span className={styles.compareTitleAccent}>Калькулятор девелопера</span>
            <div className={styles.compareList}>
              {[
                'Логика прозрачна всей команде',
                'Слабые места видны на экране',
                'Решение проще защищать цифрами',
              ].map((t) => (
                <span key={t} className={styles.compareItemLight}>
                  <span className={styles.compareDot} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
