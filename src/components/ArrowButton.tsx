"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, EASE_OUT } from "@/lib/motion";

interface ArrowButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
}

const VARIANTS: Record<NonNullable<ArrowButtonProps["variant"]>, string> = {
  solid: "bg-ink text-paper hover:bg-accent",
  outline: "border border-ink/20 text-ink hover:border-ink",
  light: "bg-paper text-ink hover:bg-accent hover:text-white",
};

/** Bouton lien avec flèche "→" : x 0 -> 6px au hover, 0.25s. */
export default function ArrowButton({ href, children, variant = "solid", className = "" }: ArrowButtonProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const moveRef = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;
    const ctx = gsap.context(() => {
      moveRef.current = gsap.quickTo(arrow, "x", { duration: 0.25, ease: EASE_OUT });
    }, linkRef);
    return () => {
      ctx.revert();
      moveRef.current = null;
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      onMouseEnter={() => moveRef.current?.(6)}
      onMouseLeave={() => moveRef.current?.(0)}
      onFocus={() => moveRef.current?.(6)}
      onBlur={() => moveRef.current?.(0)}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ${VARIANTS[variant]} ${className}`}
    >
      {children}
      <span ref={arrowRef} aria-hidden="true" className="inline-block">
        →
      </span>
    </a>
  );
}
