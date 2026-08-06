import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

/** Lenis smooth scrolling, loaded only in the browser and off for reduced motion. */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let lenis;
    let frame;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, lerp: 0.1 });
      const raf = (time) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [reduced]);

  return null;
}
