"use client";

import Link from "next/link";
import { usePersona } from "@/components/persona/persona-provider";
import { MobileNavMenu } from "@/components/shell/mobile-nav-menu";
import type { NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

const navLinkClass =
  "text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md px-2.5 py-1.5 text-sm transition-colors";

export function AppHeader({
  eyebrow,
  nav,
}: {
  eyebrow: string;
  nav: NavItem[];
}) {
  const { selectPersona } = usePersona();

  return (
    <header className="border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-6">
          <MobileNavMenu nav={nav} />
          <Link href="/" className="flex min-w-0 items-baseline gap-2">
            <span className="font-heading text-lg font-semibold tracking-tight">
              GreenGrowth
            </span>
            <span className="text-muted-foreground hidden text-xs sm:inline">
              {eyebrow}
            </span>
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex">
            {nav.map((item) => {
              const key = item.href ?? item.switchToPersona ?? item.label;
              if (item.switchToPersona) {
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectPersona(item.switchToPersona!)}
                    className={cn(navLinkClass)}
                  >
                    {item.label}
                  </button>
                );
              }
              if (!item.href) return null;
              return (
                <Link key={key} href={item.href} className={cn(navLinkClass)}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
