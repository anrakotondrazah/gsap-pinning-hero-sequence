"use client";

import { useCountUp } from "@/lib/useCountUp";

interface CounterProps {
  target: number;
  suffix?: string;
  className?: string;
}

/** Compteur animé (Module 2). `tabular-nums` évite le jitter des chiffres. */
export default function Counter({ target, suffix = "", className = "" }: CounterProps) {
  const ref = useCountUp<HTMLSpanElement>(target, {
    duration: 1.6,
    ease: "power2.out",
    decimals: 0,
    suffix,
  });

  return (
    <span className={`inline-block tabular-nums ${className}`}>
      <span className="sr-only">{`${target}${suffix}`}</span>
      <span ref={ref} aria-hidden="true">{`0${suffix}`}</span>
    </span>
  );
}
