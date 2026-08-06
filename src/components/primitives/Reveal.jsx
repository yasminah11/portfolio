import { motion } from "motion/react";
import { cx } from "@/lib/cx";

const variants = {
  up: { y: 26, opacity: 0 },
  down: { y: -26, opacity: 0 },
  left: { x: 30, opacity: 0 },
  right: { x: -30, opacity: 0 },
  scale: { scale: 0.96, opacity: 0 },
  fade: { opacity: 0 },
};

/** Scroll-triggered entrance. One primitive, used everywhere. */
export function Reveal({ children, from = "up", delay = 0, className, as = "div", once = true }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={cx(className)}
      initial={variants[from]}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Splits a string into words and staggers them in. */
export function RevealText({ text, className, delay = 0, wordClassName }) {
  return (
    <span className={cx("inline-flex flex-wrap", className)}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={cx("inline-block", wordClassName)}
          initial={{ y: "0.6em", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}
