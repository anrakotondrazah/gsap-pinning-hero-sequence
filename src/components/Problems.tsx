"use client";

import { usePinnedStepper } from "@/lib/usePinnedStepper";
import { pad2 } from "@/lib/motion";
import { PROBLEMS, type Problem } from "@/data/problems";
import RollCounter from "@/components/RollCounter";

function ProblemContent({ problem }: { problem: Problem }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{problem.category}</p>
      <h3 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
        {problem.title}
      </h3>
      <p className="mt-6 max-w-lg text-lg leading-relaxed opacity-70">{problem.text}</p>
    </div>
  );
}

/** Module 6 — Sept problèmes 01 -> 07 (même mécanique que le Module 5, end +=700%). */
export default function Problems() {
  const { rootRef, shown } = usePinnedStepper(PROBLEMS.length, 700);
  const active = PROBLEMS[shown];

  return (
    <section
      ref={rootRef}
      id="problemes"
      className="relative bg-paper px-6 py-24 pin:flex pin:h-screen pin:items-center pin:py-0"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header data-reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Ce que nous résolvons</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Sept problèmes, une réponse.
          </h2>
        </header>

        <div className="mt-10 hidden gap-12 pin:grid pin:grid-cols-[1fr_1.4fr]">
          <ol className="m-0 flex list-none flex-col justify-center gap-2 p-0">
            {PROBLEMS.map((problem, i) => (
              <li
                key={problem.id}
                data-item
                className="flex items-baseline gap-4 py-1 text-base font-medium leading-snug will-change-transform"
              >
                <span className="font-mono text-xs text-accent">{pad2(i + 1)}</span>
                {problem.title}
              </li>
            ))}
          </ol>

          <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl bg-ink p-10 text-paper">
            <RollCounter count={PROBLEMS.length} />
            <div data-card className="mt-8 flex-1 will-change-transform">
              <ProblemContent problem={active} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-paper/10">
              <div data-progress className="h-full origin-left bg-accent" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 pin:hidden">
          {PROBLEMS.map((problem, i) => (
            <article key={problem.id} data-reveal className="rounded-3xl bg-ink p-6 text-paper">
              <p className="font-mono text-sm text-accent">
                {pad2(i + 1)} / {pad2(PROBLEMS.length)}
              </p>
              <div className="mt-3">
                <ProblemContent problem={problem} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
