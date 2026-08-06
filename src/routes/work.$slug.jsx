import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Gallery } from "@/components/work/Gallery";
import { Reveal, RevealText } from "@/components/primitives/Reveal";
import { Action } from "@/components/primitives/Action";
import { Counter } from "@/components/primitives/Counter";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: CaseStudy,
});

function Block({ eyebrow, title, children }) {
  return (
    <Reveal className="grid gap-4 border-t border-hairline pt-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        {title ? <h2 className="mt-2 text-xl">{title}</h2> : null}
      </div>
      <div className="min-w-0 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </Reveal>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <article className="mx-auto max-w-5xl px-5 pb-32 pt-28 sm:px-8 lg:px-14">
      <Link
        to="/"
        hash="work"
        className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All work
      </Link>

      <header className="mt-10">
        <p className="eyebrow">
          {project.year} · {project.role}
        </p>
        <h1 className="display mt-4 text-balance text-5xl sm:text-6xl lg:text-7xl">
          <RevealText text={project.title} />
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
          {project.tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.links.live && (
            <Action
              as="a"
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              variant="accent"
              magnetic
            >
              Live demo <ArrowUpRight className="h-4 w-4" />
            </Action>
          )}
          {project.links.repo && (
            <Action
              as="a"
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              magnetic
            >
              <Github className="h-4 w-4" /> Repository
            </Action>
          )}
        </div>
      </header>

      <div className="mt-14">
        <Gallery images={project.gallery} title={project.title} />
      </div>

      <div className="panel mt-10 grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
        <div>
          <p className="display text-4xl accent-text">
            <Counter value={project.accentStat.value} suffix={project.accentStat.suffix} />
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            {project.accentStat.label}
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 space-y-12">
        <Block eyebrow="Features" title="What it does">
          <ul className="space-y-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        </Block>

        <Block eyebrow="Challenges" title="Problems & solutions">
          <div className="space-y-6">
            {project.challenges.map((c) => (
              <div key={c.problem}>
                <p className="text-foreground">{c.problem}</p>
                <p className="mt-1.5">{c.solution}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block eyebrow="Architecture">{project.architecture}</Block>
        <Block eyebrow="Responsive behaviour">{project.responsive}</Block>

        <Block eyebrow="Performance">
          <ul className="space-y-2">
            {project.performance.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        </Block>

        <Block eyebrow="Key JavaScript logic">{project.jsLogic}</Block>

        <Block eyebrow="React concepts used">
          <ul className="flex flex-wrap gap-2">
            {project.reactConcepts.map((r) => (
              <li key={r} className="rounded-full border border-hairline px-3 py-1.5 text-xs">
                {r}
              </li>
            ))}
          </ul>
        </Block>

        <Block eyebrow="Lessons learned">{project.lessons}</Block>
      </div>

      <nav aria-label="More case studies" className="mt-20 grid gap-4 sm:grid-cols-2">
        {others.map((p) => (
          <Link
            key={p.slug}
            to="/work/$slug"
            params={{ slug: p.slug }}
            className="panel group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-6 transition-colors hover:border-accent/40"
          >
            <span className="min-w-0">
              <span className="eyebrow">Next</span>
              <span className="display mt-1 block truncate text-2xl">{p.title}</span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        ))}
      </nav>
    </article>
  );
}
