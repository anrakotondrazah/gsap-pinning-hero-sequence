"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

export interface CountUpOptions {
  duration?: number;
  ease?: string;
  decimals?: number;
  suffix?: string;
}

/**
 * Compteur déclenché une seule fois à "top 80%".
 * gsap.to sur { v: 0 } -> onUpdate -> textContent. Le consommateur doit
 * appliquer la classe `tabular-nums` pour éviter le jitter.
 */
export function useCountUp<T extends HTMLElement>(
  target: number,
  options: CountUpOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { duration = 1.6, ease = "power2.out", decimals = 0, suffix = "" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fmt = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const render = (v: number): void => {
      el.textContent = `${fmt.format(v)}${suffix}`;
    };

    if (prefersReducedMotion()) {
      render(target);
      return;
    }

    const counter = { v: 0 };
    render(0);

    const ctx = gsap.context(() => {
      const tween = gsap.to(counter, {
        v: target,
        duration,
        ease,
        paused: true,
        onUpdate: () => render(counter.v),
        onComplete: () => render(target),
      });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          tween.play();
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, duration, ease, decimals, suffix]);

  return ref;
}
