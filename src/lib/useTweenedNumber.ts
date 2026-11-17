"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { useGsapContext } from "@/lib/useGsapContext";

/**
 * Tween du chiffre affiché de l'ancienne à la nouvelle valeur
 * (0.6s, power2.out, overwrite: true). Aucun debounce : chaque changement
 * (y compris pendant le glissement du curseur) relance un tween depuis la
 * valeur courante.
 */
export function useTweenedNumber<T extends HTMLElement>(
  value: number,
  format: (n: number) => string,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const ctxRef = useGsapContext(ref);
  const state = useRef({ v: value });
  const formatRef = useRef(format);

  useEffect(() => {
    formatRef.current = format;
  });

  useEffect(() => {
    const el = ref.current;
    const ctx = ctxRef.current;
    if (!el || !ctx) return;

    if (prefersReducedMotion()) {
      state.current.v = value;
      el.textContent = formatRef.current(value);
      return;
    }

    ctx.add(() => {
      gsap.to(state.current, {
        v: value,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => {
          el.textContent = formatRef.current(state.current.v);
        },
      });
    });
  }, [value, ctxRef]);

  return ref;
}
