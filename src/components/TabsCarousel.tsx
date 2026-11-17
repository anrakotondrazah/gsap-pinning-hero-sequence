"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, DUR, EASE_IO, EASE_OUT, STAGGER, prefersReducedMotion, revealAll } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { useGsapContext } from "@/lib/useGsapContext";
import { TABS } from "@/data/tabs";

/**
 * Module 9 — Onglets + carrousel.
 * - Indicateur souligné glissant : x et width tweenés (0.4s, EASE_IO).
 * - Changement d'onglet : les cartes sortent (opacity 0, x -24, 0.25s), puis les nouvelles
 *   entrent (opacity 1, x 0, stagger 0.08).
 * - Flèches ‹ › : scroll-snap horizontal, translation d'une carte, désactivées aux extrémités.
 */
export default function TabsCarousel() {
  const ref = useRef<HTMLElement>(null);
  const ctxRef = useGsapContext(ref);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [selected, setSelected] = useState(0);
  const [shown, setShown] = useState(0);
  const [edges, setEdges] = useState({ prev: false, next: true });

  const pendingRef = useRef(0);
  const shownRef = useRef(0);
  const needsEnter = useRef(false);
  const indicatorReady = useRef(false);

  useMotion(ref, (flags, el) => {
    revealAll(el, flags);
  });

  const updateEdges = useCallback((): void => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      prev: track.scrollLeft > 4,
      next: track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
    });
  }, []);

  const enter = (): void => {
    const cards = trackRef.current?.querySelectorAll("[data-card]");
    if (!cards || cards.length === 0) return;
    const reduce = prefersReducedMotion();
    ctxRef.current?.add(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, x: reduce ? 0 : 24 },
        {
          opacity: 1,
          x: 0,
          duration: reduce ? DUR.fade : DUR.standard,
          stagger: reduce ? 0 : STAGGER,
          ease: EASE_OUT,
          overwrite: true,
        },
      );
    });
  };

  const commit = (): void => {
    const next = pendingRef.current;
    if (trackRef.current) trackRef.current.scrollLeft = 0;
    if (next === shownRef.current) {
      enter();
    } else {
      shownRef.current = next;
      needsEnter.current = true;
      setShown(next);
    }
  };

  const selectTab = (i: number): void => {
    if (i === pendingRef.current) return;
    pendingRef.current = i;
    setSelected(i);
    const cards = trackRef.current?.querySelectorAll("[data-card]");
    if (!cards || cards.length === 0) {
      commit();
      return;
    }
    const reduce = prefersReducedMotion();
    ctxRef.current?.add(() => {
      gsap.to(cards, {
        opacity: 0,
        x: reduce ? 0 : -24,
        duration: reduce ? DUR.fade : 0.25,
        ease: EASE_OUT,
        overwrite: true,
        onComplete: commit,
      });
    });
  };

  // Les nouvelles cartes sont montées : elles entrent
  useEffect(() => {
    if (needsEnter.current) {
      needsEnter.current = false;
      enter();
    }
    updateEdges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, updateEdges]);

  // Indicateur souligné glissant
  useEffect(() => {
    const button = tabRefs.current[selected];
    const indicator = indicatorRef.current;
    const ctx = ctxRef.current;
    if (!button || !indicator || !ctx) return;
    const target = { x: button.offsetLeft, width: button.offsetWidth };
    if (!indicatorReady.current) {
      indicatorReady.current = true;
      gsap.set(indicator, target);
      return;
    }
    ctx.add(() => {
      gsap.to(indicator, {
        ...target,
        duration: prefersReducedMotion() ? DUR.fade : 0.4,
        ease: EASE_IO,
        overwrite: true,
      });
    });
  }, [selected, ctxRef]);

  // Resize : replacer l'indicateur et recalculer les extrémités
  useEffect(() => {
    const onResize = (): void => {
      const button = tabRefs.current[pendingRef.current];
      const indicator = indicatorRef.current;
      if (button && indicator) {
        gsap.set(indicator, { x: button.offsetLeft, width: button.offsetWidth });
      }
      updateEdges();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateEdges]);

  const scrollByCard = (dir: 1 | -1): void => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const tab = TABS[shown];

  return (
    <section ref={ref} className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p data-reveal className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
          Cas d’usage
        </p>
        <h2 data-reveal className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Des équipes déjà à l’œuvre dans votre secteur.
        </h2>

        <div data-reveal className="mt-12 flex items-end justify-between gap-6 border-b border-line">
          <div className="no-scrollbar -mb-px overflow-x-auto">
            <div role="tablist" aria-label="Secteurs" className="relative flex gap-2">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${t.id}`}
                  aria-selected={selected === i}
                  aria-controls="tab-panel"
                  onClick={() => selectTab(i)}
                  className={`whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors duration-300 ${
                    selected === i ? "text-ink" : "text-ink/45 hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent"
              />
            </div>
          </div>

          <div className="mb-3 hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Cartes précédentes"
              disabled={!edges.prev}
              onClick={() => scrollByCard(-1)}
              className="grid size-10 place-items-center rounded-full border border-ink/20 text-xl leading-none transition-opacity duration-300 hover:border-ink disabled:cursor-default disabled:opacity-30 disabled:hover:border-ink/20"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Cartes suivantes"
              disabled={!edges.next}
              onClick={() => scrollByCard(1)}
              className="grid size-10 place-items-center rounded-full border border-ink/20 text-xl leading-none transition-opacity duration-300 hover:border-ink disabled:cursor-default disabled:opacity-30 disabled:hover:border-ink/20"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          id="tab-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          onScroll={updateEdges}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {tab.cards.map((card, i) => (
            <article
              key={`${tab.id}-${card.title}`}
              data-card
              className="flex min-h-[260px] w-[78vw] max-w-[320px] shrink-0 snap-start flex-col justify-between rounded-3xl border border-line bg-white p-7 sm:w-[320px]"
            >
              <div>
                <p className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")} — {card.tag}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">{card.title}</h3>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink/60">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
