import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("portfolio:theme", "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    const id = setTimeout(() => root.classList.remove("theme-transition"), 420);
    return () => clearTimeout(id);
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), [setTheme]);
  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, setTheme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
