import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";

/**
 * Shown once per session (sessionStorage), so repeat navigation is instant.
 */
export function Preloader() {
  const [done, setDone] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("portfolio:booted")) return;
    setDone(false);

    let value = 0;
    const id = setInterval(() => {
      value = Math.min(100, value + Math.random() * 18 + 6);
      setProgress(Math.round(value));
      if (value >= 100) {
        clearInterval(id);
        sessionStorage.setItem("portfolio:booted", "1");
        setTimeout(() => setDone(true), 420);
      }
    }, 120);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex w-[min(88vw,26rem)] flex-col gap-6">
            <div className="flex items-end justify-between">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="display text-6xl accent-text"
              >
                {profile.initials}
              </motion.span>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">{progress}%</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-hairline">
              <motion.div
                className="h-full bg-[image:var(--gradient-accent)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.12 }}
              />
            </div>
            <span className="eyebrow">Preparing the interface</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
