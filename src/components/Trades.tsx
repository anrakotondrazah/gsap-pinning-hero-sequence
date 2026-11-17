"use client";

import { usePinnedStepper } from "@/lib/usePinnedStepper";
import { pad2 } from "@/lib/motion";
import { TRADES, type Trade } from "@/data/trades";
import ArrowButton from "@/components/ArrowButton";
import RollCounter from "@/components/RollCounter";

function TradeContent({ trade, tone }: { trade: Trade; tone: "light" | "dark" }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{trade.category}</p>
      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{trade.title}</h3>
      <p className="mt-4 max-w-md leading-relaxed opacity-70">{trade.text}</p>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-6xl font-semibold tabular-nums tracking-tight text-accent md:text-7xl">
            {trade.stat.value}
          </p>
          <p className="mt-1 text-sm opacity-60">{trade.stat.label}</p>
        </div>
        <ArrowButton href={trade.href} variant={tone === "dark" ? "light" : "solid"}>
          {trade.linkLabel}
        </ArrowButton>
      </div>
    </div>
  );
}

/** Module 5 — Métiers 01 -> 10 (pin, scrub, end +=1000%). */
export default function Trades() {
  const { rootRef, shown } = usePinnedStepper(TRADES.length, 1000);
  const active = TRADES[shown];

  return (
    <section
      ref={rootRef}
      id="metiers"
      className="relative bg-ink px-6 py-24 text-paper pin:flex pin:h-screen pin:items-center pin:py-0"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header data-reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Nos métiers</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Dix métiers, une seule exigence.
          </h2>
        </header>

        {/* Layout épinglé : liste à gauche, carte unique à droite */}
        <div className="mt-10 hidden gap-12 pin:grid pin:grid-cols-[1fr_1.25fr]">
          <ol className="m-0 flex list-none flex-col justify-center p-0">
            {TRADES.map((trade, i) => (
              <li
                key={trade.id}
                data-item
                className="flex items-baseline gap-4 py-1.5 text-lg font-medium will-change-transform"
              >
                <span className="font-mono text-xs text-accent">{pad2(i + 1)}</span>
                {trade.title}
              </li>
            ))}
          </ol>

          <div className="relative flex min-h-[440px] flex-col overflow-hidden rounded-3xl bg-paper p-10 text-ink">
            <RollCounter count={TRADES.length} />
            <div data-card className="mt-8 flex-1 will-change-transform">
              <TradeContent trade={active} tone="light" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-line">
              <div data-progress className="h-full origin-left bg-accent" />
            </div>
          </div>
        </div>

        {/* Layout empilé : mobile / reduced motion */}
        <div className="mt-10 grid gap-5 pin:hidden">
          {TRADES.map((trade, i) => (
            <article
              key={trade.id}
              data-reveal
              className="rounded-3xl border border-paper/10 bg-paper/5 p-6"
            >
              <p className="font-mono text-sm text-accent">
                {pad2(i + 1)} / {pad2(TRADES.length)}
              </p>
              <div className="mt-3">
                <TradeContent trade={trade} tone="dark" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
