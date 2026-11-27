"use client";

import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";

const iconProps = {
  strokeWidth: 2.5,
  className: "text-black dark:text-white",
} as const;

type NavbarProps = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface px-4 md:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open sidebar"
        className="inline-flex size-10 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-surface-hover hover:text-foreground md:hidden"
      >
        <Menu size={20} aria-hidden="true" {...iconProps} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted">Workspace</span>
          <ChevronRight size={14} aria-hidden="true" {...iconProps} />
          <span className="truncate font-medium">My Projects</span>
        </div>
      </div>

      <label className="hidden sm:block">
        <span className="sr-only">Search projects</span>
        <span className="flex items-center gap-2 rounded-xl border border-border bg-input px-3 py-2 text-muted focus-within:border-primary">
          <Search size={16} aria-hidden="true" {...iconProps} />
          <input
            type="search"
            placeholder="Search..."
            className="w-40 bg-transparent text-foreground outline-none placeholder:text-muted lg:w-56"
          />
        </span>
      </label>

      <button
        type="button"
        aria-label="Notifications"
        className="relative inline-flex size-10 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-surface-hover hover:text-foreground"
      >
        <Bell size={18} aria-hidden="true" {...iconProps} />
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface"
        />
      </button>

      <ThemeToggle />
    </header>
  );
}
