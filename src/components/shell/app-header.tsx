import Link from "next/link";
import { MobileNavMenu } from "@/components/shell/mobile-nav-menu";
import { RoleSwitcher } from "@/components/shell/role-switcher";

export function AppHeader({
  eyebrow,
  nav,
}: {
  eyebrow: string;
  nav: { href: string; label: string }[];
}) {
  return (
    <header className="border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
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
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md px-2.5 py-1.5 text-sm transition-colors"
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
