"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, DUR, EASE_IO, prefersReducedMotion, revealAll } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { useGsapContext } from "@/lib/useGsapContext";
import { FAQ_ITEMS } from "@/data/site";

/** FAQ accordéon : height auto via GSAP, chevron 0 -> 180deg (0.35s), une seule ouverte à la fois. */
export default function Faq() {
  const ref = useRef<HTMLElement>(null);
  const ctxRef = useGsapContext(ref);
  const [open, setOpen] = useState<number | null>(null);

  useMotion(ref, (flags, el) => {
    revealAll(el, flags);
  });

  const toggle = (index: number): void => {
    const root = ref.current;
    if (!root) return;
    const next = open === index ? null : index;
    const panels = root.querySelectorAll<HTMLElement>("[data-panel]");
    const chevrons = root.querySelectorAll<HTMLElement>("[data-chevron]");
    const duration = prefersReducedMotion() ? DUR.fade : 0.35;

    ctxRef.current?.add(() => {
      panels.forEach((panel, i) => {
        gsap.to(panel, {
          height: i === next ? "auto" : 0,
          duration,
          ease: EASE_IO,
          overwrite: true,
          onComplete: i === next ? () => ScrollTrigger.refresh() : undefined,
        });
      });
      chevrons.forEach((chevron, i) => {
        gsap.to(chevron, { rotate: i === next ? 180 : 0, duration, ease: EASE_IO, overwrite: true });
      });
    });
    setOpen(next);
  };

  return (
    <section ref={ref} id="faq" className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <p data-reveal className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
          FAQ
        </p>
        <h2 data-reveal className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Vos questions, nos réponses.
        </h2>

        <ul data-reveal className="m-0 mt-12 list-none border-t border-line p-0">
          {FAQ_ITEMS.map((item, i) => (
            <li key={item.q} className="border-b border-line">
              <h3 className="m-0">
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium transition-colors hover:text-accent"
                >
                  {item.q}
                  <span data-chevron aria-hidden="true" className="shrink-0">
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                data-panel
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className="h-0 overflow-hidden"
              >
                <p className="m-0 max-w-2xl pb-6 leading-relaxed text-ink/60">{item.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
