"use client";

import {
  createTheme,
  ThemeProvider as MuiThemeProviderBase,
} from "@mui/material/styles";
import { useTheme } from "next-themes";
import { useMemo, type ReactNode } from "react";

export function MuiThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return <MuiThemeProviderBase theme={theme}>{children}</MuiThemeProviderBase>;
}
