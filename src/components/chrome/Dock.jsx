import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Home, User, Sparkles, FolderOpen, Mail, Command, Sun, Moon } from "lucide-react";
import { cx } from "@/lib/cx";
import { useTheme } from "@/context/ThemeContext";

const SECTIONS = [
  { id: "top", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "work", label: "Work", icon: FolderOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

/**
 * macOS-style floating dock with scroll-spy highlighting.
 * On project pages it degrades to a single "back to index" affordance.
 */
export function Dock({ onOpenPalette }) {
  const [active, setActive] = useState("top");
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;

    const getSectionInView = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;

      // اقرأ كل section وشوف أيها أكتر ظهوراً في الشاشة
      let bestId = "top";
      let bestVisibility = 0;

      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowH, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibility = visibleHeight / windowH;

        if (visibility > bestVisibility) {
          bestVisibility = visibility;
          bestId = id;
        }
      }

      setActive(bestId);
    };

    // شغل مرة أول ما يتحمل
    getSectionInView();

    window.addEventListener("scroll", getSectionInView, { passive: true });
    return () => window.removeEventListener("scroll", getSectionInView);
  }, [onHome]);

  const go = (id) => {
    const node = document.getElementById(id);
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      aria-label="Primary"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-4 z-[75] flex justify-center px-4 sm:bottom-6"
    >
      <div className="glass flex items-center gap-1 rounded-full p-1.5 shadow-[var(--shadow-lift)]">
        {SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = onHome && active === id;
          const content = (
            <>
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden text-xs font-medium md:inline">{label}</span>
            </>
          );
          const cls = cx(
            "relative flex min-h-11 items-center gap-2 rounded-full px-3 transition-colors duration-300 md:px-4",
            isActive ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground",
          );
          return onHome ? (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className={cls}
              aria-current={isActive ? "true" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">{content}</span>
            </button>
          ) : (
            <Link key={id} to="/" hash={id} className={cls}>
              <span className="relative z-10 flex items-center gap-2">{content}</span>
            </Link>
          );
        })}

        <span className="mx-1 h-6 w-px bg-hairline" aria-hidden="true" />

        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Open command palette"
          className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-accent"
        >
          <Command className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-accent"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </motion.nav>
  );
}
