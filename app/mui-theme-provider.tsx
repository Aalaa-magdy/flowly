"use client";

import {
  createTheme,
  ThemeProvider as MuiThemeProviderBase,
} from "@mui/material/styles";
import { useMemo, type ReactNode } from "react";
import { useTheme } from "./theme-provider";

export function MuiThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const theme = useMemo(
    () => createTheme({ palette: { mode: resolvedTheme } }),
    [resolvedTheme],
  );

  return <MuiThemeProviderBase theme={theme}>{children}</MuiThemeProviderBase>;
}
