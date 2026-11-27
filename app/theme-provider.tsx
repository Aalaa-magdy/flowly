"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  THEME_STORAGE_KEY,
  readStoredMode,
  resolveTheme,
  type ResolvedTheme,
  type ThemeMode,
} from "./theme-config";

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function applyTheme(mode: ThemeMode): ResolvedTheme {
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const resolved = resolveTheme(mode, systemPrefersDark);

  document.documentElement.setAttribute("data-theme", resolved);
  return resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Server and the first client render agree; the layout effect syncs them
  // with the stored preference before the browser paints.
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useIsomorphicLayoutEffect(() => {
    const storedMode = readStoredMode();
    setModeState(storedMode);
    setResolvedTheme(applyTheme(storedMode));
  }, []);

  useEffect(() => {
    if (mode !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setResolvedTheme(applyTheme("system"));

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [mode]);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
    } catch {
      // Storage can be unavailable (e.g. private browsing); keep the in-memory theme.
    }

    setResolvedTheme(applyTheme(nextMode));
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setMode]);

  const value = useMemo(
    () => ({ resolvedTheme, toggleTheme }),
    [resolvedTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
