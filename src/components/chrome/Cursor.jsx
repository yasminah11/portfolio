import { useEffect, useRef, useState } from "react";
import { usePointerFine, useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Two-layer cursor: an instant dot and a lagging ring driven by a rAF lerp.
 * Grows over anything marked [data-cursor] or natively interactive.
 */
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState("idle");
  const fine = usePointerFine();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!fine || reduced) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };
    let frame;

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      const hit = event.target instanceof Element ? event.target.closest("[data-cursor], a, button") : null;
      if (hit) {
        setState(hit.getAttribute("data-cursor") || "hover");
        setLabel(hit.getAttribute("data-cursor-label") || "");
      } else {
        setState("idle");
        setLabel("");
      }
    };

    const loop = () => {
      eased.x += (target.x - eased.x) * 0.16;
      eased.y += (target.y - eased.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      document.documentElement.style.cursor = "";
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  const expanded = state !== "idle";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <span
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-200"
        style={{ opacity: expanded ? 0 : 1 }}
      />
      <span
        ref={ring}
        className="absolute left-0 top-0 grid place-items-center rounded-full border border-accent/70 text-[10px] font-medium uppercase tracking-widest text-accent-foreground transition-[width,height,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: expanded ? (label ? 84 : 46) : 28,
          height: expanded ? (label ? 84 : 46) : 28,
          backgroundColor: expanded ? "var(--color-accent)" : "transparent",
        }}
      >
        {label}
      </span>
    </div>
  );
}
