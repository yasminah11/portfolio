import { forwardRef, useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { cx } from "@/lib/cx";
import { usePointerFine, useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Wraps any element and pulls it toward the cursor.
 * Falls back to a plain wrapper on touch / reduced motion.
 */
export const Magnetic = forwardRef(function Magnetic(
  { children, strength = 0.35, className },
  forwardedRef,
) {
  const localRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const onMove = useCallback(
    (event) => {
      if (!active) return;
      const rect = localRef.current.getBoundingClientRect();
      setOffset({
        x: (event.clientX - (rect.left + rect.width / 2)) * strength,
        y: (event.clientY - (rect.top + rect.height / 2)) * strength,
      });
    },
    [active, strength],
  );

  return (
    <motion.div
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className={cx("inline-flex", className)}
      onPointerMove={onMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
});
