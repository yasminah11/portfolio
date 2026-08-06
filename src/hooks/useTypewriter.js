import { useEffect, useRef, useState } from "react";

/**
 * Types a word, holds, deletes, moves on. Timers are cleared on every
 * transition so the loop never double-schedules.
 */
export function useTypewriter(words, { typeMs = 65, deleteMs = 32, holdMs = 1600 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timer = useRef();

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    if (done) {
      timer.current = setTimeout(() => setDeleting(true), holdMs);
    } else if (cleared) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timer.current = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteMs : typeMs,
      );
    }

    return () => clearTimeout(timer.current);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs]);

  return text;
}
