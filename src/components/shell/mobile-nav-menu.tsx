"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MobileNavMenu({
  nav,
}: {
  nav: { href: string; label: string }[];
}) {
  const router = useRouter();

  if (nav.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open navigation"
        className="border-border bg-background hover:bg-muted inline-flex size-8 items-center justify-center rounded-lg border outline-none md:hidden"
      >
        <Menu className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-40">
        {nav.map((item) => (
          <DropdownMenuItem
            key={item.href}
            onClick={() => router.push(item.href)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
