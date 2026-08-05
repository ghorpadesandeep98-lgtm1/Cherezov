"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Status = "idle" | "sending" | "done";

/**
 * TODO(backend): приём заявок не подключён.
 * Здесь ожидается POST на CRM/почтовый шлюз — до этого форма работает
 * только на клиенте и ничего никуда не отправляет.
 */
async function submitLead(data: Record<string, string>) {
  await new Promise((r) => setTimeout(r, 700));
  if (process.env.NODE_ENV === "development") console.info("lead", data);
}

const inputClass =
  "w-full rounded-2xl border border-line bg-white px-5 py-4 text-[15px] outline-none transition-colors duration-300 placeholder:text-silver focus:border-ink";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  return (
    <form
      className="relative"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
        setStatus("sending");
        await submitLead(data);
        setStatus("done");
        form.reset();
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sm:col-span-1">
          <span className="sr-only">Имя</span>
          <input name="name" required placeholder="Имя" className={inputClass} />
        </label>
        <label className="sm:col-span-1">
          <span className="sr-only">Телефон или почта</span>
          <input name="contact" required placeholder="Телефон или почта" className={inputClass} />
        </label>
        <label className="sm:col-span-2">
          <span className="sr-only">Задача</span>
          <textarea
            name="task"
            rows={4}
            placeholder="Что печатаем: продукт, тираж, сроки"
            className={`${inputClass} resize-none`}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-ink px-8 py-4 text-[15px] font-semibold text-white transition-colors duration-500 hover:bg-lime hover:text-ink disabled:opacity-60"
        >
          {status === "sending" ? "Отправляем…" : "Отправить заявку"}
        </button>

        <AnimatePresence>
          {status === "done" && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[14px] text-graphite"
            >
              Заявка принята — ответим в рабочее время.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-5 max-w-md text-[12px] leading-relaxed text-silver">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
      </p>
    </form>
  );
}
