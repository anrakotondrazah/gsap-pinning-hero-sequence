import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/* ---------- Tokens ---------- */
export const EASE_OUT = "power3.out";
export const EASE_IO = "power2.inOut";
export const EASE_EXPO = "expo.out";

export const DUR = {
  micro: 0.3,
  standard: 0.7,
  sequence: 1.1,
  fade: 0.2, // seul mouvement conservé avec prefers-reduced-motion
} as const;

export const STAGGER = 0.08;

export const COLORS = {
  accent: "#ff4f1a",
  mute: "#c8c4ba",
} as const;

/* ---------- Media queries (miroir de la variante Tailwind `pin`) ---------- */
export const MEDIA = {
  full: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

export interface MotionFlags {
  /** Desktop + mouvement autorisé : pin, scrub, parallax actifs. */
  full: boolean;
  /** < 768px : pas de pin, empilement vertical, mêmes révélations. */
  mobile: boolean;
  /** prefers-reduced-motion : uniquement des fondus de 0.2s. */
  reduce: boolean;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Révélation au scroll standard : y 32 -> 0, opacity 0 -> 1, 0.7s, EASE_OUT,
 * trigger "top 85%", once. En reduced motion : fondu 0.2s sans translation.
 */
export function revealAll(scope: Element, flags: MotionFlags, selector = "[data-reveal]"): void {
  const targets = gsap.utils.toArray<HTMLElement>(selector, scope);
  targets.forEach((el) => {
    gsap.fromTo(
      el,
      { y: flags.reduce ? 0 : 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: flags.reduce ? DUR.fade : DUR.standard,
        ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
  });
}

export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}
