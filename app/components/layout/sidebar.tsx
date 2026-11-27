"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const projects = [
  { name: "UI Design", id: "ui-design", color: "var(--primary)" },
  { name: "Development", id: "development", color: "var(--accent-blue)" },
  { name: "Marketing", id: "marketing", color: "var(--accent-pink)" },
  { name: "Research", id: "research", color: "var(--accent-yellow)" },
];

const teams = [
  { name: "Design", id: "design", color: "var(--primary)" },
  { name: "Engineering", id: "engineering", color: "var(--accent-blue)" },
  { name: "Marketing", id: "marketing", color: "var(--accent-pink)" },
];

const settingsItems = [
  { name: "General", id: "general", color: "var(--primary)" },
  { name: "Members", id: "members", color: "var(--accent-blue)" },
  { name: "Notifications", id: "notifications", color: "var(--accent-pink)" },
];

type MenuKey = "projects" | "teams" | "settings";
type MenuItem = { id: string; label: string; color: string; href: string };
type MenuConfig = {
  key: MenuKey;
  label: string;
  icon: LucideIcon;
  items: MenuItem[];
};
type NavEntry =
  | { kind: "link"; label: string; href: string; icon: LucideIcon }
  | { kind: "menu"; menu: MenuConfig };

const menus: MenuConfig[] = [
  {
    key: "projects",
    label: "My Projects",
    icon: FolderKanban,
    items: projects.map(({ id, name, color }) => ({
      id,
      label: name,
      color,
      href: `#project-${id}`,
    })),
  },
  {
    key: "teams",
    label: "Teams",
    icon: UsersRound,
    items: teams.map(({ id, name, color }) => ({
      id,
      label: name,
      color,
      href: `#team-${id}`,
    })),
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    items: settingsItems.map(({ id, name, color }) => ({
      id,
      label: name,
      color,
      href: `#settings-${id}`,
    })),
  },
];

const navEntries: NavEntry[] = [
  { kind: "link", label: "Overview", href: "/", icon: LayoutDashboard },
  { kind: "link", label: "Planner", href: "#planner", icon: CalendarCheck },
  { kind: "link", label: "Calendar", href: "#calendar", icon: CalendarDays },
  { kind: "link", label: "Inbox", href: "#inbox", icon: Inbox },
  { kind: "link", label: "Reports", href: "#reports", icon: BarChart3 },
  { kind: "menu", menu: menus[0] },
  { kind: "menu", menu: menus[1] },
  { kind: "menu", menu: menus[2] },
];

const iconProps = {
  strokeWidth: 2.5,
} as const;

type SidebarProps = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

