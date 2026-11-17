"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, COLORS, DUR, EASE_OUT, revealAll } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { PROCESS_STEPS, TIMELINE_STATS } from "@/data/site";
import Counter from "@/components/Counter";

/**
 * Module 4 — Timeline 6 étapes.
 * - Mobile : ligne verticale, scaleY 0 -> 1 scrubé sur le bloc d'étapes.
 * - Desktop : ligne horizontale (scaleX), scrubée sur toute la hauteur de la section
 *   (le contenu reste visible grâce à un conteneur sticky CSS, sans pin GSAP).
 * Chaque étape s'active quand la ligne atteint son point (onEnter / onLeaveBack).
 */
export default function Timeline() {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, (flags, el) => {
    const q = gsap.utils.selector(el);
    const track = el.querySelector<HTMLElement>("[data-track]");
    const fill = q("[data-fill]");
    const steps = q("[data-step]");
    const dots = q("[data-dot]");
    const nums = q("[data-num]");
    if (!track) return;

    revealAll(el, flags);

    // État inactif (opacity .35, point gris) <-> actif (opacity 1, point plein x1.4, numéro accent)
    const stepTimelines = steps.map((step, i) =>
      gsap
        .timeline({ paused: true, defaults: { duration: DUR.micro, ease: EASE_OUT } })
        .fromTo(step, { opacity: 0.35 }, { opacity: 1 }, 0)
        .fromTo(
          dots[i],
          { backgroundColor: COLORS.mute, scale: 1 },
          { backgroundColor: COLORS.accent, scale: 1.4 },
          0,
        )
        .fromTo(nums[i], { color: "#6b6a66" }, { color: COLORS.accent }, 0),
    );

    if (flags.reduce) {
      gsap.set(fill, { scaleX: 1, scaleY: 1 });
      stepTimelines.forEach((tl) => tl.progress(1));
      return;
    }

    const horizontal = flags.full;
    const prop = horizontal ? "scaleX" : "scaleY";

    const lineTween = gsap.fromTo(
      fill,
      { [prop]: 0 },
      {
        [prop]: 1,
        ease: "none",
        scrollTrigger: {
          trigger: horizontal ? el : track,
          start: horizontal ? "top top" : "top 60%",
          end: horizontal ? "bottom bottom" : "bottom 60%",
          scrub: true,
        },
      },
    );
    const lineST = lineTween.scrollTrigger;
    if (!lineST) return;

    // Position (0..1) du point le long de la ligne
    const fraction = (i: number): number => {
      const t = track.getBoundingClientRect();
      const d = dots[i].getBoundingClientRect();
      const raw = horizontal
        ? (d.left + d.width / 2 - t.left) / t.width
        : (d.top + d.height / 2 - t.top) / t.height;
      return Math.min(1, Math.max(0, raw));
    };

    steps.forEach((_, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: () => lineST.start + fraction(i) * (lineST.end - lineST.start),
        end: "max",
        onEnter: () => {
          stepTimelines[i].play();
        },
        onLeaveBack: () => {
          stepTimelines[i].reverse();
        },
      });
    });
  });

  return (
    <section ref={ref} id="methode" className="bg-sand px-6 py-24 pin:min-h-[170vh] pin:py-0">
      <div className="mx-auto max-w-6xl pin:sticky pin:top-24 pin:py-8">
        <p data-reveal className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
          Notre méthode
        </p>
        <h2 data-reveal className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          De la première idée au premier appel, en six étapes.
        </h2>

        <dl className="mt-10 grid grid-cols-3 gap-4 md:gap-8">
          {TIMELINE_STATS.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col">
              <dt className="order-2 mt-1 text-xs text-ink/60 md:text-sm">{s.label}</dt>
              <dd className="m-0 text-3xl font-semibold tracking-tight md:text-5xl">
                <Counter target={s.target} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <div data-track className="relative mt-14 md:mt-20">
          <span aria-hidden="true" className="absolute left-[7px] top-0 h-full w-0.5 bg-line md:left-0 md:top-[7px] md:h-0.5 md:w-full" />
          <span
            data-fill
            aria-hidden="true"
            className="absolute left-[7px] top-0 h-full w-0.5 origin-top bg-accent md:left-0 md:top-[7px] md:h-0.5 md:w-full md:origin-left"
          />
          <ol className="relative m-0 grid list-none gap-10 p-0 md:grid-cols-6 md:gap-6">
            {PROCESS_STEPS.map((step) => (
              <li key={step.n} data-step className="relative pl-12 md:pl-0 md:pt-14">
                <span
                  data-dot
                  aria-hidden="true"
                  className="absolute left-0 top-1 block size-4 rounded-full bg-[#c8c4ba] md:top-0"
                />
                <span data-num className="font-mono text-sm text-mute">
                  {step.n}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
