import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MuiThemeProvider } from "./lib/mui-theme-provider";
import { QueryProvider } from "./lib/query-provider";
import { ThemeSync } from "./lib/theme-sync";
import "./globals.css";
import DashboardWrapper from "./components/layout/dashboard-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flowly",
  description: "Task Mangement App",
  icons: {
    icon: "/logo-icon-2048.png",
    shortcut: "/logo-icon-2048.png",
    apple: "/logo-icon-2048.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head />
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="flowly-theme"
        >
          <ThemeSync />
          <MuiThemeProvider>
            <QueryProvider>
              <DashboardWrapper>{children}</DashboardWrapper>
            </QueryProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
