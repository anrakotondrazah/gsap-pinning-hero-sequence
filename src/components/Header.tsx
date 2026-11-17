"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, EASE_OUT, DUR } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { NAV_LINKS } from "@/data/site";
import ArrowButton from "@/components/ArrowButton";

/**
 * Header sticky : scrollY > 40 -> blur(12px) + fond blanc/80 + hauteur 80 -> 64px (0.3s).
 * Masqué au scroll vers le bas, réaffiché vers le haut.
 */
export default function Header() {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, (flags, el) => {
    const duration = flags.reduce ? DUR.fade : DUR.micro;

    const compactTl = gsap
      .timeline({ paused: true, defaults: { duration, ease: EASE_OUT } })
      .fromTo(
        el,
        {
          height: 80,
          backgroundColor: "rgba(255,255,255,0)",
          backdropFilter: "blur(0px)",
          webkitBackdropFilter: "blur(0px)",
        },
        {
          height: 64,
          backgroundColor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          webkitBackdropFilter: "blur(12px)",
        },
      );
    const hideTween = gsap.to(el, { yPercent: -100, duration, ease: EASE_OUT, paused: true });

    let compact = false;
    let hidden = false;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        const nextCompact = y > 40;
        if (nextCompact !== compact) {
          compact = nextCompact;
          if (compact) compactTl.play();
          else compactTl.reverse();
        }
        const nextHidden = self.direction === 1 ? y > 120 : self.direction === -1 ? false : hidden;
        if (nextHidden !== hidden) {
          hidden = nextHidden;
          if (hidden) hideTween.play();
          else hideTween.reverse();
        }
      },
    });
  });

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 h-20">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-ink text-xs text-paper">S</span>
          SPM
        </a>
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 text-sm md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-ink/70 transition-colors hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>
        <ArrowButton href="#contact" className="!px-5 !py-2.5">
          Nous contacter
        </ArrowButton>
      </div>
    </header>
  );
}
