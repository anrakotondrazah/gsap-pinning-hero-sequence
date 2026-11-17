"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, DUR, EASE_EXPO, EASE_OUT, STAGGER, revealAll } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { CONVERGENCE_PILLS } from "@/data/site";

/**
 * Module 7 — Carte convergence.
 * Trois puces partent de positions décalées et convergent en 1.1s EASE_EXPO ("top 70%").
 * À l'arrivée, les deux cercles se rapprochent de 40px (±20px chacun) ;
 * l'intersection ressort grâce à mix-blend-mode: multiply.
 */
export default function Convergence() {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, (flags, el) => {
    revealAll(el, flags);

    const q = gsap.utils.selector(el);
    const stage = el.querySelector<HTMLElement>("[data-stage]");
    const pills = q("[data-pill]");
    const circleA = q("[data-circle-a]");
    const circleB = q("[data-circle-b]");
    const lens = q("[data-lens]");
    if (!stage) return;

    const k = flags.reduce ? 0 : 1;
    const dur = flags.reduce ? DUR.fade : DUR.sequence;
    const ease = flags.reduce ? "none" : EASE_EXPO;

    gsap.set(pills, {
      opacity: 0,
      x: (i: number) => CONVERGENCE_PILLS[i].x * k,
      y: (i: number) => CONVERGENCE_PILLS[i].y * k,
      rotate: (i: number) => CONVERGENCE_PILLS[i].rotate * k,
    });
    gsap.set(circleA, { opacity: 0, x: -20 * k });
    gsap.set(circleB, { opacity: 0, x: 20 * k });
    gsap.set(lens, { opacity: 0, scale: flags.reduce ? 1 : 0.8 });

    const tl = gsap.timeline({ paused: true });
    tl.to(
      pills,
      { x: 0, y: 0, rotate: 0, opacity: 1, duration: dur, ease, stagger: flags.reduce ? 0 : STAGGER },
      0,
    );
    const arrival = flags.reduce ? 0 : dur * 0.55;
    tl.to([...circleA, ...circleB], { opacity: 1, duration: flags.reduce ? DUR.fade : 0.5, ease: EASE_OUT }, arrival);
    tl.to(circleA, { x: 0, duration: dur, ease }, arrival);
    tl.to(circleB, { x: 0, duration: dur, ease }, arrival);
    tl.to(lens, { opacity: 1, scale: 1, duration: flags.reduce ? DUR.fade : 0.6, ease: EASE_EXPO }, arrival + (flags.reduce ? 0 : dur * 0.6));

    ScrollTrigger.create({
      trigger: stage,
      start: "top 70%",
      once: true,
      onEnter: () => {
        tl.play();
      },
    });
  });

  return (
    <section ref={ref} className="overflow-hidden px-6 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <div>
          <p data-reveal className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Notre approche
          </p>
          <h2 data-reveal className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Votre équipe et la nôtre, au point de rencontre.
          </h2>
          <p data-reveal className="mt-5 max-w-md text-ink/60">
            Nous partons de vos process, de votre culture et de vos supports pour construire une équipe qui
            se fond dans votre organisation, sans rupture pour vos clients.
          </p>
        </div>

        <div data-stage className="mx-auto w-full max-w-[380px]">
          <ul className="m-0 flex list-none flex-wrap justify-center gap-3 p-0">
            {CONVERGENCE_PILLS.map((pill) => (
              <li
                key={pill.label}
                data-pill
                className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium shadow-sm"
              >
                {pill.label}
              </li>
            ))}
          </ul>

          <div className="relative isolate mt-12 aspect-[380/240] w-full">
            <div
              data-circle-a
              className="absolute left-0 top-0 flex h-full w-[63.16%] items-center rounded-full bg-accent/60 pl-[9%] mix-blend-multiply"
            >
              <span className="whitespace-pre-line text-[10px] font-semibold leading-tight tracking-[0.15em] sm:text-xs">
                {"VOTRE\nÉQUIPE"}
              </span>
            </div>
            <div
              data-circle-b
              className="absolute left-[36.84%] top-0 flex h-full w-[63.16%] items-center justify-end rounded-full bg-azure/55 pr-[12%] mix-blend-multiply"
            >
              <span className="text-[10px] font-semibold tracking-[0.15em] sm:text-xs">SPM</span>
            </div>
            <div
              data-lens
              className="absolute left-[36.84%] top-0 z-10 grid h-full w-[26.32%] place-items-center"
            >
              <span className="rounded-full bg-ink px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-paper sm:text-[10px]">
                Synergie
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
