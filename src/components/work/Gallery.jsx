import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cx } from "@/lib/cx";

/** Carousel + accessible lightbox with keyboard paging. */
export function Gallery({ images, title }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const step = useCallback(
    (delta) => setIndex((i) => (i + delta + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <div>
      <div className="panel relative overflow-hidden">
        <div className="relative aspect-16/10 bg-surface-2">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt={`${title} screenshot ${index + 1} of ${images.length}`}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
              onClick={() => setOpen(true)}
            />
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-4 p-4">
          <div className="flex gap-2">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-current={i === index}
                className={cx(
                  "h-14 w-20 overflow-hidden rounded-lg border transition-all duration-300",
                  i === index ? "border-accent opacity-100" : "border-hairline opacity-55 hover:opacity-90",
                )}
              >
                <img src={src} alt="" width={160} height={100} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
              className="grid h-11 w-11 place-items-center rounded-full border border-hairline transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screenshot"
              className="grid h-11 w-11 place-items-center rounded-full border border-hairline transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[96] grid place-items-center bg-background/90 p-4 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="Close gallery"
              onClick={() => setOpen(false)}
              className="glass absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
            <motion.img
              key={index}
              src={images[index]}
              alt={`${title} screenshot ${index + 1}`}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[82vh] w-auto max-w-[92vw] rounded-2xl border border-hairline object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
