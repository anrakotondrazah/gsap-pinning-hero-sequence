"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { gsap, EASE_EXPO, EASE_OUT, DUR, revealAll } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { useGsapContext } from "@/lib/useGsapContext";

export interface PinnedStepper {
  rootRef: RefObject<HTMLElement | null>;
  /** Index du contenu actuellement affiché dans la carte unique. */
  shown: number;
}

/**
 * Mécanique commune aux modules 5 & 6 : section épinglée, scrub, N paliers.
 *
 * Contrat DOM (data-attributes dans la section) :
 *  - [data-item]      éléments de la liste (actif : opacity 1 / x +12px, autres .4)
 *  - [data-roll]      cellules de la roulette (translateY -100% * n)
 *  - [data-card]      contenu de la carte unique (sortie 0.25s / entrée 0.45s)
 *  - [data-progress]  barre de progression scrubée (scaleX 0 -> 1)
 *  - [data-reveal]    cartes empilées (mobile / reduced motion)
 */
export function usePinnedStepper(count: number, endPercent: number): PinnedStepper {
  const rootRef = useRef<HTMLElement>(null);
  const ctxRef = useGsapContext(rootRef);
  const [shown, setShown] = useState(0);
  const shownRef = useRef(0);
  const targetRef = useRef(0);
  const needsEnter = useRef(false);

  const enter = (): void => {
    const card = rootRef.current?.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    ctxRef.current?.add(() => {
      gsap.fromTo(
        card,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: EASE_OUT, overwrite: true },
      );
    });
  };

  // Le nouveau contenu est monté par React, puis il entre.
  useEffect(() => {
    if (!needsEnter.current) return;
    needsEnter.current = false;
    enter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  useMotion(rootRef, (flags, el) => {
    if (!flags.full) {
      revealAll(el, flags);
      return;
    }

    const q = gsap.utils.selector(el);
    const items = q("[data-item]");
    const cells = q("[data-roll]");
    const bars = q("[data-progress]");
    const card = q("[data-card]")[0];
    let current = 0;

    const applyList = (i: number, instant: boolean): void => {
      items.forEach((item, k) => {
        gsap.to(item, {
          opacity: k === i ? 1 : 0.4,
          x: k === i ? 12 : 0,
          duration: instant ? 0 : DUR.micro,
          ease: EASE_OUT,
          overwrite: "auto",
        });
      });
      gsap.to(cells, {
        yPercent: -100 * i,
        duration: instant ? 0 : 0.5,
        ease: EASE_EXPO,
        overwrite: "auto",
      });
    };

    const commit = (): void => {
      const t = targetRef.current;
      if (t === shownRef.current) {
        enter();
      } else {
        shownRef.current = t;
        needsEnter.current = true;
        setShown(t);
      }
    };

    const goTo = (i: number): void => {
      current = i;
      targetRef.current = i;
      applyList(i, false);
      if (!card) return;
      gsap.to(card, {
        y: -20,
        opacity: 0,
        duration: 0.25,
        ease: EASE_OUT,
        overwrite: true,
        onComplete: commit,
      });
    };

    applyList(0, true);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: `+=${endPercent}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const i = Math.min(count - 1, Math.floor(self.progress * count));
          if (i !== current) goTo(i);
        },
      },
    });
    tl.fromTo(bars, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 });

    return () => {
      if (card) gsap.killTweensOf(card);
    };
  });

  return { rootRef, shown };
}
