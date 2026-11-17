"use client";

import { useRef } from "react";
import { gsap, DUR, EASE_OUT } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { QUOTE } from "@/data/site";
import Words from "@/components/Words";

/** Citation : fade + y 24, mots en stagger 0.015s (trigger "top 85%", once). */
export default function Quote() {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, (flags, el) => {
    const q = gsap.utils.selector(el);
    const block = q("[data-quote]");
    const words = q("[data-quote] [data-word]");
    const author = q("[data-author]");
    const scrollTrigger = { trigger: block[0], start: "top 85%", once: true };

    if (flags.reduce) {
      gsap.fromTo([...block, ...author], { opacity: 0 }, { opacity: 1, duration: DUR.fade, scrollTrigger });
      return;
    }

    gsap.fromTo(block, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: DUR.standard, ease: EASE_OUT, scrollTrigger });
    gsap.fromTo(
      words,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: DUR.standard, ease: EASE_OUT, stagger: 0.015, scrollTrigger },
    );
    gsap.fromTo(
      author,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: DUR.standard, ease: EASE_OUT, delay: 0.4, scrollTrigger },
    );
  });

  return (
    <section ref={ref} className="bg-ink px-6 py-32 text-paper">
      <figure className="mx-auto max-w-4xl">
        <span aria-hidden="true" className="block text-7xl leading-none text-accent">
          “
        </span>
        <blockquote data-quote className="m-0 mt-2 text-3xl font-medium leading-snug tracking-tight md:text-5xl">
          <Words text={QUOTE.text} />
        </blockquote>
        <figcaption data-author className="mt-10 text-sm text-paper/60">
          <span className="font-medium text-paper">{QUOTE.author}</span> — {QUOTE.role}
        </figcaption>
      </figure>
    </section>
  );
}
