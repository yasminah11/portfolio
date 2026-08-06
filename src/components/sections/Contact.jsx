import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Loader2, Send } from "lucide-react";
import { faqs, profile } from "@/data/profile";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Action } from "@/components/primitives/Action";
import { cx } from "@/lib/cx";

function Accordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-[color:var(--color-hairline)] border-y border-hairline">
      {faqs.map((faq, i) => {
        const expanded = open === i;
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpen(expanded ? -1 : i)}
              aria-expanded={expanded}
              className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 text-left"
            >
              <span className="min-w-0 text-base sm:text-lg">{faq.q}</span>
              <span className={cx("shrink-0 text-accent transition-transform duration-300", expanded && "rotate-45")}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="block pb-5 pr-8">{faq.a}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const next = {};
    if (!data.name?.trim()) next.name = "Tell me who you are.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "That email looks off.";
    if ((data.message ?? "").trim().length < 12) next.message = "A little more detail helps.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1100);
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-hairline py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="04"
          eyebrow="Contact"
          title="Let's work together."
          lede="Whether it's a freelance project, a junior role, or just a question — I'm happy to hear from you. I reply within two working days."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={onSubmit} noValidate className="panel relative overflow-hidden p-6 sm:p-8">
            <AnimatePresence>
              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-10 grid place-items-center bg-surface/95 p-8 text-center backdrop-blur"
                >
                  <div>
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-foreground"
                    >
                      <Check className="h-7 w-7" />
                    </motion.span>
                    <h3 className="display mt-6 text-3xl">Message received</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thanks — I'll come back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 min-h-11 rounded-full border border-hairline px-5 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      Send another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-5">
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Ada Lovelace" },
                { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="eyebrow">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                    className="mt-2 h-12 w-full rounded-xl border border-hairline bg-background/50 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-accent"
                  />
                  {errors[field.name] && (
                    <p id={`${field.name}-error`} className="mt-1.5 text-xs text-destructive">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="message" className="eyebrow">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What are you building?"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="mt-2 w-full resize-none rounded-xl border border-hairline bg-background/50 p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-accent"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <Action type="submit" variant="accent" size="lg" disabled={status === "sending"} className="w-full">
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send message
                  </>
                )}
              </Action>
            </div>
          </form>

          <div className="flex flex-col gap-8">
            <div className="panel p-6 sm:p-8">
              <p className="eyebrow">Direct</p>
              <button
                type="button"
                onClick={copyEmail}
                className="group mt-3 flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="display truncate text-2xl sm:text-3xl">{profile.email}</span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline transition-colors group-hover:border-accent group-hover:text-accent">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </span>
              </button>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Accordion />
          </div>
        </div>
      </div>
    </section>
  );
}
