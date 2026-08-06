import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useRelativePointer } from "@/hooks/useMousePosition";
import { usePointerFine, useReducedMotion } from "@/hooks/useMediaQuery";
import { Action } from "@/components/primitives/Action";
import { Magnetic } from "@/components/primitives/Magnetic";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: 0,
    transition: { duration: 1.05, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  const ref = useRef(null);
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const pointer = useRelativePointer(ref, { enabled: fine && !reduced });
  const role = useTypewriter(profile.roles);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const shift = (depth) => ({
    x: pointer.x * depth,
    y: pointer.y * depth,
  });

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-dvh flex-col justify-center overflow-hidden px-5 pb-28 pt-28 sm:px-8 lg:px-14"
    >
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hairline-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]" />
        <motion.div
          animate={shift(-26)}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="absolute left-1/2 top-[18%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full opacity-70 blur-[130px]"
          style={{ background: "radial-gradient(circle, var(--glow-accent), transparent 65%)" }}
        />
        <motion.span
          animate={shift(38)}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          className="absolute left-[12%] top-[26%] h-24 w-24 rounded-full border border-hairline"
          style={{ animation: "float-y 7s ease-in-out infinite" }}
        />
        <motion.span
          animate={shift(-52)}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          className="absolute right-[14%] top-[62%] h-16 w-16 rotate-45 border border-accent/30"
          style={{ animation: "float-y 9s ease-in-out infinite" }}
        />
        <motion.span
          animate={shift(64)}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          className="absolute right-[26%] top-[20%] h-2 w-2 rounded-full bg-accent"
        />
      </div>

      <motion.div style={{ y: parallaxY, opacity: fade }} className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for freelance & junior roles · {profile.location}
        </motion.p>

        <h1 className="mt-7">
          <span className="sr-only">
            {profile.name} — Front-End Developer
          </span>
          {/* Name - big and prominent */}
          <span aria-hidden="true" className="block">
            <span className="block overflow-hidden">
              <motion.span
                variants={line}
                custom={0}
                initial="hidden"
                animate="show"
                className="display block text-[clamp(2.4rem,8vw,7rem)] leading-none"
              >
                Yasmin
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={line}
                custom={1}
                initial="hidden"
                animate="show"
                className="display block text-[clamp(2.4rem,8vw,7rem)] leading-none italic accent-text"
              >
                Ahmed Mohamed
              </motion.span>
            </span>
          </span>
          {/* Tagline */}
          <span className="block overflow-hidden mt-5">
            <motion.span
              variants={line}
              custom={2}
              initial="hidden"
              animate="show"
              className="display block text-[clamp(1.4rem,4vw,3.2rem)] leading-tight text-muted-foreground"
            >
              Front-End Developer
            </motion.span>
          </span>
        </h1>

        <div className="mt-9 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="font-mono text-sm text-accent">
              {profile.name} — {role}
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-accent motion-safe:animate-pulse" />
            </p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Action
                as="a"
                href="#work"
                variant="accent"
                size="lg"
                magnetic
                data-cursor="view"
                data-cursor-label="Work"
              >
                See the work <ArrowUpRight className="h-4 w-4" />
              </Action>
              <Action as="a" href={profile.resumeUrl} variant="outline" size="lg" magnetic download>
                <Download className="h-4 w-4" /> Résumé
              </Action>
            </div>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-hairline pt-6 lg:justify-items-end lg:border-t-0 lg:pt-0"
          >
            {profile.socials.map((s) => (
              <li key={s.label}>
                <Magnetic strength={0.2}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </Magnetic>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label="Scroll to about section"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-accent sm:block"
      >
        <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" />
      </motion.a>
    </section>
  );
}