export default function Sidebar({
  open,
  collapsed,
  onClose,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const isRail = collapsed && !open;

  useEffect(() => {
    const syncActiveHash = () => setActiveHash(window.location.hash);
    syncActiveHash();
    window.addEventListener("hashchange", syncActiveHash);
    return () => window.removeEventListener("hashchange", syncActiveHash);
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" && !activeHash
      : href === activeHash || pathname === href;

  const select = (href: string) => {
    onClose();
    setActiveHash(href === "/" ? "" : href);
  };

  const linkClass = (href: string, compact = false) => {
    const active = isActive(href);
    return `flex w-full items-center gap-3 rounded-xl text-sm font-medium transition-colors ${
      isRail ? "justify-center px-0" : "px-3"
    } ${compact ? "py-2" : "py-2.5"} ${
      active
        ? "bg-surface-secondary text-primary"
        : "text-black hover:bg-surface-hover dark:text-white"
    }`;
  };

  const menuIsActive = (menu: MenuConfig) =>
    menu.items.some((item) => isActive(item.href));

  const parentClass = (menu: MenuConfig) =>
    `flex w-full items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-colors ${
      isRail ? "justify-center px-0" : "px-3"
    } ${
      menuIsActive(menu)
        ? "bg-surface-secondary text-primary"
        : "text-black hover:bg-surface-hover dark:text-white"
    }`;

  const toggleMenu = (key: MenuKey) =>
    setOpenMenu((current) => (current === key ? null : key));

  const openFromRail = (key: MenuKey) => {
    onToggleCollapse();
    setOpenMenu(key);
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-surface transition-[width,transform] duration-200 ${
          isRail ? "w-16" : "w-64"
        } ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div
          className={`flex h-16 shrink-0 items-center border-b border-border ${
            isRail ? "justify-center px-2" : "justify-between px-5"
          }`}
        >
          <Link
            href="/"
            onClick={() => select("/")}
            title={isRail ? "Flowly" : undefined}
            className="flex items-center gap-2.5"
          >
            <Image src="/logo-mark.svg" alt="" width={30} height={32} priority />
            {!isRail && <span className="text-base font-semibold">Flowly</span>}
          </Link>

          {!isRail && (
            <>
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
                className="hidden size-8 items-center justify-center rounded-lg text-black transition-colors hover:bg-surface-hover dark:text-white md:inline-flex"
              >
                <PanelLeftClose size={18} aria-hidden="true" {...iconProps} />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close sidebar"
                className="inline-flex size-8 items-center justify-center rounded-lg text-black transition-colors hover:bg-surface-hover dark:text-white md:hidden"
              >
                <X size={18} aria-hidden="true" {...iconProps} />
              </button>
            </>
          )}
        </div>

        {isRail && (
          <div className="flex shrink-0 justify-center py-3">
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="inline-flex size-10 items-center justify-center rounded-lg text-black transition-colors hover:bg-surface-hover dark:text-white"
            >
              <PanelLeftOpen size={18} aria-hidden="true" {...iconProps} />
            </button>
          </div>
        )}

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
          {!isRail && (
            <p className="px-3 pb-2 text-xs font-medium tracking-wider text-muted uppercase">
              Workspace
            </p>
          )}
          <ul className="space-y-1">
            {navEntries.map((entry) => {
              if (entry.kind === "link") {
                const { label, href, icon: Icon } = entry;
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => select(href)}
                      title={isRail ? label : undefined}
                      className={linkClass(href)}
                    >
                      <Icon size={18} aria-hidden="true" {...iconProps} />
                      <span className={isRail ? "sr-only" : ""}>{label}</span>
                    </Link>
                  </li>
                );
              }

              const { menu } = entry;
              const Icon = menu.icon;
              const expanded = openMenu === menu.key;
              const childrenId = `menu-${menu.key}`;

              return (
                <li key={menu.key}>
                  <button
                    type="button"
                    onClick={() =>
                      isRail ? openFromRail(menu.key) : toggleMenu(menu.key)
                    }
                    aria-expanded={isRail ? undefined : expanded}
                    aria-controls={isRail ? undefined : childrenId}
                    title={isRail ? menu.label : undefined}
                    className={parentClass(menu)}
                  >
                    <Icon size={18} aria-hidden="true" {...iconProps} />
                    <span className={isRail ? "sr-only" : ""}>{menu.label}</span>
                    {!isRail && (
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className={`ml-auto transition-transform ${
                          expanded ? "" : "-rotate-90"
                        }`}
                        {...iconProps}
                      />
                    )}
                  </button>

                  {!isRail && (
                    <div id={childrenId} hidden={!expanded}>
                      <ul className="ml-3 space-y-1 border-l border-border pl-3 pt-1">
                        {menu.items.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={item.href}
                              onClick={() => select(item.href)}
                              className={linkClass(item.href, true)}
                            >
                              <span
                                aria-hidden="true"
                                className="size-2 shrink-0 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="truncate">{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={
            isRail
              ? "flex shrink-0 justify-center border-t border-border px-2 py-4"
              : "shrink-0 border-t border-border p-4"
          }
        >
          <div
            className={
              isRail
                ? "rounded-xl bg-surface-secondary p-2"
                : "flex items-center gap-3 rounded-xl bg-surface-secondary p-3"
            }
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-primary">
              FW
            </span>
            {!isRail && (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">My Workspace</p>
                <p className="truncate text-xs text-muted">Free plan</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
