"use client";

import { useEffect, type RefObject } from "react";
import { gsap, MEDIA, type MotionFlags } from "@/lib/motion";

type Cleanup = (() => void) | void;

/**
 * Monte un contexte GSAP + matchMedia (full / mobile / reduce) et le nettoie
 * avec ctx.revert() au démontage. `setup` peut retourner une fonction de cleanup.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (flags: MotionFlags, root: HTMLElement) => Cleanup,
): void {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    let mm: gsap.MatchMedia | undefined;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();
      mm.add(MEDIA, (c) => {
        const cond = c.conditions;
        const reduce = Boolean(cond?.reduce);
        const flags: MotionFlags = {
          full: !reduce && Boolean(cond?.full),
          mobile: !reduce && Boolean(cond?.mobile),
          reduce,
        };
        return setup(flags, root);
      });
    }, root);

    return () => {
      mm?.revert();
      ctx.revert();
    };
    // setup est volontairement capturé une seule fois (montage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
