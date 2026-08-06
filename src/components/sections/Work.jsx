import { useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, SearchX } from "lucide-react";
import { categories, projects } from "@/data/projects";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { cx } from "@/lib/cx";

/** Ranked search across title, tagline, tech and category. */
function match(project, query) {
  if (!query) return true;
  const haystack = [project.title, project.tagline, project.summary, ...project.tech, ...project.categories]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

export function Work() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) => (category === "All" || p.categories.includes(category)) && match(p, deferredQuery),
      ),
    [category, deferredQuery],
  );

  return (
    <section id="work" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8 sm:py-36 lg:px-14">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title="Real projects, shipped for real users."
        lede="Filter by technology or search the stack. Each card opens a full write-up: what the project was, the problems I hit, and how I solved them."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={active}
                className={cx(
                  "relative min-h-11 rounded-full border px-4 text-sm transition-colors duration-300",
                  active
                    ? "border-transparent text-accent-foreground"
                    : "border-hairline text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 340, damping: 30 }} />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            );
          })}
        </div>

        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stack, e.g. GSAP"
            aria-label="Search projects"
            className="h-11 w-full rounded-full border border-hairline bg-surface/60 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-accent"
          />
        </div>
      </div>

      <p aria-live="polite" className="mt-4 font-mono text-xs text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "case study" : "case studies"}
        {category !== "All" ? ` in ${category}` : ""}
      </p>

      <motion.div layout className="mt-8 grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="panel mt-8 flex flex-col items-center gap-3 px-6 py-20 text-center"
        >
          <SearchX className="h-6 w-6 text-accent" />
          <p className="display text-2xl">Nothing here yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            No case study matches “{query}”{category !== "All" ? ` inside ${category}` : ""}.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-2 min-h-11 rounded-full border border-hairline px-5 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Reset filters
          </button>
        </motion.div>
      )}
    </section>
  );
}
