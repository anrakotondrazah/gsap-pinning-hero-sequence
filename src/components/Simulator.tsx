"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { revealAll } from "@/lib/motion";
import { useMotion } from "@/lib/useMotion";
import { useTweenedNumber } from "@/lib/useTweenedNumber";

/* ------------------------------------------------------------------ *
 * Formule du simulateur
 *
 *   coût annuel du périmètre = salaire mensuel brut × 12
 *                              × (1 + CHARGES_PATRONALES)
 *                              × collaborateurs × part externalisée
 *
 *   économie annuelle        = coût annuel du périmètre × TAUX_OPTIMISATION
 *
 * Hypothèses (indicatives, à valider lors du cadrage) :
 *   - CHARGES_PATRONALES = 42 % du salaire brut
 *   - TAUX_OPTIMISATION  = 30 % (mutualisation, pilotage, gestion des pics)
 * ------------------------------------------------------------------ */
const CHARGES_PATRONALES = 0.42;
const TAUX_OPTIMISATION = 0.3;

interface Estimate {
  annualCost: number;
  savings: number;
}

export function estimate(monthlySalary: number, headcount: number, sharePercent: number): Estimate {
  const annualCost = monthlySalary * 12 * (1 + CHARGES_PATRONALES) * headcount * (sharePercent / 100);
  return { annualCost, savings: annualCost * TAUX_OPTIMISATION };
}

const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const formatEur = (n: number): string => eur.format(Math.round(n));

const toNumber = (raw: string): number => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/** Module 3 — Simulateur. */
export default function Simulator() {
  const root = useRef<HTMLElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const [salary, setSalary] = useState("2400");
  const [headcount, setHeadcount] = useState("12");
  const [share, setShare] = useState(60);

  useMotion(root, (flags, el) => {
    revealAll(el, flags);
  });

  // Piste du curseur : CSS var --p mise à jour en JS (aucun debounce)
  useEffect(() => {
    rangeRef.current?.style.setProperty("--p", `${share}%`);
  }, [share]);

  const result = estimate(toNumber(salary), toNumber(headcount), share);
  // Textes initiaux figés : React ne doit jamais réécrire le texte animé par GSAP.
  const [initialSavings] = useState(() => formatEur(result.savings));
  const [initialCost] = useState(() => formatEur(result.annualCost));
  const savingsRef = useTweenedNumber<HTMLParagraphElement>(result.savings, formatEur);
  const costRef = useTweenedNumber<HTMLSpanElement>(result.annualCost, formatEur);

  const onRange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.currentTarget.value);
    e.currentTarget.style.setProperty("--p", `${value}%`);
    setShare(value);
  };

  return (
    <section ref={root} id="simulateur" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div>
          <p data-reveal className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Simulateur
          </p>
          <h2 data-reveal className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Estimez l’économie de votre externalisation.
          </h2>
          <p data-reveal className="mt-5 max-w-md text-ink/60">
            Une estimation indicative à partir de vos coûts salariaux. Votre devis précis arrive en 3 heures.
          </p>

          <form data-reveal className="mt-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Salaire mensuel brut moyen (€)
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-lg tabular-nums outline-none transition-colors focus:border-accent"
                />
              </label>
              <label className="block text-sm font-medium">
                Nombre de collaborateurs
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-lg tabular-nums outline-none transition-colors focus:border-accent"
                />
              </label>
            </div>

            <div>
              <div className="flex items-baseline justify-between text-sm font-medium">
                <label htmlFor="share">Part des postes externalisés</label>
                <span className="text-lg tabular-nums text-accent">{share} %</span>
              </div>
              <input
                id="share"
                ref={rangeRef}
                type="range"
                min={0}
                max={100}
                step={1}
                value={share}
                onChange={onRange}
                className="range mt-3"
              />
            </div>
          </form>
        </div>

        <div
          data-reveal
          className="flex flex-col justify-between rounded-3xl bg-ink p-8 text-paper md:p-12"
          aria-live="polite"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-paper/50">Économie annuelle estimée</p>
            <p
              ref={savingsRef}
              className="mt-4 text-5xl font-semibold tabular-nums tracking-tight text-accent md:text-7xl"
            >
              {initialSavings}
            </p>
          </div>
          <dl className="mt-12 space-y-3 border-t border-paper/10 pt-6 text-sm text-paper/70">
            <div className="flex justify-between gap-4">
              <dt>Coût annuel actuel du périmètre</dt>
              <dd className="m-0 tabular-nums text-paper">
                <span ref={costRef}>{initialCost}</span>
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Hypothèses</dt>
              <dd className="m-0 text-right">charges 42 % · optimisation 30 %</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
