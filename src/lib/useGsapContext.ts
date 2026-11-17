"use client";

import { useEffect, useRef, type MutableRefObject, type RefObject } from "react";
import { gsap } from "@/lib/motion";

/**
 * Contexte GSAP persistant pour les animations déclenchées par des événements
 * (clics, changements d'état). Toutes les tweens créées via ctx.add() sont
 * nettoyées par ctx.revert() au démontage.
 */
export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
): MutableRefObject<gsap.Context | null> {
  const ref = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, scope);
    ref.current = ctx;
    return () => {
      ctx.revert();
      ref.current = null;
    };
  }, [scope]);

  return ref;
}
