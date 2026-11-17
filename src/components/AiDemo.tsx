"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, COLORS, DUR, EASE_IO, EASE_OUT, revealAll } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { AI_ACTIONS, AI_SUMMARY, AI_TRANSCRIPT } from "@/data/site";

const STATES: readonly string[] = ["1 · Transcription", "2 · Résumés", "3 · Points d’action"];

/**
 * Module 8 — IA en 3 états. Timeline non scrubée de 4.5s déclenchée au trigger :
 *   0.0 → 2.0s  Transcription : machine à écrire (steps, 0.03s / caractère)
 *   2.0 → 2.9s  Résumés : les lignes se compressent (0.5s), 3 puces en stagger 0.12
 *   2.9 → 4.5s  Points d'action : 3 cases cochées une à une (stroke-dashoffset, 0.4s)
 */
export default function AiDemo() {
  const ref = useRef<HTMLElement>(null);
  const replayRef = useRef<(() => void) | null>(null);

  useMotion(ref, (flags, el) => {
    revealAll(el, flags);

    const q = gsap.utils.selector(el);
    const stage = el.querySelector<HTMLElement>("[data-stage]");
    const rows = q("[data-row]");
    const types = q("[data-type]");
    const summary = q("[data-summary]");
    const bullets = q("[data-bullet]");
    const actions = q("[data-actions]");
    const actionItems = q("[data-action]");
    const boxes = q("[data-box]");
    const checks = q("[data-check]");
    const chips = q("[data-state]");
    if (!stage) return;

    // Reduced motion : état final statique, rejouer = simple fondu de 0.2s
    if (flags.reduce) {
      gsap.set(rows, { height: 0, opacity: 0 });
      gsap.set([...summary, ...actions, ...chips], { opacity: 1 });
      gsap.set(checks, { strokeDashoffset: 0 });
      gsap.set(boxes, { backgroundColor: COLORS.accent, borderColor: COLORS.accent });
      replayRef.current = () => {
        gsap.fromTo([...summary, ...actions], { opacity: 0 }, { opacity: 1, duration: DUR.fade });
      };
      return () => {
        replayRef.current = null;
      };
    }

    const tl = gsap.timeline({ paused: true });

    // 1) Transcription : largeur en `ch` + steps(n) = une frappe par caractère
    types.forEach((node, i) => {
      const n = (node.textContent ?? "").length;
      tl.fromTo(
        node,
        { width: "0ch" },
        { width: `${n}ch`, duration: n * 0.03, ease: `steps(${n})` },
        i * 0.2,
      );
    });

    // 2) Résumés
    tl.fromTo(
      rows,
      { height: (_i: number, target: HTMLElement) => target.offsetHeight, opacity: 1 },
      { height: 0, opacity: 0, duration: 0.5, ease: EASE_IO },
      2.0,
    );
    tl.fromTo(summary, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: EASE_OUT }, 2.0);
    tl.fromTo(
      bullets,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: EASE_OUT },
      2.2,
    );

    // 3) Points d'action : cases cochées une à une
    tl.fromTo(actions, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: EASE_OUT }, 2.9);
    tl.fromTo(
      actionItems,
      { y: 12 },
      { y: 0, duration: 0.3, stagger: 0.1, ease: EASE_OUT },
      2.9,
    );
    checks.forEach((check, i) => {
      const at = 3.0 + i * 0.4;
      tl.fromTo(check, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: EASE_OUT }, at);
      tl.fromTo(
        boxes[i],
        { backgroundColor: "#ffffff", borderColor: "#ddd8ca" },
        { backgroundColor: COLORS.accent, borderColor: COLORS.accent, duration: 0.4, ease: EASE_OUT },
        at,
      );
    });

    // Indicateur d'état actif
    const starts = [0, 2.0, 2.9];
    chips.forEach((chip, i) => {
      tl.fromTo(chip, { opacity: 0.35 }, { opacity: 1, duration: DUR.fade }, starts[i]);
      if (i < chips.length - 1) {
        tl.to(chip, { opacity: 0.35, duration: DUR.fade }, starts[i + 1]);
      }
    });

    // Durée totale : 4.5s
    tl.to({}, { duration: 0.3 }, 4.2);

    replayRef.current = () => {
      tl.restart();
    };

    ScrollTrigger.create({
      trigger: stage,
      start: "top 70%",
      once: true,
      onEnter: () => {
        tl.play();
      },
    });

    return () => {
      replayRef.current = null;
    };
  });

  return (
    <section ref={ref} className="bg-sand px-6 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p data-reveal className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Human & AI
          </p>
          <h2 data-reveal className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            L’IA écoute, résume, propose. Vos conseillers décident.
          </h2>
          <p data-reveal className="mt-5 max-w-md text-ink/60">
            Chaque échange est transcrit, synthétisé et transformé en points d’action, pour libérer du temps
            humain là où il compte.
          </p>
        </div>

        <div data-reveal>
          <div
            data-stage
            className="relative min-h-[480px] overflow-hidden rounded-3xl bg-ink p-5 text-paper sm:p-8"
          >
            <div className="flex items-start justify-between gap-3">
              <ol className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-[11px] uppercase tracking-[0.15em]">
                {STATES.map((s) => (
                  <li key={s} data-state>
                    {s}
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => replayRef.current?.()}
                className="shrink-0 rounded-full border border-paper/25 px-4 py-1.5 text-xs transition-colors hover:bg-paper hover:text-ink"
              >
                ↺ Rejouer
              </button>
            </div>

            <div className="mt-6 font-mono text-[11px] leading-7 sm:text-sm" aria-label="Transcription">
              {AI_TRANSCRIPT.map((line) => (
                <div key={line} data-row className="h-7 overflow-hidden">
                  <span data-type className="inline-block overflow-hidden whitespace-nowrap align-top">
                    {line}
                  </span>
                </div>
              ))}
            </div>

            <div data-summary className="mt-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-paper/50">Résumé</p>
              <ul className="m-0 mt-3 list-none space-y-2 p-0 text-sm">
                {AI_SUMMARY.map((item) => (
                  <li key={item} data-bullet className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 block size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div data-actions className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-paper/50">Points d’action</p>
              <ul className="m-0 mt-3 list-none space-y-3 p-0 text-sm">
                {AI_ACTIONS.map((item) => (
                  <li key={item} data-action className="flex items-center gap-3">
                    <span
                      data-box
                      className="grid size-6 shrink-0 place-items-center rounded-md border-2 border-line bg-white"
                    >
                      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                        <path
                          data-check
                          d="M5 12.5l4.5 4.5L19 7"
                          pathLength={1}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth={3.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray={1}
                          strokeDashoffset={1}
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
