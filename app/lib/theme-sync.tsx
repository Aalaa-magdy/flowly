"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useThemeStore } from "./theme-store";

export function ThemeSync() {
  const { theme, setTheme } = useTheme();
  const storedTheme = useThemeStore((state) => state.theme);

  useEffect(() => {
    void useThemeStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!storedTheme || theme === storedTheme) return;
    setTheme(storedTheme);
  }, [storedTheme, theme, setTheme]);

  return null;
}
