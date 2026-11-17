"use client";

import { useRef } from "react";
import { gsap, EASE_EXPO, EASE_IO, EASE_OUT, DUR, STAGGER, revealAll } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { HERO_CHIPS, HERO_LINES } from "@/data/site";
import Words from "@/components/Words";

/**
 * Module 1 — Hero épinglé.
 * Timeline scrubée (pin, scrub: 1, end: +=300%) en 4 segments égaux (1 unité chacun) :
 *   segment i  : entrée de la ligne i à t=i (0.4), sortie à t=i+0.6 (0.4).
 * Le bloc final apparaît pendant la sortie de la dernière ligne (t=3.6).
 * Mobile / reduced motion : pas de pin, empilement vertical, révélations standard.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, (flags, el) => {
    const q = gsap.utils.selector(el);
    const chips = q("[data-chip]");

    // Chips : fade-in stagger 0.1 + float continu (y ±4px, 3s, yoyo, sine.inOut)
    gsap.fromTo(
      chips,
      { opacity: 0 },
      {
        opacity: 1,
        duration: flags.reduce ? DUR.fade : DUR.standard,
        stagger: flags.reduce ? 0 : 0.1,
        ease: EASE_OUT,
      },
    );
    if (!flags.reduce) {
      chips.forEach((chip, i) => {
        gsap.fromTo(
          chip,
          { y: i % 2 === 0 ? -4 : 4 },
          { y: i % 2 === 0 ? 4 : -4, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
      });
    }

    if (!flags.full) {
      revealAll(el, flags);
      return;
    }

    const title = q("[data-title]");
    const intro = q("[data-intro]");
    const lines = q("[data-line]");
    const final = q("[data-final]");
    const words = q("[data-final] [data-word]");
    const badge = q("[data-badge]");
    const indicator = q("[data-indicator]");

    gsap.fromTo(
      [...title, ...intro],
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: DUR.standard, ease: EASE_OUT, stagger: STAGGER },
    );

    // États initiaux
    gsap.set(lines, { opacity: 0, y: 40, filter: "blur(8px)" });
    gsap.set(final, { opacity: 0 });
    gsap.set(words, { opacity: 0, y: 24 });
    gsap.set(badge, { opacity: 0, scale: 0.8 });

    // Indicateur "Défiler" : opacity 1 -> 0 dès progress > 0.05
    const indicatorTween = gsap.to(indicator, {
      opacity: 0,
      duration: DUR.micro,
      ease: EASE_OUT,
      paused: true,
    });
    let hidden = false;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const shouldHide = self.progress > 0.05;
          if (shouldHide === hidden) return;
          hidden = shouldHide;
          if (hidden) indicatorTween.play();
          else indicatorTween.reverse();
        },
      },
    });

    lines.forEach((line, i) => {
      tl.fromTo(
        line,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.4, ease: EASE_OUT },
        i,
      );
      tl.to(
        line,
        { y: -40, opacity: 0, filter: "blur(8px)", duration: 0.4, ease: EASE_IO },
        i + 0.6,
      );
    });

    // Bloc final pendant la sortie de la dernière ligne
    tl.to(final, { opacity: 1, duration: 0.2, ease: "none" }, 3.6);
    tl.to(
      words,
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: EASE_OUT },
      3.65,
    );
    tl.to(badge, { opacity: 1, scale: 1, duration: 0.5, ease: EASE_EXPO }, 3.8);
    // Temps de lecture avant de libérer le pin
    tl.to({}, { duration: 0.7 }, 4.3);
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-20 pt-32 pin:h-screen pin:pb-0 pin:pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-6xl">
        <ul className="flex flex-wrap gap-2" aria-label="Repères">
          {HERO_CHIPS.map((chip) => (
            <li
              key={chip}
              data-chip
              className="rounded-full border border-ink/15 bg-white/60 px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] backdrop-blur"
            >
              {chip}
            </li>
          ))}
        </ul>

        <h1
          data-title
          data-reveal
          className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl"
        >
          Externaliser vos métiers clés
        </h1>
        <p data-intro data-reveal className="mt-6 max-w-3xl text-xl text-ink/70 md:text-2xl">
          Recrutés, formés et encadrés par SPM, vos conseillers francophones deviennent…
        </p>

        <div className="relative mt-10 pin:h-44">
          <ol className="m-0 list-none p-0">
            {HERO_LINES.map((line) => (
              <li
                key={line.n}
                data-line
                data-reveal
                className="flex items-baseline gap-5 border-t border-line py-4 text-3xl font-semibold tracking-tight md:text-6xl pin:absolute pin:inset-x-0 pin:top-0 pin:border-0 pin:py-0"
              >
                <span className="font-mono text-sm font-normal text-accent md:text-base">{line.n}</span>
                {line.label}
              </li>
            ))}
          </ol>

          <div
            data-final
            data-reveal
            className="pt-8 text-4xl font-semibold leading-[1.15] tracking-tight md:text-6xl pin:absolute pin:inset-x-0 pin:top-0 pin:pt-0"
          >
            <Words text="l’équipe qui connaît" />{" "}
            <span
              data-badge
              className="mx-1 inline-flex origin-center items-center rounded-full bg-accent px-5 py-1 align-middle text-xl font-semibold tracking-normal text-white md:text-3xl"
            >
              Human & AI
            </span>{" "}
            <Words text="vraiment votre métier." />
          </div>
        </div>
      </div>

      <div
        data-indicator
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ink/60 pin:flex"
      >
        Défiler
        <span className="block h-8 w-px bg-ink/40" />
      </div>
    </section>
  );
}
