import { cx } from "@/lib/cx";

/**
 * CSS-driven infinite marquee. The track is duplicated and translated -50%,
 * so the loop is seamless without any JS measuring.
 */
export function Marquee({ items, speed = 42, reverse = false, className, separator = "◆" }) {
  const track = [...items, ...items];
  return (
    <div
      className={cx("group relative flex overflow-hidden", className)}
      role="marquee"
      aria-label="Technologies and focus areas"
    >
      <div
        className="flex w-max shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-x ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            <span className="display text-2xl text-muted-foreground transition-colors duration-300 hover:text-foreground sm:text-3xl">
              {item}
            </span>
            <span aria-hidden="true" className="text-[10px] text-accent">
              {separator}
            </span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
