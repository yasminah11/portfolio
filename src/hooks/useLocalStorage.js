import { useCallback, useEffect, useState } from "react";

/** SSR-safe localStorage state. Reads after mount to avoid hydration mismatch. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch {
      /* ignore private-mode failures */
    }
    setHydrated(true);
  }, [key]);

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* ignore */
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, set, hydrated];
}
