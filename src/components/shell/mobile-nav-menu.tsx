"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { usePersona } from "@/components/persona/persona-provider";
import type { NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNavMenu({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const { selectPersona } = usePersona();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (nav.length === 0) return null;

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="border-border bg-background hover:bg-muted inline-flex size-8 items-center justify-center rounded-lg border outline-none"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="border-border bg-popover text-popover-foreground absolute top-full left-0 z-50 mt-2 min-w-44 rounded-lg border p-1 shadow-md"
        >
          {nav.map((item) => {
            const key = item.href ?? item.switchToPersona ?? item.label;
            if (item.switchToPersona) {
              return (
                <button
                  key={key}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    selectPersona(item.switchToPersona!);
                  }}
                  className={cn(
                    "hover:bg-muted focus-visible:bg-muted block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium outline-none",
                  )}
                >
                  {item.label}
                </button>
              );
            }
            if (!item.href) return null;
            return (
              <Link
                key={key}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "hover:bg-muted focus-visible:bg-muted block rounded-md px-3 py-2.5 text-sm font-medium outline-none",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
