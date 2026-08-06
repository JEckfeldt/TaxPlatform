import { AppHeader } from "@/components/shell/app-header";

const nav = [
  { href: "/client/home", label: "Home" },
  { href: "/client/messages", label: "Messages" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AppHeader eyebrow="Client" nav={nav} />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </div>
    </div>
  );
}
