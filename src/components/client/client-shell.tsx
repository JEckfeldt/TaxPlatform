"use client";

import { ClientDemoProvider } from "@/components/client/client-demo-provider";
import { AppHeader } from "@/components/shell/app-header";

const CLIENT_NAV = [
  { href: "/client/home", label: "Home" },
  { href: "/client/messages", label: "Messages" },
];

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ClientDemoProvider>
      <div className="flex min-h-full flex-1 flex-col">
        <AppHeader eyebrow="Client" nav={CLIENT_NAV} />
        <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-5 sm:px-6 sm:py-8">
          {children}
        </div>
      </div>
    </ClientDemoProvider>
  );
}
