import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { Counter } from "@/components/primitives/Counter";
import { cx } from "@/lib/cx";

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "education", label: "Education" },
  { id: "principles", label: "Principles" },
];

function Timeline({ items }) {
  return (
    <ol className="relative space-y-8 border-l border-hairline pl-6 sm:pl-8">
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="group relative"
        >
          <span className="absolute -left-[1.65rem] top-2 grid h-3 w-3 place-items-center sm:-left-[2.15rem]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-[2.2]" />
          </span>
          <p className="font-mono text-xs text-accent">{item.year}</p>
          <h3 className="mt-1.5 text-xl">
            {item.title}
            {item.org ? <span className="text-muted-foreground"> · {item.org}</span> : null}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
          {item.tags && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

export function About() {
  const [tab, setTab] = useState("journey");

  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8 sm:py-36 lg:px-14">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Building for the web with care, curiosity, and clean code."
        lede="I'm a Front-End Developer from Beni Suef, Egypt — studying Computer Science at BSNU while shipping real projects for real users. I care about responsive layouts, readable code, and interfaces that just work."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.07} className="panel grain p-6">
            <p className="display text-4xl accent-text sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <div role="tablist" aria-label="About sections" className="flex flex-wrap gap-1 border-b border-hairline">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cx(
                "relative min-h-11 px-4 text-sm transition-colors",
                tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
              {tab === t.id && (
                <motion.span layoutId="about-tab" className="absolute inset-x-2 -bottom-px h-px bg-accent" />
              )}
            </button>
          ))}
        </div>

        <div className="pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {tab === "journey" && <Timeline items={profile.timeline} />}
              {tab === "education" && <Timeline items={profile.education} />}
              {tab === "principles" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {profile.principles.map((p, i) => (
                    <motion.article
                      key={p.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.5 }}
                      className="panel group p-6 transition-colors hover:border-accent/40"
                    >
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <h3 className="mt-3 text-xl">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
