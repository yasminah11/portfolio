import { cx } from "@/lib/cx";
import { Reveal, RevealText } from "@/components/primitives/Reveal";

export function SectionHeading({ index, eyebrow, title, lede, align = "left", className }) {
  return (
    <header
      className={cx(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal from="fade" className="flex items-center gap-3">
        {index ? <span className="eyebrow text-accent">{index}</span> : null}
        <span className="h-px w-8 bg-hairline" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>

      <h2 className="display text-balance text-4xl sm:text-5xl lg:text-6xl">
        <RevealText text={title} />
      </h2>

      {lede ? (
        <Reveal delay={0.1} className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>{lede}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
