"use client";

import { useState, type ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function DashboardWrapper({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background font-sans text-foreground">
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
      />
      <div
        className={`flex min-w-0 flex-1 flex-col ${
          sidebarCollapsed ? "md:pl-16" : "md:pl-64"
        }`}
      >
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-8 md:px-6">{children}</main>
      </div>
    </div>
  );
}
