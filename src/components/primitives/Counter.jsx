import { useCountUp } from "@/hooks/useCountUp";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/cx";

export function Counter({ value, suffix = "", decimals = 0, className }) {
  const reduced = useReducedMotion();
  const [ref, current] = useCountUp(value, { decimals, enabled: !reduced });

  return (
    <span ref={ref} className={cx("tabular-nums", className)}>
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
}
