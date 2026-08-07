import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/primitives/Reveal";
import { cx } from "@/lib/cx";

const GITHUB_USERNAME = "yasminah11";
const WEEKS = 26;
const DAYS = 7;

const LEVELS = ["bg-surface-2", "bg-accent/25", "bg-accent/45", "bg-accent/70", "bg-accent"];

/** Deterministic pseudo-random fallback */
function seeded(i) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function buildFallbackCells() {
  return Array.from({ length: WEEKS * DAYS }, (_, i) => {
    const r = seeded(i);
    const weekday = i % DAYS;
    const weekendPenalty = weekday === 0 || weekday === 6 ? 0.45 : 1;
    return Math.min(4, Math.floor(r * 5 * weekendPenalty));
  });
}

/**
 * Parse GitHub's contribution HTML.
 * GitHub serves data-level="0..4" on each <td> in the calendar table.
 */
function parseContributionHTML(html) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract total from the heading text
    const heading = doc.querySelector("h2");
    const totalMatch = heading?.textContent?.match(/(\d+)\s+contributions/);
    const total = totalMatch ? parseInt(totalMatch[1], 10) : null;

    // Extract per-day levels from <td data-level="N">
    const tds = doc.querySelectorAll("td[data-level]");
    const levels = Array.from(tds).map((td) => parseInt(td.getAttribute("data-level") || "0", 10));

    return { levels, total };
  } catch {
    return { levels: [], total: null };
  }
}

/**
 * GitHub بيرجع الـ data بـ row-major:
 * [كل الأحدات، كل الاتنينات، ...، كل السبوت]
 * الـ CSS grid محتاج column-major:
 * [أسبوع1 كامل، أسبوع2 كامل، ...]
 * فمحتاجين transpose.
 */
function normaliseLevels(levels) {
  if (!levels || levels.length === 0) return null;

  // GitHub بيرجع row-major: (DAYS rows × totalWeeks cols)
  const totalWeeks = Math.floor(levels.length / DAYS);
  if (totalWeeks === 0) return null;

  // خد آخر WEEKS أسبوع بس
  const startWeek = Math.max(0, totalWeeks - WEEKS);
  const usedWeeks = totalWeeks - startWeek;

  // Transpose من row-major لـ column-major
  const result = [];
  for (let week = startWeek; week < totalWeeks; week++) {
    for (let day = 0; day < DAYS; day++) {
      result.push(levels[day * totalWeeks + week] ?? 0);
    }
  }

  return result.length === usedWeeks * DAYS ? result : null;
}

export function Activity() {
  const [hovered, setHovered] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [cells, setCells] = useState(() => buildFallbackCells());
  const [totalContributions, setTotalContributions] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | live | fallback

  useEffect(() => {
    setMounted(true);

    async function fetchContributions() {
      // Try multiple CORS proxies in order
      const proxies = [
        (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
        (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
        (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
      ];

      const targetUrl = `https://github.com/users/${GITHUB_USERNAME}/contributions`;

      for (const makeProxy of proxies) {
        try {
          const res = await fetch(makeProxy(targetUrl), {
            signal: AbortSignal.timeout(6000),
          });

          if (!res.ok) continue;

          // allorigins returns { contents: "...", status: {...} }
          // corsproxy.io returns the HTML directly
          let html;
          const ct = res.headers.get("content-type") || "";
          if (ct.includes("application/json")) {
            const json = await res.json();
            html = json.contents ?? json;
          } else {
            html = await res.text();
          }

          if (!html || typeof html !== "string") continue;

          const { levels, total } = parseContributionHTML(html);
          const normalised = normaliseLevels(levels);

          if (normalised && normalised.length > 0) {
            setCells(normalised);
            if (total != null) setTotalContributions(total);
            setStatus("live");
            return;
          }
        } catch {
          // try next proxy
        }
      }

      // All proxies failed — keep fallback but show a real count if we know it
      setStatus("fallback");
    }

    fetchContributions();
  }, []);

  const displayTotal = useMemo(() => {
    if (totalContributions != null) return totalContributions;
    return null;
  }, [totalContributions]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-14">
      <Reveal className="panel grain overflow-hidden p-6 sm:p-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <p className="eyebrow">GitHub activity</p>
            <h3 className="mt-2 text-2xl">
              {status === "loading"
                ? "Loading contributions…"
                : displayTotal != null
                  ? `${displayTotal.toLocaleString()} contributions in the last year`
                  : "Contributions in the last year"}
            </h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block font-mono text-xs text-accent hover:underline"
            >
              @{GITHUB_USERNAME} on GitHub ↗
            </a>
          </div>
          <span className="shrink-0 rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {status === "live" ? "Live data" : status === "loading" ? "Loading…" : "GitHub"}
          </span>
        </div>

        <div className="mt-7 overflow-x-auto pb-2">
          <div
            className="grid w-max grid-flow-col gap-1"
            style={{ gridTemplateRows: `repeat(${DAYS}, minmax(0, 1fr))` }}
            role="img"
            aria-label={`GitHub contribution heatmap for @${GITHUB_USERNAME}`}
          >
            {cells.map((level, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={mounted ? { opacity: 1, scale: 1 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.28, delay: (i % WEEKS) * 0.006 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={cx(
                  "h-3 w-3 rounded-[3px] transition-transform duration-200",
                  LEVELS[level],
                  hovered === i && "scale-150",
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">
            {hovered === null ? "Hover a day" : `${cells[hovered]} contributions`}
          </span>
          <span className="flex items-center gap-1.5">
            Less
            {LEVELS.map((c) => (
              <span key={c} className={cx("h-3 w-3 rounded-[3px]", c)} />
            ))}
            More
          </span>
        </div>
      </Reveal>
    </section>
  );
}
