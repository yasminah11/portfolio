import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, CornerDownLeft, Search } from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { useTheme } from "@/context/ThemeContext";
import { cx } from "@/lib/cx";

/** Fuzzy-ish scoring: subsequence match, weighted by contiguity. */
function score(query, text) {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return 100 - t.indexOf(q);
  let i = 0;
  let hits = 0;
  for (const char of t) {
    if (char === q[i]) {
      i += 1;
      hits += 1;
    }
    if (i === q.length) break;
  }
  return i === q.length ? hits : 0;
}

export function CommandPalette({ open, onOpenChange }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { toggle, theme } = useTheme();

  const commands = useMemo(() => {
    const goSection = (id) => () => {
      navigate({ to: "/", hash: id }).then(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    };
    return [
      { id: "home", group: "Navigate", label: "Go to top", run: goSection("top") },
      { id: "about", group: "Navigate", label: "About & journey", run: goSection("about") },
      { id: "skills", group: "Navigate", label: "Skills constellation", run: goSection("skills") },
      { id: "work", group: "Navigate", label: "Selected work", run: goSection("work") },
      { id: "contact", group: "Navigate", label: "Contact", run: goSection("contact") },
      ...projects.map((p) => ({
        id: p.slug,
        group: "Case studies",
        label: p.title,
        hint: p.tagline,
        run: () => navigate({ to: "/work/$slug", params: { slug: p.slug } }),
      })),
      {
        id: "theme",
        group: "Actions",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
        run: toggle,
      },
      {
        id: "email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé",
        run: () => window.open(profile.resumeUrl, "_blank", "noopener"),
      },
      ...profile.socials.map((s) => ({
        id: `social-${s.label}`,
        group: "Elsewhere",
        label: s.label,
        hint: s.handle,
        run: () => window.open(s.href, "_blank", "noopener"),
      })),
    ];
  }, [navigate, theme, toggle]);

  const results = useMemo(() => {
    return commands
      .map((c) => ({ ...c, s: score(query, `${c.label} ${c.hint ?? ""} ${c.group}`) }))
      .filter((c) => c.s > 0)
      .sort((a, b) => b.s - a.s);
  }, [commands, query]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
    else setQuery("");
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (c + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter" && results[cursor]) {
      event.preventDefault();
      results[cursor].run();
      onOpenChange(false);
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="panel relative w-full max-w-xl overflow-hidden"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-hairline px-5">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, case studies, actions…"
                aria-label="Search commands"
                className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden shrink-0 rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
              {results.length === 0 && (
                <li className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Nothing matches “{query}”. Try “work”, “React” or “résumé”.
                </li>
              )}
              {results.map((item, i) => {
                const showGroup = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <li key={item.id}>
                    {showGroup && <p className="eyebrow px-3 pb-1 pt-3">{item.group}</p>}
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === cursor}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => {
                        item.run();
                        onOpenChange(false);
                      }}
                      className={cx(
                        "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                        i === cursor ? "bg-surface-2 text-foreground" : "text-muted-foreground",
                      )}
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate">{item.label}</span>
                        {item.hint && <span className="truncate text-xs text-muted-foreground">{item.hint}</span>}
                      </span>
                      {i === cursor ? (
                        <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-accent" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
