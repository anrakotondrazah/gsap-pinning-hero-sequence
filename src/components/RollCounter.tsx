import { pad2 } from "@/lib/motion";

interface RollCounterProps {
  count: number;
  className?: string;
}

/**
 * Compteur "01 / 10" : le chiffre défile verticalement (overflow hidden,
 * chaque cellule [data-roll] reçoit translateY(-100% * n) via GSAP).
 */
export default function RollCounter({ count, className = "" }: RollCounterProps) {
  const cells = Array.from({ length: count }, (_, i) => pad2(i + 1));
  return (
    <div
      className={`flex items-baseline gap-3 font-semibold tabular-nums ${className}`}
      aria-hidden="true"
    >
      <div className="h-[1em] overflow-hidden text-6xl leading-none">
        {cells.map((c) => (
          <span key={c} data-roll className="block h-[1em] leading-none will-change-transform">
            {c}
          </span>
        ))}
      </div>
      <span className="text-xl opacity-50">/ {pad2(count)}</span>
    </div>
  );
}
