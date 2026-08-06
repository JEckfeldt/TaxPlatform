import { AppHeader } from "@/components/shell/app-header";

const nav = [
  { href: "/firm/dashboard", label: "Dashboard" },
  { href: "/firm/returns/ret-alex-2025", label: "Sample return" },
];

export default function FirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AppHeader eyebrow="Firm" nav={nav} />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </div>
    </div>
  );
}
