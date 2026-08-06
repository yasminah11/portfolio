import { useState } from "react";
import { motion } from "motion/react";
import { skills } from "@/data/profile";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/cx";

const ORBITS = [
  { radius: 96, duration: 34, items: ["React.js", "JavaScript", "CSS3"] },
  { radius: 150, duration: 48, items: ["HTML5", "Bootstrap", "REST APIs"] },
  { radius: 204, duration: 62, items: ["Tailwind CSS", "Git", "GitHub"] },
];

function Constellation({ active, onHover }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-[30rem] place-items-center md:grid" aria-hidden="true">
      <div
        className="absolute h-40 w-40 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-accent), transparent 70%)" }}
      />
      <span className="display relative z-10 text-2xl">Stack</span>

      {ORBITS.map((orbit) => (
        <div
          key={orbit.radius}
          className="absolute rounded-full border border-hairline"
          style={{ width: orbit.radius * 2, height: orbit.radius * 2 }}
        >
          <div
            className="absolute inset-0"
            style={
              reduced
                ? undefined
                : { animation: `orbit-spin ${orbit.duration}s linear infinite` }
            }
          >
            {orbit.items.map((item, i) => {
              const angle = (360 / orbit.items.length) * i;
              const isActive = active === item;
              return (
                <span
                  key={item}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${angle}deg) translateX(${orbit.radius}px)` }}
                >
                  <span
                    onMouseEnter={() => onHover(item)}
                    onMouseLeave={() => onHover(null)}
                    className={cx(
                      "pointer-events-auto block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300",
                      isActive
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-hairline bg-surface text-muted-foreground",
                    )}
                    style={
                      reduced
                        ? undefined
                        : { animation: `orbit-spin ${orbit.duration}s linear infinite reverse` }
                    }
                  >
                    {item}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState(null);
  const detail = skills.find((s) => s.name === active);

  return (
    <section id="skills" className="relative scroll-mt-24 border-y border-hairline bg-surface/40 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title="A stack built through real projects, not just tutorials."
          lede="Hover anything to see how I've actually used it. Every skill here maps to a shipped page or a working component — not a certificate."
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
          <ul className="divide-y divide-[color:var(--color-hairline)] border-y border-hairline">
            {skills.map((skill, i) => (
              <motion.li
                key={skill.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                onMouseEnter={() => setActive(skill.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(skill.name)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                className={cx(
                  "group relative grid cursor-default grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-1 py-4 transition-colors duration-300",
                  active === skill.name && "bg-surface",
                )}
              >
                <span className="flex min-w-0 items-baseline gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                  <span className="display truncate text-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-3xl">
                    {skill.name}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-xs uppercase tracking-widest text-accent">{skill.level}</span>
                  <span className="block font-mono text-[10px] text-muted-foreground">{skill.years} yrs</span>
                </span>
                <p className="col-span-2 max-h-0 overflow-hidden text-sm text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100 group-focus-within:max-h-16 group-focus-within:opacity-100">
                  <span className="block pt-2">{skill.note}</span>
                </p>
              </motion.li>
            ))}
          </ul>

          <Reveal from="scale" className="relative">
            <Constellation active={active} onHover={setActive} />
            <div className="panel mt-8 hidden p-5 md:block">
              <p className="eyebrow">{detail ? detail.level : "Hover a technology"}</p>
              <p className="mt-2 min-h-12 text-sm text-muted-foreground">
                {detail ? detail.note : "Each node maps to a real project decision, not a tutorial."}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
