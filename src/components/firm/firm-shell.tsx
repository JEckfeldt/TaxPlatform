"use client";

import { AppHeader } from "@/components/shell/app-header";
import type { NavItem } from "@/lib/nav";

const FIRM_NAV: NavItem[] = [
  { href: "/firm/dashboard", label: "Dashboard" },
  { label: "Personal filing", switchToPersona: "jordan-personal" },
];

export function FirmShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AppHeader eyebrow="Firm" nav={FIRM_NAV} />
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}
