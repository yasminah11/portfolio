import { useEffect, useState } from "react";

/** Normalised (-0.5 → 0.5) pointer position relative to an element. */
export function useRelativePointer(ref, { enabled = true } = {}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        setPos({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      });
    };
    const onLeave = () => setPos({ x: 0, y: 0 });

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, enabled]);

  return pos;
}
