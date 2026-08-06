import { memo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRelativePointer } from "@/hooks/useMousePosition";
import { usePointerFine, useReducedMotion } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/cx";

/**
 * Tilting case-study card. Memoised because the parent re-renders on every
 * keystroke of the search field.
 */
export const ProjectCard = memo(function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const pointer = useRelativePointer(ref, { enabled: fine && !reduced });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative"
    >
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        data-cursor="view"
        data-cursor-label="Open"
        className="block focus-visible:outline-none"
        aria-label={`Open case study: ${project.title}`}
      >
        <motion.div
          className="panel grain relative overflow-hidden"
          animate={{
            rotateX: hovered ? -pointer.y * 6 : 0,
            rotateY: hovered ? pointer.x * 8 : 0,
          }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          style={{ transformPerspective: 1200 }}
        >
          <div className="relative aspect-16/10 overflow-hidden rounded-t-[calc(var(--radius-2xl)-1px)] bg-surface-2">
            <img
              src={project.cover}
              alt={`${project.title} interface preview`}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
              style={hovered ? { animation: "sheen 1.1s ease-out" } : undefined}
            />
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="glass rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 p-6">
            <div className="min-w-0">
              <h3 className="display truncate text-2xl sm:text-3xl">{project.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-accent">
                {project.year} · {project.role}
              </p>
            </div>
            <span
              className={cx(
                "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline transition-all duration-500",
                "group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground",
              )}
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
});
