import { forwardRef } from "react";
import { cx } from "@/lib/cx";
import { Magnetic } from "@/components/primitives/Magnetic";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium " +
  "transition-[transform,background-color,color,border-color,box-shadow] duration-300 " +
  "disabled:pointer-events-none disabled:opacity-50 overflow-hidden select-none";

const styles = {
  solid:
    "bg-foreground text-background hover:shadow-[0_18px_40px_-18px_var(--glow-accent)] active:scale-[0.98]",
  accent:
    "bg-accent text-accent-foreground hover:shadow-[0_20px_50px_-18px_var(--glow-accent)] active:scale-[0.98]",
  outline:
    "border border-hairline bg-transparent text-foreground hover:border-accent/60 hover:bg-surface active:scale-[0.98]",
  ghost: "text-muted-foreground hover:text-foreground",
};

const sizes = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-13 px-8 text-[0.95rem]",
  icon: "h-11 w-11",
};

export const Action = forwardRef(function Action(
  { as: Comp = "button", variant = "solid", size = "md", magnetic = false, className, children, ...rest },
  ref,
) {
  const node = (
    <Comp ref={ref} className={cx(base, styles[variant], sizes[size], className)} {...rest}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-white/20 opacity-0 [animation-fill-mode:forwards] group-hover/action:opacity-100"
        />
      )}
    </Comp>
  );

  if (!magnetic) return node;
  return (
    <Magnetic strength={0.28} className="group/action">
      {node}
    </Magnetic>
  );
});
