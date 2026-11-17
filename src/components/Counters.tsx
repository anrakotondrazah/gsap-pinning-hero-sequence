"use client";

import { useRef } from "react";
import { revealAll } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { STATS } from "@/data/site";
import Counter from "@/components/Counter";

/** Module 2 — Compteurs (126, 95%, 4 ans, 97%, 12 M, 500). */
export default function Counters() {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, (flags, el) => {
    revealAll(el, flags);
  });

  return (
    <section ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
          SPM en chiffres
        </p>
        <h2 data-reveal className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Une équipe qui dure, des résultats qui se mesurent.
        </h2>
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col border-t border-ink/15 pt-6">
              <dt className="order-2 mt-2 text-sm text-ink/60">{s.label}</dt>
              <dd className="m-0 text-5xl font-semibold tracking-tight md:text-7xl">
                <Counter target={s.target} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
