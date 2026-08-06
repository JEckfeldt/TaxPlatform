import Link from "next/link";
import { RoleSwitcher } from "@/components/shell/role-switcher";

export function AppHeader({
  eyebrow,
  nav,
}: {
  eyebrow: string;
  nav: { href: string; label: string }[];
}) {
  return (
    <header className="border-border/80 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight">
              Ledgerline
            </span>
            <span className="text-muted-foreground hidden text-xs sm:inline">
              {eyebrow}
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground rounded-md px-2.5 py-1.5 text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <RoleSwitcher />
      </div>
    </header>
  );
}
