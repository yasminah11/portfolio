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

      // اخلي الـ instance متاح globally
      window.__lenis = lenis;

      // خلي Lenis يتعامل مع الـ anchor links تلقائياً
      lenis.on("scroll", () => {});

      const raf = (time) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      // اعمل custom event listener عشان أي حاجة تقدر تعمل scroll
      const handleScrollTo = (e) => {
        const { target, options } = e.detail;
        lenis.scrollTo(target, options);
      };
      window.addEventListener("lenis:scrollTo", handleScrollTo);

      // cleanup
      lenis._handleScrollTo = handleScrollTo;
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      if (lenis?._handleScrollTo) {
        window.removeEventListener("lenis:scrollTo", lenis._handleScrollTo);
      }
      lenis?.destroy();
      window.__lenis = null;
    };
  }, [reduced]);

  return null;
}
